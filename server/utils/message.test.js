var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./messages');

describe('generateMessage',() => {
//not async so don't need done arg
it('should generate the correct message object',()=> {
  var res = generateMessage('ahmed','hello world');
  expect(res.from).toBe('ahmed');
  expect(res.text).toBe('hello world');
  expect(res.createdAt).toBeA('number');
});


});

describe('generateLocationMessage', () => {
  it("should generate correct location object", () => {
    var res = generateLocationMessage('Admin', 1, 1);
    expect(res.from).toBe('Admin');
    expect(res.url).toBe("https://www.google.com/maps?q=1,1");
    expect(res.createdAt).toBeA('number');

  });

});
