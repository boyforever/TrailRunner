function ReadFileToJson(fileName){
  const path = require('path')
  var fs = require('fs');
  let reqPath = path.join(__dirname, fileName + '.json');
  return JSON.parse(fs.readFileSync(reqPath , 'utf8'));
};

module.exports.ParseTestCase = function(testCaseTitle){
  return ReadFileToJson('../specs/cases/' + testCaseTitle);
};

module.exports.ParseParameters = function(testParameterGroupTitle){
  return ReadFileToJson('../specs/parameters/' + testParameterGroupTitle);
};
