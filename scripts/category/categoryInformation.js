const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button("Insert new row");
  t.Add_RowToGrid(t.GridTypeEnum.CATEGORY, t.InputTypeEnum.TEXTBOX, 1, 'Art-TEST');
}
