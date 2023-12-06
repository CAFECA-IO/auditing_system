// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;

contract E00010001 {
    
    struct Event {
        string id;
        string transactionType;
        uint256 amount;        
        uint256 internalFee;           
        uint256 externalFee;  
        uint256 timestamp;    
        uint256 rateUSDTtoUSD; 
    }

    Event[] public transactions;

    mapping(string => int256) public balanceSheet;
    mapping(string => int256) public comprehensiveIncome;
    mapping(string => int256) public cashFlow;
    mapping(string => uint256) private transactionIndices;
    uint256 latestSP002;
    uint256 latestSP003;
    uint256 latestSP004;
    string  eventIdFromTimeSpan;

    event NewTransaction(string id, string transactionType);

    function getEventIdAndRate(string memory _eventId, uint256 _SP002, uint256 _SP003, uint256 _SP004) public {
        latestSP002 = _SP002;
        latestSP003 = _SP003;
        latestSP004 = _SP004;
        eventIdFromTimeSpan = _eventId;
    }

    function addAmountToBalanceSheet(string[] memory keys, int256 value) internal {
        for (uint256 i = 0; i < keys.length; i++) {
            balanceSheet[keys[i]] += value;
        }
    }

    function addAmountTocomprehensive(string[] memory keys, int256 value) internal {
        for (uint256 i = 0; i < keys.length; i++) {
            comprehensiveIncome[keys[i]] += value;
        }
    }

    function addAmountToCashFlow(string[] memory keys, int256 value) internal {
        for (uint256 i = 0; i < keys.length; i++) {
            cashFlow[keys[i]] += value;
        }
    }


    function recordTransaction(string memory _id, string memory _transactionType,uint256 _amount,uint256 _internalFee,uint256 _externalFee,uint256 _rateUSDTtoUSD ) public {

        for(uint256 i; i < transactions.length; i++){
            require(keccak256(abi.encodePacked(_id)) != keccak256(abi.encodePacked(transactions[i].id)), "ID already exists.");
        }
        
        Event memory newTransaction = Event({
            id: _id,
            transactionType: _transactionType,
            amount: _amount,
            internalFee: _internalFee,
            externalFee: _externalFee,
            timestamp: block.timestamp,
            rateUSDTtoUSD:_rateUSDTtoUSD
        });

        transactions.push(newTransaction);
        transactionIndices[newTransaction.id] = transactions.length - 1;

        int256 A001_3_4_5_14 = int256((newTransaction.amount + newTransaction.externalFee) * latestSP002/100);
        string[] memory keysForA001_3_4_5_14 = new string[](5);
        keysForA001_3_4_5_14[0] = "assets.details.cryptocurrency.totalAmountFairValue";
        keysForA001_3_4_5_14[1] = "assets.details.cryptocurrency.breakdown.USDT.fairValue";
        keysForA001_3_4_5_14[2] = "assets.totalAmountFairValue";
        keysForA001_3_4_5_14[3] = "totalAssetsFairValue";
        keysForA001_3_4_5_14[4] = "totalLiabilitiesAndEquityFairValue";
        addAmountToBalanceSheet(keysForA001_3_4_5_14, A001_3_4_5_14);


        int256 A002 = int256(newTransaction.amount + newTransaction.externalFee);
        balanceSheet["assets.details.cryptocurrency.breakdown.USDT.amount"] += A002;

        int256 A006_8_9 = int256((newTransaction.amount - newTransaction.internalFee) * latestSP002/100);
        string[] memory keysForA006_8_9 = new string[](3);
        keysForA006_8_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_8_9[1] = "liabilities.details.userDeposit.breakdown.USDT.fairValue";
        keysForA006_8_9[2] = "liabilities.totalAmountFairValue";
        addAmountToBalanceSheet(keysForA006_8_9, A006_8_9);

        int256 A007 = int256(newTransaction.amount - newTransaction.internalFee);
        balanceSheet["liabilities.details.userDeposit.breakdown.USDT.amount"] += A007;

        int256 A010_12_13 = int256((newTransaction.internalFee + newTransaction.externalFee) * latestSP002/100);
        string[] memory keysForA010_12_13 = new string[](3);
        keysForA010_12_13[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA010_12_13[1] = "equity.details.retainedEarnings.breakdown.USDT.fairValue";
        keysForA010_12_13[2] = "equity.totalAmountFairValue";
        addAmountToBalanceSheet(keysForA010_12_13, A010_12_13);

        int256 A011 = int256(newTransaction.internalFee + newTransaction.externalFee);
        balanceSheet["equity.details.retainedEarnings.breakdown.USDT.amount"] += A011;

        //

        int256 B001_3_4 = int256((newTransaction.internalFee + newTransaction.externalFee) * latestSP002/100);
        string[] memory keysForB001_3_4 = new string[](3);
        keysForB001_3_4[0] = "income.details.depositFee.weightedAverageCost";
        keysForB001_3_4[1] = "income.details.depositFee.breakdown.USDT.weightedAverageCost";
        keysForB001_3_4[2] = "netProfit";
        addAmountTocomprehensive(keysForB001_3_4, B001_3_4);

        int B002 = int256(newTransaction.internalFee + newTransaction.externalFee);
        comprehensiveIncome["income.details.depositFee.breakdown.USDT.amount"] += B002;
        
        recordTransactionCashFlow(newTransaction);
    }

    function recordTransactionCashFlow(Event memory newTransaction) internal {

        int256 C001_3 = int256((newTransaction.amount - newTransaction.internalFee) * newTransaction.rateUSDTtoUSD/100);
        string[] memory keysForC001_3 = new string[](2);
        keysForC001_3[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost"; 
        keysForC001_3[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost";
        addAmountToCashFlow(keysForC001_3, C001_3);

        int256 C002 = int256(newTransaction.amount - newTransaction.internalFee);
        cashFlow["supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.amount"] += C002;

        int256 C004_6 = int256((newTransaction.internalFee + newTransaction.externalFee) * newTransaction.rateUSDTtoUSD/100);
        string[] memory keysForC004_6 = new string[](2);
        keysForC004_6[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost"; 
        keysForC004_6[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost";
        addAmountToCashFlow(keysForC004_6, C004_6);

        int256 C005 = int256(newTransaction.amount - newTransaction.internalFee);
        cashFlow["supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount"] += C005;

        int256 C007_8 = int256((newTransaction.amount + newTransaction.externalFee) * newTransaction.rateUSDTtoUSD/100);
        string[] memory keysForC007_8 = new string[](2);
        keysForC007_8[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC007_8[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesEndOfPeriod";
        addAmountToCashFlow(keysForC007_8, C007_8);

        emit NewTransaction(newTransaction.id, newTransaction.transactionType);

    }


    function getTransactionCount() public view returns (uint256) {
    return transactions.length;
    }

    function getTransactionByIndex(uint256 index) public view returns (Event memory) {
        require(index < transactions.length, "Invalid index");
        return transactions[index];
    }

    function getLatestTransaction() public view returns (Event memory) {
        require(transactions.length > 0, "No transactions available.");
        return transactions[transactions.length - 1];
    }

    function getTransactionById(string memory id) public view returns (Event memory) {
        require(transactionIndices[id] != 0 || keccak256(abi.encodePacked(transactions[0].id)) == keccak256(abi.encodePacked(id)), "Transaction not found"); 
        return transactions[transactionIndices[id]];
    }

    function getTransactionsInTimeRange(uint256 startTime, uint256 endTime) public view returns (Event[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].timestamp >= startTime && transactions[i].timestamp <= endTime) {
                count++;
            }
        }

        Event[] memory results = new Event[](count);

        uint256 j = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].timestamp >= startTime && transactions[i].timestamp <= endTime) {
                results[j] = transactions[i];
                j++;
            }
        }
        return results;
    }

    function getReportsInTimeRange(uint256 startTime, uint256 endTime) public view returns (
        string[] memory IDS,
        string[14] memory balanceSheetKeys,
        int256[][] memory balanceSheetValues,
        string[4] memory comprehensiveIncomeKeys,
        int256[][] memory comprehensiveIncomeValues,
        string[8] memory cashFlowKeys,
        int256[][] memory cashFlowValues
    ) {
        Event[] memory eventsInRange = getTransactionsInTimeRange(startTime, endTime);
        
        IDS = new string[](eventsInRange.length);
        
        balanceSheetKeys = [
            "assets.details.cryptocurrency.totalAmountFairValue",
            "assets.details.cryptocurrency.breakdown.USDT.amount",
            "assets.details.cryptocurrency.breakdown.USDT.fairValue",
            "assets.totalAmountFairValue",
            "totalAssetsFairValue",
            "liabilities.details.userDeposit.totalAmountFairValue",
            "liabilities.details.userDeposit.breakdown.USDT.amount",
            "liabilities.details.userDeposit.breakdown.USDT.fairValue",
            "liabilities.totalAmountFairValue",
            "equity.details.retainedEarnings.totalAmountFairValue",
            "equity.details.retainedEarnings.breakdown.USDT.amount",
            "equity.details.retainedEarnings.breakdown.USDT.fairValue",
            "equity.totalAmountFairValue",
            "totalLiabilitiesAndEquityFairValue"
        ];
        
        comprehensiveIncomeKeys = [
            "income.details.depositFee.weightedAverageCost",
            "income.details.depositFee.breakdown.USDT.amount",
            "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost",
            "netProfit"
        ];
        
        cashFlowKeys = [
            "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost",
            "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.amount",
            "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost",
            "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost",
            "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount",
            "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost",
            "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost",
            "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesEndOfPeriod"
        ];
        
        balanceSheetValues = new int256[][](eventsInRange.length);
        comprehensiveIncomeValues = new int256[][](eventsInRange.length);
        cashFlowValues = new int256[][](eventsInRange.length);
        
        for(uint256 i=0; i < eventsInRange.length; i++){

            IDS[i] = eventsInRange[i].id;
            
            balanceSheetValues[i] = new int256[](balanceSheetKeys.length);
            comprehensiveIncomeValues[i] = new int256[](comprehensiveIncomeKeys.length);
            cashFlowValues[i] = new int256[](cashFlowKeys.length);
            
            for (uint256 j = 0; j < balanceSheetKeys.length; j++) {
                balanceSheetValues[i][j] = balanceSheet[balanceSheetKeys[j]];
            }
            
            for (uint256 j = 0; j < comprehensiveIncomeKeys.length; j++) {
                comprehensiveIncomeValues[i][j] = comprehensiveIncome[comprehensiveIncomeKeys[j]];
            }
            
            for (uint256 j = 0; j < cashFlowKeys.length; j++) {
                cashFlowValues[i][j] = cashFlow[cashFlowKeys[j]];
            }
        }

        return (IDS,balanceSheetKeys, balanceSheetValues, comprehensiveIncomeKeys, comprehensiveIncomeValues, cashFlowKeys, cashFlowValues);
    }
}