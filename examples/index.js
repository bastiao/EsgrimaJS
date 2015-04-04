// See mocha

var EsgrimaTestSuite = {}
var EsgrimaActions = {}



var jsEsgrima = function(description, callbackOfTests, group){

    // Here is possible to build the tests with QUnit, Mocha,
    // or whatever.
    // Based on Karma Test Runner design.
    EsgrimaTestSuite.push({'description': description,
        'callbackOfTests':callbackOfTests,
        'group': group});
};

jsEsgrima("Search for Something", function() {
  it("contains spec with an expectation", function() {
    console.log("This is an action");
    expect(true).toBe(true);

  });
}, 'search');


jsEsgrima("Look for the result", function() {
  it("contains spec with an expectation", function() {
    console.log("lol");
    expect(true).toBe(true);

  });
}, 'results');


export {EsgrimaTestSuite}
