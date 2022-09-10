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
  if (Object.keys(users).length === 0) console.error('There is no users data') // first of all check if there is any user data - to quit function earlier if there is no any and make whole code faster 
    const resultOfMapping = users.map(i => {
      // mobile data
        const mobileData = mobileDevices.map(item => item.user)
        const findUserMobileData = mobileData.filter(item => item === i.id)
        const sumOfMobileDevices = findUserMobileData.length
      // iot data
        const iotData = iotDevices.map(item => item.user)
        const findUserIotData = iotData.filter(item => item === i.id)
        const sumOfIosDevices = findUserIotData.length
      // sum
        const sum = sumOfMobileDevices + sumOfIosDevices
        const name = i.name
      // result
        return (name + ' => ' + sum)
    })
    return result = console.table(resultOfMapping)
}
