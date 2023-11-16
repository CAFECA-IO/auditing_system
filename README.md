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
   ![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/393f8045-4208-46f7-8278-65c2bc529b88#pic.right)
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

 ![imgae](https://github.com/CAFECA-IO/auditing_system/assets/59311328/1e6996ba-1d0e-41b8-8792-125b92c8f7a1)

 ![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/2ee70026-cb04-42da-aea9-fd2b9c8f7219)

The users then interact with the `filterTransactionsInRange` function by inputing startTime(uint256), endTime(uin256), and reportID(bytes32) to set a specific time span. This function employs the `eventID` as primary keys and using `reportID` to organize reports under the `reportID`, preventing any disarray. It then retrieves and returns the transactions that occurred within the specified time span, without providing the full dataset.(S07 - S08)

 ![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/6e682ab8-a677-404c-aeda-513ef71ff4c2)


 4. Then the system will pass those transactions which had been filtered in a time span to calculating functions (use eventID to determine which one), the calculating functions first use “Iparser.sol” function to change bytes32 into string or int256 and then calculate data with planned formula.

 5. After calculating calculating get a 3D array from “Ireports.sol”, and then add results into the respective column.

 6. We can check the numbers is correct or not by calling the function getValue(reportID, reportType, reportColumn) in reports.sol. There are three options to fill in the reportType, ‘balanceSheet’, ‘comprehensiveIncome’, ‘cashFlow’. Then input the ‘reportColumn’ to check the respective column.

![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/820b47f2-e392-4c53-b434-56881c2489bb)


![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/2d117583-f294-4c4e-a8c3-d490aec9360a)


![image](https://github.com/CAFECA-IO/auditing_system/assets/59311328/9a949aa7-2f74-4f05-b371-22eb7e98db48)


## Interact with smart contracts on Ethereum and checking results

## Future Plans:

1.   Develop a standardized interface for calculation functions and store it in the interfaces file.

2 .  Code each function up to Column 7, encompassing all types of deposits and withdrawals.

3.   Implement Mistake Proofing mechanisms, such as require statements.

4.   Enhance calculation accuracy, given that Solidity lacks a float variable type.

5.   Optimize gas fees through careful data structure design.

6.   Create an interface for reports.sol and import only the interface.













      


