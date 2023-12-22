import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

const config: HardhatUserConfig = {
  defaultNetwork: 'iSunCoin',
  networks: {
    iSunCoin: {
      url: `https://isuncoin.baifa.io`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: [ {
      version: '0.8.0',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    }, {
      version: '0.8.20'
      , settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    } ]
  },
  paths: {
    sources: './src/services/blockchain/contracts',
    artifacts: './src/services/blockchain/artifacts/artifacts',
    tests: './src/services/blockchain/test',
  },
};

export default config;
