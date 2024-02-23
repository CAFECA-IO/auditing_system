/*const { PrismaClient } = require('@prisma/client');

const { empty } = require('rxjs');

const prisma = new PrismaClient();

async function main() {
  const reports_without_content = await prisma.evidences_test.findMany({
    where: {
      OR: [{ content: null }, { content: '' }],
    },
  });

  reports_without_content.forEach((record) => {
    const tokenid_without_0 = parseInt(record.token_id).toString();
      file_path = `../../auditin_system_api/prisma/reports/report(token)_ID:${tokenid_without_0}.json`;
      await prisma.evidences_test.update({
        where: {
          id: record.token_id,
        },
        data: {
          content: file_path,
        },
      });
  });
}

main();*/
const fs = require('fs').promises;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function loadFileContent(filePath) {
  try {
    // Read the file content
    const content = await fs.readFile(filePath, 'utf8'); // 'utf8' ensures the content is read as a string
    return content; // Return the content of the file
  } catch (error) {
    console.error('Error reading file:', error);
    return null; // Return null or handle the error as needed
  }
}

async function main() {
  try {
    const reports_without_content = await prisma.evidences_test.findMany({
      where: {
        OR: [{ content: null }, { content: '' }],
      },
    });

    for (const record of reports_without_content) {
      const tokenid_without_0 = parseInt(record.token_id).toString();
      let content = '';
      const file_path = `/Users/yong/SmartContracts/Auditing_system/auditing_system_11_29/auditing_system_api/reports/report(token)_ID:${tokenid_without_0}.json`;
      content = await loadFileContent(file_path);
      console.log('content', content);

      await prisma.evidences_test.update({
        where: {
          evidence_id: record.evidence_id, // Assuming `id` is the correct field to match against
          // Assuming `id` is the correct field to match against
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
