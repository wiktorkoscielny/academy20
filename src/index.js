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
        const mobileData = mobileDevices.map(item => item.user),
          findUserMobileData = mobileData.filter(item => item === i.id),
          sumOfMobileDevices = findUserMobileData.length
      // iot data
        const mdFiltered = mobileDevices.filter(obj => obj.user === i.id)
        let idFiltered =  mdFiltered.map(item => {
          return iotDevices.filter(obj => obj.mobile === item.id)
        })
        let length
        if (idFiltered.length === undefined || idFiltered.length === 0) {
          length = 0
        } else if (idFiltered.length > 0) {
          [a] = idFiltered, b = JSON.stringify(a), c = JSON.parse(b)
          d = c.map(i => i.id)
          length = d.length + 1
        } else length = 1
          const sumOfDevices = sumOfMobileDevices + length
        return i.name + ' => ' + sumOfDevices
    })
    return result = resultOfMapping
}
