const fs = require('fs').promises;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

async function loadFileContent(filePath) {
  const absolutePath = path.resolve(filePath); // 將 filePath 轉換為絕對路徑
  console.log('Absolute file path:', absolutePath); // 打印絕對路徑

  try {
    const content = await fs.readFile(absolutePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

async function main() {
  const contract_address = process.argv[2].toLowerCase();

  /*const file_path = `reports/report(token)_ID:1_contract:${contract_address}.json`;
  content = await loadFileContent(file_path);
  console.log('content', content);*/

  try {
    console.log('contract_address:', contract_address);
    const reports_without_content = await prisma.evidences.findMany({
      where: {
        contract_address: contract_address,
        OR: [{ content: null }, { content: '' }, { content: 'a json content' }],
      },
    });

    for (const record of reports_without_content) {
      const tokenid_without_0 = parseInt(record.token_id).toString();
      let content = '';
      //這邊用絕對路徑要改
      const file_path = `reports/report(token)_ID:${tokenid_without_0}_contract:${contract_address}.json`;
      content = await loadFileContent(file_path);
      console.log('content', content);

      await prisma.evidences.update({
        where: {
          evidence_id: record.evidence_id,
        },
        data: {
          content: content,
        },
      });
    }
  } catch (error) {
    console.error('Error updating records:', error);
  }
}

main();
