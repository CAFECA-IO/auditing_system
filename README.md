# Auditing System by ISUNCLOUD

## 1. System Deployment:

Deploy the smart contracts in the following sequence: 

1. "eventTransactionRecord.sol"
2. "reports.sol"
3. "E00010001.sol"
4. Other calculating smart contracts
5. "getTransactionTimeSpan.sol"

## 2. Data Flow:

### 2.1 A user begins by recording data into the eventTransactionRecord contract, encompassing any number of transactions as needed.

### 2.2 The user then interacts with the `getTransactionTimeSpan(Time_1, Time_2)` function to set a specific time span. This function employs the `eventID` as primary keys and a `reportID` to organize reports under the `reportID`, preventing any disarray. It then retrieves and returns the transactions that occurred within the specified time span, without providing the full dataset.

### 2.3 The Smart Contract subsequently determines the type of transaction and forwards it to the Functions Contract.

### 2.4 The Functions Contract then references the reports library using the primary keys to fetch the data, performs necessary calculations, and records the reports.

### 2.5 Post-calculation, the Functions Contract generates a public 4D mapping (`[reportID][TransactionType][Column]->value`) and stores the data therein.

### 2.6 Lastly, a JavaScript program will retrieve data from the library and convert the mapping data into a standardized JSON API.

## 3. Future Plans:

### 3.1 Develop a standardized interface for calculation functions and store it in the interfaces file.

### 3.2 Code each function up to Column 7, encompassing all types of deposits and withdrawals.

### 3.3 Implement Mistake Proofing mechanisms, such as require statements.

### 3.4 Enhance calculation accuracy, given that Solidity lacks a float variable type.

### 3.5 Optimize gas fees through careful data structure design.

### 3.6 Create an interface for reports.sol and import only the interface.
