let testData = require('./testData');
let testClient = new (require('./testClient'))(testData);
let validators = require('../shared/fromRobotSchemas.js');

testClient.socket = false;

testClient.commandMap.scanArea(1);
testClient.commandMap.viewInventory();
testClient.commandMap.equip();
testClient.commandMap.dig(0, 0, 0, 1, 1, 1, 0, 0);
testClient.commandMap.place(0, 0, 0, 1, 1, 1, 0, 0);
testClient.commandMap.move(2, 2, 2, 1);
testClient.commandMap.interact(1, 1, 1, 1);
testClient.commandMap.inspect(1, 1, 1, 1);
testClient.commandMap.select(2);
testClient.commandMap.transfer(2, -1, 3, -1, 2);
// craft not tested since it's all on the robot
// same for raw
testClient.commandMap.sendPosition();
testClient.commandMap.sendComponents();
