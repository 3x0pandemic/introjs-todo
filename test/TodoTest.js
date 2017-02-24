var assert = require('chai').assert;

describe("Todo", function() {
  it("can test", function() {
    var aTodo = new Todo();
    //Act
    //Assert
    assert.isOk(aTodo);
  });
  it("has error without a name", function(done) {
    //Arrange
    var aTodo = new Todo();
    aTodo.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

});
