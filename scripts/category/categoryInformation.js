const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button("Insert new row");
  t.Add_RowToGrid(GridTypeEnum.CATEGORY, ColumnTypeEnum.TEXTBOX, 1, 'Art-TEST');
}
