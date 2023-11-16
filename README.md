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
2.  Record data using a bytes32 array in the addRecord function of the“router.sol” contract, where each element has been multiplied by 10^18. The first element must be the eventID, and the second should specify the event type. Users must omit the timestamp column to prevent fraudulent events; the system will automatically record the current time.”

      For example, for the following transaction, the format of the array should be:
      [
      0x0000000000000000000000000000000000000000000000000000006669727374, 0x0000000000000000000000000000000000000000000000453030303130303031,
      0x00000000000000000000000000000000000000000000021e19e0c9bab2400000,
      0x0000000000000000000000000000000000000000000000008ac7230489e80000,
      0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,
      0x0000000000000000000000000000000000000000000000000e043da617250000
      ]
      


