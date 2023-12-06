import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

const config: HardhatUserConfig = {
  defaultNetwork: 'sepolia',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
  },
  solidity: {
    version: '0.8.0',
  },
  paths: {
    sources: './src/services/blockchain/contracts',
    artifacts: './src/services/blockchain/artifacts/artifacts',
    tests: './src/services/blockchain/test',
  },
};
export default config;
