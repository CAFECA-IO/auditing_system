// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transaction_contract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/i_transaction_handler.sol";
//Info: (20231115 - Yang){This contract is to calculate the variables based on the excel reports, and to record transaction data from transactionContract.sol, the logic is the same in other handlers contracts}
contract E00030007Handler is ITransactionHandler{

    Reports public report;
    IParser public Iparser;
    TransactionContract private transactionContract;

    event EventIdAndRateReceived(string eventId, int256 SP002, int256 SP003, int256 SP004);
    event EventEP001(string eventId, int256 EP001,int256 EP002,int256 EP003,int256 EP004,int256 EP006, int256 EP007, int256 EP009,int256 EP0010,int256 EP011,int256 EP012,int256 EP013);
    int256 latestSP002;
    int256 latestSP003;
    int256 latestSP004;
    int256 EP001;
    int256 EP002;
    int256 EP003;
    int256 EP004;
    int256 EP005;
    int256 EP006;
    int256 EP007;
    int256 EP008;
    int256 EP009;
    int256 EP010;
    int256 EP011;
    int256 EP012;
    int256 EP013;
    string eventIdFromTimeSpan;
    string reportName;
    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    //Info: (20231115 - Yang){This is function is to record event data in arrays}
    function processTransaction(bytes32[] memory data, address recorder) external override {

        require(data.length == 15, "Data length for E00030007 must be 15");

        bytes32[] memory paramKeys = new bytes32[](13);
        int256[] memory paramValues = new int256[](13);

        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2]));
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3]));
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4]));
        paramKeys[3] = Iparser.stringToBytes32("EP004");
        paramValues[3] = int256(uint256(data[5]));
        paramKeys[4] = Iparser.stringToBytes32("EP005");
        paramValues[4] = int256(uint256(data[6]));
        paramKeys[5] = Iparser.stringToBytes32("EP006");
        paramValues[5] = int256(uint256(data[7]));
        paramKeys[6] = Iparser.stringToBytes32("EP007");
        paramValues[6] = int256(uint256(data[8]));
        paramKeys[7] = Iparser.stringToBytes32("trans_time");
        paramValues[7] = int256(uint256(data[9]));
        paramKeys[8] = Iparser.stringToBytes32("EP009");
        paramValues[8] = int256(uint256(data[10]));
        paramKeys[9] = Iparser.stringToBytes32("EP010");
        paramValues[9] = int256(uint256(data[11]));
        paramKeys[10] = Iparser.stringToBytes32("EP011");
        paramValues[10] = int256(uint256(data[12]));
        paramKeys[11] = Iparser.stringToBytes32("EP012");
        paramValues[11] = int256(uint256(data[13]));
        paramKeys[12] = Iparser.stringToBytes32("EP013");
        paramValues[12] = int256(uint256(data[14]));


        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }

    /*Info: (20231115 - Yang){This function gets the rates and eventIDs, then calls transactionContract to get full data based on the eventIDs,
    finally, store them in variables in order to calculate}*/
    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportName ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external override{
        latestSP002 = int256(uint256(_SP002));
        latestSP003 = int256(uint256(_SP003));
        latestSP004 = int256(uint256(_SP004));
        eventIdFromTimeSpan = Iparser.bytes32ToString(_eventId);
        reportName = Iparser.bytes32ToString(_reportName);
        emit EventIdAndRateReceived(eventIdFromTimeSpan, latestSP002, latestSP003, latestSP004);

        EP001  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP001"));
        EP002  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP002"));
        EP003  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP003"));
        EP004  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP004"));
        EP005 = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP005"));
        getEventIdAndRate2(_eventId);
    }
    function getEventIdAndRate2(bytes32 _eventId)internal{
        EP006  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP006"));
        EP007  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP007"));
        EP008  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP008"));
        EP009  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP009"));
        EP010  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP010"));
        EP011  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP011"));
        EP012  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP012"));
        EP013  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP013"));
        computeBalanceSheet();
        computeBalanceSheet2();
        computeComprehesiveIncome();
    }

    //Info: (20231115 - Yang){This contract calculates BalanceSheet's column, then add them to existing column in report.sol contract}
    function computeBalanceSheet() internal  {
        int256 A001_003 = int256(EP007 * latestSP002);
        report.addValue(reportName, "balanceSheet", "assets.details.cryptocurrency.totalAmountFairValue" , A001_003);
        report.addValue(reportName, "balanceSheet", "assets.details.cryptocurrency.breakdown.USDT.fairValue" , A001_003);

        int256 A002 = int256(EP007);
        report.addValue(reportName, "balanceSheet", "assets.details.cryptocurrency.breakdown.USDT.amount" , A002);

        int256 A020_026_004_005 = int256(((-EP003 * latestSP002) + (-EP012 * latestSP002)) / 10**18);
        report.addValue(reportName, "balanceSheet", "assets.details.accountsReceivable.totalAmountFairValue" , A020_026_004_005);
        report.addValue(reportName, "balanceSheet", "assets.details.accountsReceivable.breakdown.USDT.fairValue" , A020_026_004_005);
        report.addValue(reportName, "balanceSheet", "assets.totalAmountFairValue" , A020_026_004_005);
        report.addValue(reportName, "balanceSheet", "totalAssetsFairValue" , A020_026_004_005);

        int256 A025 = int256((-EP003) + (-EP012));
        report.addValue(reportName, "balanceSheet", "assets.details.accountsReceivable.breakdown.USDT.amount" , A025);

        int256 A006_008 = int256(EP006 * latestSP002/10**18);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue" , A006_008);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.breakdown.USDT.fairValue" , A006_008);

        int256 A007 = int256(EP006);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.breakdown.USDT.amount" , A007);

        int256 A031 = int256(((-EP006 * latestSP002) + (EP002 * latestSP002) + (-EP011 * latestSP002) + (-EP003 * latestSP002) + (-EP001 * latestSP003)) / 10**18);
        report.addValue(reportName, "balanceSheet", "liabilities.details.accountsPayable.totalAmountFairValue" , A031);

        int256 A038 = (-EP001);
        report.addValue(reportName, "balanceSheet", "liabilities.details.accountsPayable.breakdown.ETH.amount" , A038);

        int256 A039 =  ((-EP001 * latestSP003)/10**18);
        report.addValue(reportName, "balanceSheet", "liabilities.details.accountsPayable.breakdown.ETH.fairValue" , A039);

        int256 A034 = int256((-EP006) + EP002 + (-EP011) + (-EP003));
        report.addValue(reportName, "balanceSheet", "liabilities.details.accountsPayable.breakdown.USDT.amount" , A034);

        int256 A035 = int256(((-EP006 * latestSP002) + (EP002 * latestSP002) + (-EP011 * latestSP002) + (-EP003 * latestSP002))/10**18);
        report.addValue(reportName, "balanceSheet", "liabilities.details.accountsPayable.breakdown.USDT.fairValue" , A035);


    }

    function computeBalanceSheet2() internal{

        int256 A009 = int256((EP006 * latestSP002 +  (-EP006 * latestSP002) + (EP002 * latestSP002) + (-EP011 * latestSP002)+ (-EP003 * latestSP002) + (-EP001 * latestSP003))/10**18);
        report.addValue(reportName, "balanceSheet", "liabilities.totalAmountFairValue" , A009);

        int256 A010_012 = int256(((EP007 * latestSP002) + (EP012 * latestSP004)) / 10**18);
        report.addValue(reportName, "balanceSheet", "equity.details.retainedEarnings.totalAmountFairValue" , A010_012);
        report.addValue(reportName, "balanceSheet", "equity.details.retainedEarnings.breakdown.USDT.fairValue" , A010_012);

        int256 A011 = int256(EP007 + EP012);
        report.addValue(reportName, "balanceSheet", "equity.details.retainedEarnings.breakdown.USDT.amount" , A011);

        int256 A052 = int256(((-EP002 * latestSP002) + (EP001 * latestSP004)) / 10**18);
        report.addValue(reportName, "balanceSheet", "equity.details.otherCapitalReserve.fairValue" , A052);

        int256 A055 = int256((-EP002));
        report.addValue(reportName, "balanceSheet", "equity.details.otherCapitalReserve.breakdown.USDT.amount" , A055);

        int256 A056 = int256((-EP002 * latestSP002)/10**18);
        report.addValue(reportName, "balanceSheet", "equity.details.otherCapitalReserve.breakdown.USDT.fairValue" , A056);

        int256 A057 = int256(EP001);
        report.addValue(reportName, "balanceSheet", "equity.details.otherCapitalReserve.breakdown.ETH.amount" , A057);

        int256 A058 = int256((EP001 * latestSP003)/10**18);
        report.addValue(reportName, "balanceSheet", "equity.details.otherCapitalReserve.breakdown.ETH.fairValue" , A058);

        int256 A013 = int256(((EP007 * latestSP002) + (EP012 * latestSP002)  + (EP011 * latestSP002) + (-EP002 * latestSP002)
               + (EP001 * latestSP003))/10**18);
        report.addValue(reportName, "balanceSheet", "equity.totalAmountFairValue" , A013);

        int256 A014 = int256((EP006 * latestSP002 +  (-EP006 * latestSP002) + (EP002 * latestSP002) + (-EP011 * latestSP002)
               + (-EP003 * latestSP002) + (-EP001 * latestSP004) +EP007 * latestSP002 + (EP012 * latestSP002)
               +  (EP011 * latestSP002)  + (-EP002 * latestSP002) + (EP001 * latestSP003))/10**18);
        report.addValue(reportName, "balanceSheet", "totalLiabilitiesAndEquityFairValue" , A014);
    }

    //Info: (20231115 - Yang){This contract calculates comprehensiveIncome's column, then add them to existing column in report.sol contract}
    function computeComprehesiveIncome() internal {

        int256 B029_004 = int256(((EP011 * EP009) + (EP012 * EP009) + EP007 * EP009 + (-EP013 * EP009))/10**18);
        report.addValue(reportName, "comprehensiveIncome", "income.weightedAverageCost" , B029_004);
        report.addValue(reportName, "comprehensiveIncome", "netProfit" , B029_004);

        int256 B011_051 = int256(((EP011 * EP009) + (EP012 * EP009))/10**18);
        report.addValue(reportName, "comprehensiveIncome", "income.details.transactionFee.weightedAverageCost" , B011_051);
        report.addValue(reportName, "comprehensiveIncome", "income.details.transactionFee.breakdown.USDT.weightedAverageCost" , B011_051);

        int256 B050 = int256((EP011 + EP012));
        report.addValue(reportName, "comprehensiveIncome", "income.details.transactionFee.breakdown.USDT.amount" , B050);

        int256 B013_067 = int256(EP007 * EP009/10**18);
        report.addValue(reportName, "comprehensiveIncome", "income.details.liquidationFee.weightedAverageCost" , B013_067);
        report.addValue(reportName, "comprehensiveIncome", "income.details.liquidationFee.breakdown.USDT.weightedAverageCost" , B013_067);

        int256 B066 = int256((EP007));
        report.addValue(reportName, "comprehensiveIncome", "income.details.liquidationFee.breakdown.USDT.amount" , B066);

        int256 B100 = int256(-EP013);
        report.addValue(reportName, "comprehensiveIncome", "otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.amount" , B100);

        int256 B028_101 = int256((-EP013 * EP009)/10**18);
        report.addValue(reportName, "comprehensiveIncome", "otherGainsLosses.details.cryptocurrencyGains.weightedAverageCost" , B028_101);
        report.addValue(reportName, "comprehensiveIncome", "otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.weightedAverageCost" , B028_101);


    }
}
