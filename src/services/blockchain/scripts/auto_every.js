const { exec } = require('child_process');

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

    // If there is input, write it to the stdin of the process
    if (input) {
      process.stdin.write(input + '\n');
      process.stdin.end(); // Important to close the stdin stream
    }
  });
}

async function main() {
  try {
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running auto_check.js ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/auto_check.js --network iSunCoin',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running save blockchain data to prisma command...------',
    );
    await runCommand(
      'node ./auditing_system_api/pages/api/v1/blockchain_to_prisma.js first_report 1',
    );
  } catch (e) {
    console.log(e);
  }
}

main();
