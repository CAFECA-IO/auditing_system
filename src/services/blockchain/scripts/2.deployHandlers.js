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
