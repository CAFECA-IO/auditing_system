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

   ![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/8d46daff-65fe-4800-a062-94c364728089)
   ![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/9ecc9141-4ae9-43e7-97d0-5f46946fd36e)

   Which in decimal: 
   [ 
   “first”, 				(eventID)
   ”E00010001”, 			(transactionType)
   10000000000000000000000, 	(EP001)
   10000000000000000000,		(EP002)
   1000000000000000000,		(EP003)
   1010000000000000000 		(EP005)
   ] 
   , notice that every number has been multipulied by 10^18.

   3. In order to create report(s) in a time span, the users first set rates and reportID on “setRate” function in  “router.sol”. For example, for the following example, the user should input a bytes32 array as the following format:
   [
    0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,
    0x000000000000000000000000000000000000000000000056bc75e2d631000000,
    0x0000000000000000000000000000000000000000000000000000000000006590,
    0x66697273745f7265706f72740000000000000000000000000000000000000000
   ]
   Which in decimal stands for:
   [
   990000000000000000, 		(SP002)
   1600000000000000000000,		(SP003)
   26000000000000000000000,		(SP004)
   ”first_report”				(reportID)
   ]

<img width="235" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/1e6996ba-1d0e-41b8-8792-125b92c8f7a1">

 ![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/2ee70026-cb04-42da-aea9-fd2b9c8f7219)








      


