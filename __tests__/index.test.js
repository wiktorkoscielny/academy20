const count = require('../src/index');

const users = [{ "id": "a", "name": "John" }, { "id": "b", "name": "Dave" }],
    mobileDev = [{ "id": "mobile1", "name": "Device - 1", "user": "a" }, { "id": "mobile2", "name": "Device - 2", "user": "b" }],
    iotDev = [{ "id": "x", "name": "IOT - 1", "mobile": "mobile1" }, { "id": "y", "name": "IOT - 1", "mobile": "mobile2" }],
    user1 = [{ "id": "a", "name": "John" }],
    user2 = [{ "id": "b", "name": "Dave" }],
    oneMobile = [{ "id": "mobile1", "name": "Device - 1", "user": "a" }],
    oneIot = [{ "id": "y", "name": "IOT - 1", "mobile": "mobile2" }],
    emptyUsers = [],
    emptyMobileDev = [],
    emptyIotDev = []

test('Correctly counts devices that belongs to each user', () => {
    expect(count(users, mobileDev, iotDev)).toStrictEqual(["John => 1", "Dave => 1"])
})
test('Check if there is any user data first', () => {
    expect(count(emptyUsers, mobileDev, iotDev)).toEqual('There is no user data')
    expect(count(users, emptyMobileDev, iotDev)).toEqual('There is no user data')
    expect(count(users, mobileDev, emptyIotDev)).toEqual('There is no user data')
})
test('Check if function will work when there will be only one user or only one mobile device or only one iot device', () => {
    expect(count(user1, mobileDev, iotDev)).toStrictEqual(["John => 1"])
    expect(count(user2, mobileDev, iotDev)).toStrictEqual(["Dave => 1"])
    expect(count(users, oneMobile, iotDev)).toStrictEqual(["John => 1", "Dave => 0"])
    expect(count(users, mobileDev, oneIot)).toStrictEqual(["John => 0", "Dave => 1"])
})
test('Check if function will work when two of three datas has only one pair of properties and methods', () => {
    expect(count(user1, oneMobile, iotDev)).toStrictEqual(["John => 1"])
})
test('Expect function to work even if all datas contains only one pair of properties and methods', () => {
    expect(count(user2, oneMobile, oneIot)).toStrictEqual(["Dave => 0"])
})