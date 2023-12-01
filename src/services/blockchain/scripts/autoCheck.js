const { exec } = require('child_process');

function runCommand(command, input) {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(`Stdout: ${stdout}`);
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
    console.log('------Auto running 1.deploy.js ...------');
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/1.deploy.js --network sepolia',
    );

    console.log('------Auto running 2.deployHandlers.js command...------');
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deployHandlers.js --network sepolia',
      'E00010001',
    );

    console.log(
      '------Auto running npm install --save - dev ethers @^ 5 command...------',
    );
    await runCommand('npm install --save-dev ethers@^5');

    console.log('------Auto running 3.registerHandler.js command...------');
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.registerHandler.js --network sepolia',
      `0x4530303031303030310000000000000000000000000000000000000000000000`,
    );
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
