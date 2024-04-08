const { should } = require('chai');
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
      '------Auto running 1.deploy.js ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/1.deploy.js --network iSunCoin',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010001handler command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00010001',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010001Handler command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      `0x4530303031303030310000000000000000000000000000000000000000000000`,
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00010002',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303031303030320000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00010003',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303031303030330000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00010004',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303031303030340000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010005handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00010005',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010005handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303031303030350000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010006handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00010006',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010006handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303031303030360000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010007handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00010007',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010007handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303031303030370000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00010008handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00010008',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00010008handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303031303030380000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020001handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020001',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020001handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030310000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020002',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030320000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020003',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030330000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020004',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030340000000000000000000000000000000000000000000000',
    );

    //

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020005handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020005',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020005handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030350000000000000000000000000000000000000000000000',
    );

    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020006handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020006',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020006handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030360000000000000000000000000000000000000000000000',
    );

    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020007handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020007',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020007handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030370000000000000000000000000000000000000000000000',
    );

    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020008handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020008',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020008handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030380000000000000000000000000000000000000000000000',
    );

    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020009handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020009',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020009handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303030390000000000000000000000000000000000000000000000',
    );

    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020010handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020010',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020010handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303031300000000000000000000000000000000000000000000000',
    );

    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020011handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020011',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020011handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303031310000000000000000000000000000000000000000000000',
    );

    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00020012handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00020012',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00020012handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303032303031320000000000000000000000000000000000000000000000',
    );

    //
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00030001handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00030001',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00030001handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303033303030310000000000000000000000000000000000000000000000',
    );

    //E00030002

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00030002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00030002',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00030002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303033303030320000000000000000000000000000000000000000000000',
    );

    //E00030003
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00030003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00030003',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00030003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303033303030330000000000000000000000000000000000000000000000',
    );

    //E00030004
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00030004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00030004',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00030004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303033303030340000000000000000000000000000000000000000000000',
    );

    //E00030005
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00030005handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00030005',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00030005handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303033303030350000000000000000000000000000000000000000000000',
    );

    //E00030006
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00030006handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00030006',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00030006handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303033303030360000000000000000000000000000000000000000000000',
    );

    //E00030007
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00030007handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00030007',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00030007handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303033303030370000000000000000000000000000000000000000000000',
    );

    //E00030008
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00030008handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00030008',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00030008handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303033303030380000000000000000000000000000000000000000000000',
    );

    //E00040001
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00040001handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00040001',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00040001handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303034303030310000000000000000000000000000000000000000000000',
    );

    //E00040002
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00040002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00040002',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00040002handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303034303030320000000000000000000000000000000000000000000000',
    );

    //E00040003
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00040003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00040003',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00040003handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303034303030330000000000000000000000000000000000000000000000',
    );

    //E00040004
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00040004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00040004',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00040004handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303034303030340000000000000000000000000000000000000000000000',
    );

    //E00040005
    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto deploying E00040005handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin',
      'E00040005',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto registering E00040005handler ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin',
      '0x4530303034303030350000000000000000000000000000000000000000000000',
    );
  } catch (error) {}
}

main();
