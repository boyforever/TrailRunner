const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Enter_Text("Student Last Name", "aa");
  t.Click_Button("Search");
  t.Click_ToCheck("Clement, Isaac");
}
