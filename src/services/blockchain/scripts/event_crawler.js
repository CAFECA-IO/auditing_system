const fs = require('fs');
const { exec } = require('child_process');
const { int } = require('hardhat/internal/core/params/argumentTypes');

const rawData = fs.readFileSync(
  'src/services/blockchain/scripts/dummy_data.json',
  'utf8',
);

const data = JSON.parse(rawData);

function runCommand(command, input) {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`\x1b[31mError: ${error.message}\x1b[0m`);
      }
      resolve(stdout);
    });

    process.stdout.on('data', function (data) {
      console.log(data);
    });

    if (input) {
      process.stdin.write(input + '\n');
      process.stdin.end();
    }
  });
}

function isTimestamp(value) {
  const timestampPattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return timestampPattern.test(value);
}

function stringToBytes32(source) {
  let buffer = Buffer.alloc(32);
  buffer.write(source, 0, 'utf-8');
  return '0x' + buffer.toString('hex');
}

function intToBytes32(x) {
  const bigIntValue = BigInt(x);

  const buffer = Buffer.alloc(32);
  const hex = bigIntValue.toString(16).padStart(64, '0');
  buffer.write(hex, 0, 32, 'hex');
  return '0x' + buffer.toString('hex');
}

function stringToBytes32(source) {
  let buffer = Buffer.alloc(32);
  buffer.write(source, 0, 'utf-8');
  return '0x' + buffer.toString('hex');
}

async function processData() {
  for (const event of data.payload) {
    const index = stringToBytes32(event.event_index);
    const code = stringToBytes32(event.event_code);
    let valuesArray = [index, code];
    let valuesArrayOriginal = [event.event_index, event.event_code];
    Object.keys(event.details).forEach((key) => {
      let value = event.details[key];

      if (!isTimestamp(value)) {
        value = BigInt(value * 10 ** 13) * BigInt(10) ** BigInt(5);
        value = value.toString();
      } else if (isTimestamp(value)) {
        var date = new Date(value);
        var timestamp = date.getTime();
        value = timestamp;
      }

      valuesArrayOriginal.push(value);
      value = intToBytes32(value);
      valuesArray.push(value);
    });

    console.log(
      '\x1b[34m%s\x1b[0m',
      '---------------new transaction---------------',
    );
    console.log('Values Array:', valuesArray);
    console.log('Values Array Original:', valuesArrayOriginal);
    console.log('-------------------------------');

    console.log('\x1b[34m%s\x1b[0m', '------Auto adding event ...------');
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
