const fs = require('fs');

const rawData = fs.readFileSync(
  'src/services/blockchain/scripts/dummy_data.json',
  'utf8',
);

const data = JSON.parse(rawData);

function isTimestamp(value) {
  const timestampPattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return timestampPattern.test(value);
}

data.payload.forEach((event) => {
  let valuesArray = [event.event_code]; // 初始化数组并添加 event_code 作为第一个元素

  console.log('Event Code:', event.event_code);
  console.log('Type:', event.type);
  console.log('Details:');
  Object.keys(event.details).forEach((key) => {
    let value = event.details[key];
    if (!isTimestamp(value)) {
      value = value * 10 ** 18;
    }
    valuesArray.push(value); // 将处理后的值添加到数组中
    console.log(`${key}: ${value}`);
  });

  console.log('Values Array:', valuesArray); // 打印当前事件的所有值的数组
  console.log('-------------------------------');
});
