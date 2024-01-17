const { ethers } = require('hardhat');
require('events').EventEmitter.defaultMaxListeners = 20;
const readline = require('readline');
const fs = require('fs');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question(
    'Please enter the contract code to deploy the corresponding contract: ',
    async (code) => {
      try {
        async function deployContractAndAppendToEnv(code) {
          const transactionContractAddress = process.env.TRANSACTION_ADDRESS;
          const parserAddress = process.env.PARSER_ADDRESS;
          const reportsAddress = process.env.REPORTS_ADDRESS;

          console.log('transaction_address=', transactionContractAddress);
          console.log('parser_address=', parserAddress);
          console.log('reports_address=', reportsAddress);

          if (
            !transactionContractAddress ||
            !parserAddress ||
            !reportsAddress
          ) {
            throw new Error(
              'The necessary contract address is not set in the .env file.',
            );
          }

          const contract = await ethers.deployContract(`${code}Handler`, [
            transactionContractAddress,
            parserAddress,
            reportsAddress,
          ]);
          const contractAddress = await contract.getAddress();
          const envPath = '.env';
          const newEnvContent = `${code}_ADDRESS=${contractAddress}\n`;
          fs.appendFileSync(envPath, newEnvContent);
          console.log(`${code}_ADDRESS=`, contractAddress);
        }
        if (code === 'E00010001') {
          await deployContractAndAppendToEnv('E00010001');
        } else if (code === 'E00010002') {
          await deployContractAndAppendToEnv('E00010002');
        } else if (code === 'E00010003') {
          await deployContractAndAppendToEnv('E00010003');
        } else if (code === 'E00010004') {
          await deployContractAndAppendToEnv('E00010004');
        } else if (code === 'E00010005') {
          await deployContractAndAppendToEnv('E00010005');
        } else if (code === 'E00010006') {
          await deployContractAndAppendToEnv('E00010006');
        } else if (code === 'E00010007') {
          await deployContractAndAppendToEnv('E00010007');
        } else if (code === 'E00010008') {
          await deployContractAndAppendToEnv('E00010008');
        } else if (code === 'E00020001') {
          await deployContractAndAppendToEnv('E00020001');
        } else if (code === 'E00020002') {
          await deployContractAndAppendToEnv('E00020002');
        } else if (code === 'E00020003') {
          await deployContractAndAppendToEnv('E00020003');
        } else if (code === 'E00020004') {
          await deployContractAndAppendToEnv('E00020004');
        } else if (code === 'E00020005') {
          await deployContractAndAppendToEnv('E00020005');
        } else if (code === 'E00020006') {
          await deployContractAndAppendToEnv('E00020006');
        } else if (code === 'E00020007') {
          await deployContractAndAppendToEnv('E00020007');
        } else if (code === 'E00020008') {
          await deployContractAndAppendToEnv('E00020008');
        } else if (code === 'E00020009') {
          await deployContractAndAppendToEnv('E00020009');
        } else if (code === 'E00020010') {
          await deployContractAndAppendToEnv('E00020010');
        } else if (code === 'E00020011') {
          await deployContractAndAppendToEnv('E00020011');
        } else if (code === 'E00020012') {
          await deployContractAndAppendToEnv('E00020012');
        } else if (code === 'E00030001') {
          await deployContractAndAppendToEnv('E00030001');
        } else if (code === 'E00030002') {
          await deployContractAndAppendToEnv('E00030002');
        } else if (code === 'E00030003') {
          await deployContractAndAppendToEnv('E00030003');
        } else if (code === 'E00030004') {
          await deployContractAndAppendToEnv('E00030004');
        } else if (code === 'E00030005') {
          await deployContractAndAppendToEnv('E00030005');
        } else if (code === 'E00030006') {
          await deployContractAndAppendToEnv('E00030006');
        } else if (code === 'E00030007') {
          await deployContractAndAppendToEnv('E00030007');
        } else if (code === 'E00030008') {
          await deployContractAndAppendToEnv('E00030008');
        } else if (code === 'E00030009') {
          await deployContractAndAppendToEnv('E00030009');
        } else if (code === 'E00030010') {
          await deployContractAndAppendToEnv('E00030010');
        } else if (code === 'E00030011') {
          await deployContractAndAppendToEnv('E00030011');
        } else if (code === 'E00030012') {
          await deployContractAndAppendToEnv('E00030012');
        } else {
          console.log('Unrecognized contract code');
        }
      } catch (error) {
        console.error('Error when deploying the contract:', error);
      } finally {
        rl.close();
      }
    },
  );
}

main();
