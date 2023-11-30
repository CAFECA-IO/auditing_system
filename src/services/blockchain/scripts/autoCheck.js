const { exec } = require('child_process');

function runCommand(command) {
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

    // Optional: Output the console logs in real-time
    process.stdout.on('data', function (data) {
      console.log(data);
    });
  });
}

async function main() {
  try {
    console.log('Running first command...');
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/1.deploy.js --network sepolia',
    );
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
