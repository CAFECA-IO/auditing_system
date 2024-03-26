const axios = require('axios');
const { exec } = require('child_process');

async function fetchData() {
  try {
    const response = await axios.get('http://119.8.238.40:3000/api/v1/events');
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return null;
  }
}

function isTimestamp(value) {
  const timestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return timestampPattern.test(value);
}

function stringToBytes32(text) {
  let buffer = Buffer.from(text);
  if (buffer.length < 32) {
    buffer = Buffer.concat([buffer, Buffer.alloc(32 - buffer.length)]);
  }
  return '0x' + buffer.toString('hex');
}

async function runCommand(command, input) {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });

    if (input) {
      process.stdin.write(input + '\n');
      process.stdin.end();
    }
  });
}

async function processData() {
  const fetchedData = await fetchData();

  if (!fetchedData || !fetchedData.data) {
    console.log('No data available or wrong data structure');
    return;
  }

  for (const event of fetchedData.data) {
    const index = stringToBytes32(event.id.toString());
    const code = stringToBytes32(event.eventCode);
    let valuesArray = [index, code];
    let valuesArrayOriginal = [event.id, event.eventCode];

    Object.keys(event.details).forEach((key) => {
      let value = event.details[key];

      if (typeof value === 'number') {
        value = BigInt(Math.floor(value * 10 ** 18)).toString();
      } else if (isTimestamp(value)) {
        value = new Date(value).getTime().toString();
      }

      valuesArrayOriginal.push(value);
      value = stringToBytes32(value);
      valuesArray.push(value);
    });

    console.log('---------------new transaction---------------');
    console.log('Values Array:', valuesArray);
    console.log('Values Array Original:', valuesArrayOriginal);
    console.log('-------------------------------');

    const commandInput = valuesArray.join(',');
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      commandInput,
    );
  }
}

processData()
  .then(() => console.log('All events processed.'))
  .catch(console.error);
