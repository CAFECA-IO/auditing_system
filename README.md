# Auditing System by ISUNCLOUD
*Currently, smart contracts are deployed using Remix, and data is input directly into the deployed smart contracts via Etherscan or Remix.*

## System Class Diagram:

<img width="2000" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/8cc8165b-0967-4c24-b02d-57f861eb6615">


## Sequence Diagram:

<img width="1200" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/0a704102-f2cf-48f3-b652-b1a241ee27d9">




## System Deployment:

*Deploy the smart contracts in the following sequence:*

1.parser.sol

2.reports.sol

3.transactionContract.sol (Parser address)

4.handlers Contracts (TransactionContract address, Parser address)

5.Calculating Contracts (TransactionContract address, Parser address , Report address)

6.getTransactionTimeSpan.sol (Transaction address, Parser address, calculating contracts addresses(such as E00010001 address and so on))

7.router.sol contract(TransactionContract address, GetTransactionTimeSpan address )

## Operation Flow:
1.  Users start by registering handlers using the registerHandlers function in the `router`, inputting the `TransactionType` (of type `bytes32`) and the `handler’s` address (of type address).


<img src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/393f8045-4208-46f7-8278-65c2bc529b88" width="ˊ500" height="250" />


2.  Record data using a `bytes32 array` in the addRecord function of the `router.sol` contract, where each element has been multiplied by 10^18. The first element must be the eventID, and the second should specify the event type. Users must omit the timestamp column to prevent fraudulent events; the system will automatically record the current time.

   For example, for the following transaction, the format of the array should be:
   
   [
   
   0x0000000000000000000000000000000000000000000000000000006669727374, 
   
   0x0000000000000000000000000000000000000000000000453030303130303031,
   
   0x00000000000000000000000000000000000000000000021e19e0c9bab2400000,
   
   0x0000000000000000000000000000000000000000000000008ac7230489e80000,
   
   0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,
   
   0x0000000000000000000000000000000000000000000000000e043da617250000
   
   ]

 <img src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/8d46daff-65fe-4800-a062-94c364728089" width="500" height="250" />

 <img src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/9ecc9141-4ae9-43e7-97d0-5f46946fd36e" width="500" height="250" />


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

3.  In order to create report(s) in a time span, the users first set rates and reportID on `setRate` function in  `router.sol`. For example, for the following example, the user should input a `bytes32 array` as the following format:
   
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


<img width="500" height="250" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/47302669-2c7d-4c90-9b05-52357156bd34">


<img width="500" height="350" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/199f67f5-5020-4418-b013-e5b0032ffa85">



The users then interact with the `filterTransactionsInRange` function by inputing startTime(uint256), endTime(uin256), and reportID(bytes32) to set a specific time span. This function employs the `eventID` as primary keys and using `reportID` to organize reports under the `reportID`, preventing any disarray. It then retrieves and returns the transactions that occurred within the specified time span, without providing the full dataset.(S07 - S08)



 <img width="500" height="350" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/6e682ab8-a677-404c-aeda-513ef71ff4c2">



 4. Then the system will pass those transactions which had been filtered in a time span to calculating functions (use eventID to determine which one), the calculating functions first use `iParser.sol` function to change bytes32 into string or int256 and then calculate data with planned formula.

 5. After calculating calculating get a 3D array from `iReports.sol`, and then add results into the respective column.

 6. We can check the numbers is correct or not by calling the function getValue(reportID, reportType, reportColumn) in reports.sol. There are three options to fill in the reportType, ‘balanceSheet’, ‘comprehensiveIncome’, ‘cashFlow’. Then input the ‘reportColumn’ to check the respective column.


<img width="500" height="350" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/820b47f2-e392-4c53-b434-56881c2489bb">



<img width="500" height="350" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/2d117583-f294-4c4e-a8c3-d490aec9360a">



<img width="500" height="350" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/9a949aa7-2f74-4f05-b371-22eb7e98db48">


## Interact with smart contracts on Ethereum and checking results

1. First, users should download and deploy the `hardhat` environment locally .

2. Set your` SEPOLIA_PRIVATE_KEY`, `INFURA_API_KEY`, `REPORT_ID` ('first_report' is the default id), and `REPORT_CONTRACT_ADDRESS` at `.env` file, it's in auditing_system/.env
   
3. Run your scripts at the root file with `npx hardhat run src/services/blockchain/scripts/transformBalanceSheetAPI.js` or

`npx hardhat run src/services/blockchain/scripts/transformComprehensiveIncomeAPI.js` or 

`npx hardhat run src/services/blockchain/scripts/transformCashFlowAPI.js`

4. This program would help users to interact with reports.sol on ethereum by getting reports data.

5. The program will parse the raw data into planned API format as follow:

   <img width="366" alt="image" src="https://github.com/CAFECA-IO/auditing_system/assets/59311328/0d311247-53b4-4d45-8e0b-f366108b2c62">

## Future Plans:

1.   Implement Mistake Proofing mechanisms, such as require statements.

2.   Optimize gas fees through careful data structure design.














      


