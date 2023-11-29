const { ethers } = require('hardhat');
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
        if (code === 'E00010001') {
          const transactionContractAddress = process.env.TRANSACTION_ADDRESS;
          const parserAddress = process.env.PARSER_ADDRESS;
          const reportsAddress = process.env.REPORTS_ADDRESS;
          if (
            !transactionContractAddress ||
            !parserAddress ||
            !reportsAddress
          ) {
            throw new Error(
              'The necessary contract address is not set in the .env file.',
            );
          }

          const E00010001 = await ethers.deployContract('E00010001Handler', [
            transactionContractAddress,
            parserAddress,
            reportsAddress,
          ]);
          const E00010001_address = await E00010001.getAddress();
          console.log('E00010001_ADDRESS=', E00010001_address);
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