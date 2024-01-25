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

    /*console.log(
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010001 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000000006669727374,0x4530303031303030310000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000021e19e0c9bab2400000,0x0000000000000000000000000000000000000000000000008ac7230489e80000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x0000000000000000000000000000000000000000000000000e043da617250000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.set_rate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x66697273745f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x66697273745f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00010001.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00010001.js --network iSunCoin',
    );

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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010002 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7365636f6e640000000000000000000000000000000000000000000000000000,0x4530303031303030320000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000056bc75e2d63100000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000005150ae84a8cdf00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.set_rate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7365636f6e645f7265706f727400000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x7365636f6e645f7265706f727400000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00010002.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00010002.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010003 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7468697264000000000000000000000000000000000000000000000000000000,0x4530303031303030330000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000008ac7230489e80000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000054b40b1f852bda00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.set_rate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x74686972645f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x74686972645f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00010003.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00010003.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010004 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x666f727468000000000000000000000000000000000000000000000000000000,0x4530303031303030340000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000056bc75e2d63100000,0x000000000000000000000000000000000000000000000000016345785d8a0000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000011c37937e08000,0x0000000000000000000000000000000000000000000000000e043da617250000,0x00000000000000000000000000000000000000000000005150ae84a8cdf00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.set_rate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x666f7274685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x666f7274685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00010004.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00010004.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010005 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x6669667468000000000000000000000000000000000000000000000000000000,0x4530303031303030350000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000008ac7230489e80000,0x000000000000000000000000000000000000000000000000002386f26fc10000,0x0000000000000000000000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000000000071afd498d0000,0x00000000000000000000000000000000000000000000005150ae84a8cdf00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x66696674685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x66696674685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00010005.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00010005.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010006 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7369787468000000000000000000000000000000000000000000000000000000,0x4530303031303030360000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x00000000000000000000000000000000000000000000000000038d7ea4c68000,0x0000000000000000000000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000000000001b48eb57e000,0x00000000000000000000000000000000000000000000054b40b1f852bda00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.set_rate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x73697874685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x73697874685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00010006.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00010006.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010007 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x736576656e746800000000000000000000000000000000000000000000000000,0x4530303031303030370000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000021e19e0c9bab2400000,0x0000000000000000000000000000000000000000000000008ac7230489e80000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x0000000000000000000000000000000000000000000000000e043da617250000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x736576656e74685f7265706f7274000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x736576656e74685f7265706f7274000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00010007.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00010007.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00010008 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x6569676874000000000000000000000000000000000000000000000000000000,0x4530303031303030380000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000056bc75e2d63100000,0x000000000000000000000000000000000000000000000000016345785d8a0000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000011c37937e08000,0x0000000000000000000000000000000000000000000000000e043da617250000,0x00000000000000000000000000000000000000000000005150ae84a8cdf00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x6569676874685f7265706f727400000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x6569676874685f7265706f727400000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00010008.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00010008.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020001 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x6e696e7468000000000000000000000000000000000000000000000000000000,0x4530303032303030310000000000000000000000000000000000000000000000,0x000000000000000000000000000000000000000000000000016345785d8a0000,0x00000000000000000000000000000000000000000000009513ea9de024380000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x6e696e74685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x6e696e74685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020001.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020001.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020002 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x74656e7468000000000000000000000000000000000000000000000000000000,0x4530303032303030320000000000000000000000000000000000000000000000,0x000000000000000000000000000000000000000000000000016345785d8a0000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x74656e74685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x74656e74685f7265706f72740000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020002.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020002.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020003 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x656c6576656e7468000000000000000000000000000000000000000000000000,0x4530303032303030330000000000000000000000000000000000000000000000,0x000000000000000000000000000000000000000000000000016345785d8a0000,0x0000000000000000000000000000000000000000000000925e06eec972b00000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x656c6576656e74685f7265706f72740000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x656c6576656e74685f7265706f72740000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020003.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020003.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020004 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7477656c66746800000000000000000000000000000000000000000000000000,0x4530303032303030340000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x000000000000000000000000000000000000000000000059725991ece2880000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7477656c6674685f7265706f7274000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x7477656c6674685f7265706f7274000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020004.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020004.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020005 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x746869727465656e746800000000000000000000000000000000000000000000,0x4530303032303030350000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x00000000000000000000000000000000000000000000000000d529ae9e860000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x746869727465656e74685f7265706f7274000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x746869727465656e74685f7265706f7274000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020005.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020005.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020006 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x666f75727465656e746800000000000000000000000000000000000000000000,0x4530303032303030360000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x000000000000000000000000000000000000000000000056bc75e2d631000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x666f75727465656e74685f7265706f7274000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x666f75727465656e74685f7265706f7274000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020006.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020006.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020007 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x6669667465656e74680000000000000000000000000000000000000000000000,0x4530303032303030370000000000000000000000000000000000000000000000,0x000000000000000000000000000000000000000000000097c9ce4cf6d5c00000,0x000000000000000000000000000000000000000000000000016345785d8a0000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x6669667465656e74685f7265706f727400000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x6669667465656e74685f7265706f727400000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020007.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020007.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020008 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7369787465656e74680000000000000000000000000000000000000000000000,0x4530303032303030380000000000000000000000000000000000000000000000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7369787465656e74685f7265706f727400000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x7369787465656e74685f7265706f727400000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020008.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020008.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020009 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x736576656e7465656e7468000000000000000000000000000000000000000000,0x4530303032303030390000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000056bc75e2d63100000,0x0000000000000000000000000000000000000000000000056bc75e2d63100000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x736576656e7465656e74685f7265706f72740000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x736576656e7465656e74685f7265706f72740000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020009.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020009.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020010 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x656967687465656e746800000000000000000000000000000000000000000000,0x4530303032303031300000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000005c283d410394100000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x656967687465656e74685f7265706f7274000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x656967687465656e74685f7265706f7274000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020010.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020010.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020011 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x6e696e657465656e746800000000000000000000000000000000000000000000,0x4530303032303031310000000000000000000000000000000000000000000000,0x000000000000000000000000000000000000000000000097c9ce4cf6d5c00000,0x000000000000000000000000000000000000000000000000016345785d8a0000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x6e696e657465656e74685f7265706f7274000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x6e696e657465656e74685f7265706f7274000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020011.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020011.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00020012 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7477656e74696574680000000000000000000000000000000000000000000000,0x4530303032303031320000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000000579a814e10a740000,0x0000000000000000000000000000000000000000000000056bc75e2d63100000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7477656e74696574685f7265706f727400000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x7477656e74696574685f7265706f727400000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00020012.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00020012.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00030001 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7477656e74796669727374000000000000000000000000000000000000000000,0x4530303033303030310000000000000000000000000000000000000000000000,0x000000000000000000000000000000000000000000000097c9ce4cf6d5c00000,0x000000000000000000000000000000000000000000000000016345785d8a0000,0x00000000000000000000000000000000000000000000001e5b8fa8fe2ac00000,0x0000000000000000000000000000000000000000000000004db7325476300000,0x0000000000000000000000000000000000000000000000000e043da617250000,0x00000000000000000000000000000000000000000000054b40b1f852bda00000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7477656e747966697273745f7265706f72740000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x7477656e747966697273745f7265706f72740000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00030001.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00030001.js --network iSunCoin',
    );*/

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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00030002 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7477656e74797365636f6e640000000000000000000000000000000000000000,0x4530303033303030320000000000000000000000000000000000000000000000,0x000000000000000000000000000000000000000000000000016345785d8a0000,0x0000000000000000000000000000000000000000000000821ab0d44149800000,0x00000000000000000000000000000000000000000000001a055690d9db800000,0x000000000000000000000000000000000000000000000000429d069189e00000,0x0000000000000000000000000000000000000000000000000e043da617250000,0x00000000000000000000000000000000000000000000054b40b1f852bda00000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7477656e74797365636f6e645f7265706f727400000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x7477656e74797365636f6e645f7265706f727400000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00030002.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00030002.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00030003 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7477656e74797468697264000000000000000000000000000000000000000000,0x4530303033303030330000000000000000000000000000000000000000000000,0x00000000000000000000000000000000000000000000005c283d410394100000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x0000000000000000000000000000000000000000000000126e72a69a50d00000,0x0000000000000000000000000000000000000000000000002f2f39fc6c540000,0x0000000000000000000000000000000000000000000000000e043da617250000,0x00000000000000000000000000000000000000000000005150ae84a8cdf00000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7477656e747974686972645f7265706f72740000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x7477656e747974686972645f7265706f72740000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00030003.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00030003.js --network iSunCoin',
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

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto adding E00030004 event ...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin',
      `0x7477656e7479666f727468000000000000000000000000000000000000000000,0x4530303033303030340000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,0x00000000000000000000000000000000000000000000005c283d410394100000,0x0000000000000000000000000000000000000000000000126e72a69a50d00000,0x0000000000000000000000000000000000000000000000002f2f39fc6c540000,0x0000000000000000000000000000000000000000000000000e043da617250000,0x00000000000000000000000000000000000000000000005150ae84a8cdf00000,0x0000000000000000000000000000000000000000000000000000000000000000,0x0000000000000000000000000000000000000000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 5.setRate.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin',
      `0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,0x000000000000000000000000000000000000000000000056bc75e2d631000000,0x000000000000000000000000000000000000000000000581767ba6189c400000,0x7477656e7479666f7274685f7265706f72740000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running 6.set_time_span.js command...------',
    );
    await runCommand(
      'npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin',
      `0x7477656e7479666f7274685f7265706f72740000000000000000000000000000`,
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '------Auto running npx hardhat test  src/services/blockchain/test/check_e00030004.js command...------',
    );
    await runCommand(
      'npx hardhat test  src/services/blockchain/test/check_e00030004.js --network iSunCoin',
    );
  } catch (error) {}
}

main();
