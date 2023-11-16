# Auditing System by ISUNCLOUD
*Currently, smart contracts are deployed using Remix, and data is input directly into the deployed smart contracts via Etherscan or Remix.*

## System Deployment:

*Deploy the smart contracts in the following sequence:*

1.parser.sol

2.reports.sol

3.TransactionContract.sol (parser address)

4.Handlers Contracts (TransactionContract address, parser address)

5.Calculating Contracts (TransactionContract address, Parser address , report address)

6.getTransactionTimeSpan.sol (transaction address, parser address, functioning contracts addresses)

7.Router contract(TransactionContract address, getTransactionTimeSpan address )

## Operation Flow:
1.  Users start by registering handlers using the registerHandlers function in the “router”, inputting the “TransactionType” (of type bytes32) and the “handler’s" address (of type address).
   ![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/393f8045-4208-46f7-8278-65c2bc529b88)



