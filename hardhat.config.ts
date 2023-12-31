import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";

import "tsconfig-paths/register";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-watcher";
import "hardhat-deploy";

import "./tasks/index";

import { HardhatUserConfig } from "hardhat/config";
import {
  DEPLOYER_KEY,
  INFURA_KEY,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  BSCSCAN_API_KEY,
  GAS_PRICE,
  GAS_REPORTER,
} from "config";

function typedNamedAccounts<T>(namedAccounts: { [key in string]: T }) {
  return namedAccounts;
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: "types/typechain-types",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      chainId: 1,
      accounts: [DEPLOYER_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      chainId: 5,
      accounts: [DEPLOYER_KEY],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
    },
  },
  namedAccounts: typedNamedAccounts({
    deployer: 0,
  }),
  watcher: {
    test: {
      tasks: [{ command: "test", params: { testFiles: ["{path}"] } }],
      files: ["./test/**/*"],
      verbose: true,
    },
  },
  gasReporter: {
    enabled: GAS_REPORTER.ENABLED,
    coinmarketcap: GAS_REPORTER.COINMARKETCAP,
    currency: GAS_REPORTER.CURRENCY,
    token: GAS_REPORTER.TOKEN,
    gasPrice: GAS_PRICE,
  },
};

export default config;
