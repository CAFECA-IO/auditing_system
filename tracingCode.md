Auditing system tracing codes

在這個專案下有三個子專案，在根目錄下的專案都是以智能合約以及語調用智能合約的腳本為主。在auditing_system_api中，這個專案是以將智能合約上的報表欄位製成報表並整理成api、存放在本地端資料庫以及在根目錄的reports資料夾中下載一個api。
在baifa_database專案中，是將reports資料夾裡面的特定api存放在evidences的content中。

P.s. 在重新操作時，請都先將根目錄底下的.env裡除了private key之外的合約地址以及REPORT_ID刪除。另外，reportID就是tokenID

npx hardhat run src/services/blockchain/scripts/1.deploy.js --network iSunCoin

這一行我們將會部署這個系統的必要合約，並且將部署好的合約自動存放在根目錄底下的.env檔案中，包含：PARSER_ADDRESS, REPORT_ADDRESS, TRANSACTION_ADDRESS, TIMESPAN_ADDRESS, ROUTER_ADDRESS, NFT_ADDRESS

2. npx hardhat run src/services/blockchain/scripts/2.deploy_handlers.js --network iSunCoin

這一行，輸入後會出現：Please enter the contract code to deploy the corresponding contract:
, 你可以輸入你想要部署的交易類別假設是”E00010001”，這邊輸入字串即可，他就會部署e00010001_handler.sol這個智能合約，並把地址存在.env中。

3.  npx hardhat run src/services/blockchain/scripts/3.register_handler.js --network iSunCoin

這一行輸入後會出現Please enter the transaction type (bytes32): 我們需要將剛剛部署的處理器註冊到必要合約中，輸入0x4530303031303030310000000000000000000000000000000000000000000000
十進位代表：E00010001，這個城市會自動到.env黨裡面搜尋E00010001_handler的地址，並將他註冊進去（使用router.sol 中的registerHandler function, 這個功能會調用transactionContract
中的registerHanlder功能）

4-1. npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin

輸入完會出現
Please enter the data (as a comma-separated list of bytes32 values):
你可以輸入(EP開頭的欄位除了timestamp都要\*10^18次方，再轉成bytes32)：0x0000000000000000000000000000000000000000000000000000006669727374,(eventID)
0x4530303031303030310000000000000000000000000000000000000000000000,（type）
0x00000000000000000000000000000000000000000000021e19e0c9bab2400000,(EP001)
0x0000000000000000000000000000000000000000000000008ac7230489e80000, (EP002)
0x0000000000000000000000000000000000000000000000000de0b6b3a7640000,(EP003)
0x0000000000000000000000000000000000000000000000000000000065d6e233,(EP004)timestamp
0x0000000000000000000000000000000000000000000000000e043da617250000(EP005)

這一行會調用router中的addTransactionRecord功能(router會調用transactionContract中addRecord
的功能)，將資料傳進處理器中。

4-2. 我們除了自己輸入資料外，也可以將events API下載下來，並使用爬蟲爬取資料並上傳到區塊鏈上（但要確保API中的所有event交易種類的處理器都已經部署並註冊），這邊的腳本在 根目錄下的event_crawler.js，我們會將API中的資料整理成上方那樣的bytes32以逗號區隔開的字串，並自動在console 輸入npx hardhat run src/services/blockchain/scripts/4.transaction_record.js --network iSunCoin。

5. npx hardhat run src/services/blockchain/scripts/5.set_rate.js --network iSunCoin

這邊我們要輸入當前的匯率，
0x0000000000000000000000000000000000000000000000000dbd2fc137a30000,(SP002)
0x000000000000000000000000000000000000000000000056bc75e2d631000000,(SP003)
0x000000000000000000000000000000000000000000000581767ba6189c400000,(SP004)
0x66697273745f7265706f72740000000000000000000000000000000000000000(report_name)
在這裡會調用router的setRate功能(使用timeSpanReport的setRate功能)。

6. npx hardhat run src/services/blockchain/scripts/6.set_time_span.js --network iSunCoin

輸入這一行後Please enter reportName(bytes32)(startTime, EndTime, ispublic have already set default value to do auto test):
輸入剛剛在setRate所設定的report_name，而時間區間目前是簡單將最後一個event的時間+-1（ const latestTransactionTime = await router.getLatestTransactionTime();
為了自動測試方便），未來可以依據需要的時間區間更改代碼。
接著腳本會調用router的generateReport將時間區間內的所有event交給相應的Handler去做計算，計算出每個報表欄位並存放在report.sol。

完成以上後，會將metaData（見以下）當作參數，調用router中的mintReportNFT去mint一個token。（\_ispublic預設為0代表私人的報表）。另外recipientAddress，要調整為收取這個token的錢包地址。（完成後可以用爬蟲爬到這個evidence（殼））
const recipientAddress = '0x2390B5b1DA7a78266111143D503D50c4636F5680';
const \_ispublic = 0;
try {
console.log('start minting NFT');
const tx = await nftContractWithSigner.mintReportNFT(
recipientAddress,
startTime,
endTime,
report_Name,
\_ispublic,
);

7. 現在，區塊鏈上面有以陣列形式存在的報表欄位，我們要將它放置在本地端資料庫。
   來到audting_system_api這個專案下，運行node ./auditing_system_api/pages/api/v1/blockchain_to_prisma.js {report_name} {tokenID} ${routerContractAddress}。其中，report_name是剛剛在setRate所設定的report_name以字串輸入指令即可，tokenID是剛剛殼mint出來的tokenID。
   （注意，如果你是重新走流程，要先將資料庫裡的資料清空，因為不能有重複的reportID）。走完上述流程時，你可以在本地資料庫找到報表欄位。

8. 接著，我們要將本地資料庫的資料下載到根目錄的reports資料夾中。運行save_api_to_local.js。node ./auditing_system_api/pages/api/v1/save_api_to_local.js {tokenID} ${nftContractAddress}。這個腳本會去找資料庫reportID=tokenID的欄位，然後將它整理成json檔案，存放在根目錄的reports資料夾中。這個json的檔名是report(token)\_ID:{tokenID}\_contract:{nft contract address}.json。像是這樣，report(token)\_ID:1_contract:0x0745606d9f33a7e0170940eecc3e548ad97cf8b7.json

以上所有步驟，可以直接執行auto_check.js完成（但是輸入的資料是寫死的，這是為了自動測試整個流程是否有誤）

9. 等到爬蟲爬到這個evidence時，就可以來到baifa_database這個專案下，執行test.js這個腳本（第三個參數為nft contract address）。他會去搜尋還沒有content的evidence，搜尋到後，判斷此evidence的contract_address，比對參數裡的nftcontract裡面的contract_address，如果一樣，利用對應的tokenID將此份json檔案放置在evidence的。

操作流程：請參考readme 中的 Run the auto test
