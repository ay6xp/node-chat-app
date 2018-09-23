var expect = require('expect');
var {generateMessage} = require('./messages');

describe('generateMessage',() => {
//not async so don't need done arg
it('should generate the correct message object',()=> {
  var res = generateMessage('ahmed','hello world');
  expect(res.from).toBe('ahmed');
  expect(res.text).toBe('hello world');
  expect(res.createdAt).toBeA('number');
});


});
