const { should } = require('chai');
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
        console.log(`Stderr: ${stderr}`);
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
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running yarn add --dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers ...------',
    );

    await runCommand(
      'yarn add --dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 1.deploy.js ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/1.deploy.js --network sepolia',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010001handler command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deployHandlers.js --network sepolia',
      'E00010001',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npm install --save - dev ethers @^ 5 command...------',
    );
    await runCommand('npm install --save-dev ethers@^5');

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010001Handler command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.registerHandler.js --network sepolia',
      `0x4530303031303030310000000000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010001 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transactionRecord.js --network sepolia',
      `0x0000000000000000000000000000000000000000000000000000006669727374,0x4530303031303030310000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000021e19e0c9bab2400000,0x0000000000000000000000000000000000000000000000008ac7230489e80000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x0000000000000000000000000000000000000000000000000e043da617250000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.setRate.js --network sepolia',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x66697273745f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.setTimeSpan.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.setTimeSpan.js --network sepolia',
      `0x66697273745f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/checkE00010001.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/checkE00010001.js',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running yarn add --dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers ...------',
    );
    await runCommand(
      'yarn add --dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deployHandlers.js --network sepolia',
      'E00010002',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npm install --save - dev ethers @^ 5 command...------',
    );
    await runCommand('npm install --save-dev ethers@^5');

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.registerHandler.js --network sepolia',
      '0x4530303031303030320000000000000000000000000000000000000000000000',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010002 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transactionRecord.js --network sepolia',
      `0x7365636f6e640000000000000000000000000000000000000000000000000000,0x4530303031303030320000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000056bc75e2d63100000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000005150ae84a8cdf00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.setRate.js --network sepolia',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7365636f6e645f7265706f727400000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.setTimeSpan.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.setTimeSpan.js --network sepolia',
      `0x7365636f6e645f7265706f727400000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/checkE00010002.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/checkE00010002.js',
    );
    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running yarn add --dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers ...------',
    );
    await runCommand(
      'yarn add --dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deployHandlers.js --network sepolia',
      'E00010003',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npm install --save - dev ethers @^ 5 command...------',
    );
    await runCommand('npm install --save-dev ethers@^5');

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.registerHandler.js --network sepolia',
      '0x4530303031303030330000000000000000000000000000000000000000000000',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010003 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transactionRecord.js --network sepolia',
      `0x7468697264000000000000000000000000000000000000000000000000000000,0x4530303031303030330000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000008ac7230489e80000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000054b40b1f852bda00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.setRate.js --network sepolia',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x74686972645f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.setTimeSpan.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.setTimeSpan.js --network sepolia',
      `0x74686972645f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/checkE00010003.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/checkE00010003.js',
    );
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deployHandlers.js --network sepolia',
      'E00010004',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npm install --save - dev ethers @^ 5 command...------',
    );
    await runCommand('npm install --save-dev ethers@^5');

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.registerHandler.js --network sepolia',
      '0x4530303031303030340000000000000000000000000000000000000000000000',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010004 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transactionRecord.js --network sepolia',
      `0x666f727468000000000000000000000000000000000000000000000000000000,0x4530303031303030340000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000056bc75e2d63100000,0x000000000000000000000000000000000000000000000000016345785d8a0000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000011c37937e08000,0x0000000000000000000000000000000000000000000000000e043da617250000,0x00000000000000000000000000000000000000000000005150ae84a8cdf00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.setRate.js --network sepolia',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x666f7274685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.setTimeSpan.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.setTimeSpan.js --network sepolia',
      `0x666f7274685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/checkE00010004.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/checkE00010004.js',
    );
  } catch (error) {}
}

main();
