const fs = require("fs");
const path = require("path");

(function init() {
  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf-8"));
  const mobileDevices = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/mobile_devices.json"), "utf-8"));
  const iotDevices = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/iot_devices.json"), "utf-8"));

  console.log(new Date().toISOString());
  console.log(count(users, mobileDevices, iotDevices));
  console.log(new Date().toISOString());
})();

function count(users, mobileDevices, iotDevices) {
  let result;
  const [usersKeys, mobileKeys, iotkeys] = [Object.keys(users).length, Object.keys(mobileDevices).length, Object.keys(iotDevices).length]

  // first condition
  if (usersKeys === 0 || mobileKeys === 0 || iotkeys === 0) return 'There is no user data'

  // second condition
  if (usersKeys === 1) {
    const mdFiltered = mobileKeys === 0 ? mobileDevices[0].user : mobileDevices.filter(obj => obj.user === users.id)
    let idFiltered
    if (mobileKeys === 0) return idFiltered = iotkeys === 0 ? iotDevices[0].filter(obj => obj.mobile === mobileDevices[0].id) : iotDevices.filter(obj => obj.mobile === mobileDevices[0].id)
    mdFiltered.map(item => { return idFiltered = iotDevices.filter(obj => obj.mobile === item.id) })
    let length
    if (idFiltered === undefined || idFiltered.length === undefined || idFiltered.length === 0) {
      length = 0
    } else if (idFiltered.length > 0) {
      const newData = Object.assign({}, idFiltered),
        dataLength = Object.keys(newData).length
      let sum = 0
      for (let n = 0; n < dataLength; n++) {
        sum += newData[n].length
      }
      length = sum
    } else length = 1
  }

  // third condition
  const resultOfMapping = users.map(i => {
    const mdFiltered = mobileDevices.filter(obj => obj.user === i.id)
    let idFiltered = mdFiltered.map(item => {
      return iotDevices.filter(obj => obj.mobile === item.id)
    })
    let length
    if (idFiltered.length === undefined || idFiltered.length === 0) {
      length = 0
    } else if (idFiltered.length > 0) {
      const newData = Object.assign({}, idFiltered),
        dataLength = Object.keys(newData).length
      let sum = 0
      for (let n = 0; n < dataLength; n++) {
        sum += newData[n].length
      }
      length = sum
    } else length = 1
    const sumOfDevices = length
    return i.name + ' => ' + sumOfDevices
  })
  return result = resultOfMapping
}
module.exports = count
