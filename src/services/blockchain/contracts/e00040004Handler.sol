// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transactionContract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/iTransactionHandler.sol";
//Info: (20231115 - Yang){This contract is to calculate the variables based on the excel reports, and to record transaction data from transactionContract.sol, the logic is the same in other handlers contracts}
contract E00040004Handler is ITransactionHandler{

    Reports public report;
    IParser public Iparser;
    TransactionContract private transactionContract;

    event EventIdAndRateReceived(string eventId, int256 SP002, int256 SP003, int256 SP004);
    event EventEP001(string eventId, int256 EP001,int256 EP002,int256 EP003,int256 EP004,int256 EP006, int256 EP007);
    int256 latestSP002;
    int256 latestSP003;
    int256 latestSP004;
    int256 EP001;
    int256 EP002;
    int256 EP003;
    int256 EP004;
    int256 EP006;
    int256 EP007;
    string eventIdFromTimeSpan;
    string reportID;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    //Info: (20231115 - Yang){This is function is to record event data in arrays}
    function processTransaction(bytes32[] memory data, address recorder) external override {

        require(data.length == 8, "Data length for E00030001 must be 8");

        bytes32[] memory paramKeys = new bytes32[](7);
        int256[] memory paramValues = new int256[](7);

        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2]));
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3]));
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4]));
        paramKeys[3] = Iparser.stringToBytes32("EP004");
        paramValues[3] = int256(block.timestamp);
        paramKeys[4] = Iparser.stringToBytes32("trans_time");
        paramValues[4] = int256(uint256(data[5]));
        paramKeys[5] = Iparser.stringToBytes32("EP006");
        paramValues[5] = int256(uint256(data[6]));
        paramKeys[6] = Iparser.stringToBytes32("EP007");
        paramValues[6] = int256(uint256(data[7]));

        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }

    /*Info: (20231115 - Yang){This function gets the rates and eventIDs, then calls transactionContract to get full data based on the eventIDs,
    finally, store them in variables in order to calculate}*/
    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportID ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external override{
        latestSP002 = int256(uint256(_SP002));
        latestSP003 = int256(uint256(_SP003));
        latestSP004 = int256(uint256(_SP004));
        eventIdFromTimeSpan = Iparser.bytes32ToString(_eventId);
        reportID = Iparser.bytes32ToString(_reportID);
        emit EventIdAndRateReceived(eventIdFromTimeSpan, latestSP002, latestSP003, latestSP004);

        EP001  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP001"));
        EP002  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP002"));
        EP003  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP003"));
        EP004  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP004"));
        EP006  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP006"));
        EP007  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP007"));
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP004,EP006,EP007);

        computeBalanceSheet();
        computeComprehesiveIncome();
    }

    //Info: (20231115 - Yang){This contract calculates BalanceSheet's column, then add them to existing column in report.sol contract}
    function computeBalanceSheet() internal  {

        int256 A001_004_005_006_009 = int256(((-EP001 * latestSP003) + EP002 * latestSP004 + (-EP004 * latestSP002)) / 10**18);
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.totalAmountFairValue", A001_004_005_006_009);
        report.addValue(reportID, "balanceSheet", "assets.totalAmountFairValue", A001_004_005_006_009);
        report.addValue(reportID, "balanceSheet", "totalAssetsFairValue", A001_004_005_006_009);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue", A001_004_005_006_009);
        report.addValue(reportID, "balanceSheet", "liabilities.totalAmountFairValue ", A001_004_005_006_009);

        int256 A046 = EP002;
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.breakdown.BTC.amount" , A046);

        int256 A042 = -EP001;
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.ETH.amount" , A042);

        int256 A047 = EP002 * latestSP004;
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.breakdown.BTC.fairValue" , A047);

        int256 A015 = int256(-EP001);
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.breakdown.ETH.amount", A015);

        int256 A016_043 = int256(((-EP001 * latestSP003)) / 10**18);
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.breakdown.ETH.fairValue", A016_043);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.ETH.fairValue", A016_043);

        int256 A044 = int256(EP002 + (-EP004));
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.BTC.amount", A044);

        int256 A045 = int256((EP002 * latestSP004 + (-EP004 * latestSP002)) / 10**18);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.BTC.fairValue", A045);

        int256 A010_12_13 = int256((EP003 * latestSP002 + EP004 * latestSP002)/10**18);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.totalAmountFairValue", A010_12_13);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.breakdown.USDT.fairValue", A010_12_13);
        report.addValue(reportID, "balanceSheet", "equity.totalAmountFairValue", A010_12_13);

        int256 A011 = int256(EP003 + EP004);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.breakdown.USDT.amount", A011);

        int256 A014 = int256(((-EP001 * latestSP003) + EP002 * latestSP004 + (-EP004 * latestSP002) + EP003 * latestSP002 + EP004 * latestSP002) / 10**18);
        report.addValue(reportID, "balanceSheet", "totalLiabilitiesAndEquityFairValue", A014);

    }

    //Info: (20231115 - Yang){This contract calculates comprehensiveIncome's column, then add them to existing column in report.sol contract}
    function computeComprehesiveIncome() internal {

        int256 B029_011_051_004 = int256((EP003 * EP006 + EP004 * EP006) / 10**18);
        report.addValue(reportID, "comprehensiveIncome", "income.weightedAverageCost", B029_011_051_004);
        report.addValue(reportID, "comprehensiveIncome", "income.details.transactionFee.weightedAverageCost", B029_011_051_004);
        report.addValue(reportID, "comprehensiveIncome", "income.details.transactionFee.breakdown.USDT.weightedAverageCost", B029_011_051_004);
        report.addValue(reportID, "comprehensiveIncome", "netProfit", B029_011_051_004);

        int256 B050 = EP003 + EP004;
        report.addValue(reportID, "comprehensiveIncome",  "income.details.transactionFee.breakdown.USDT.amount", B050);
    }
}
