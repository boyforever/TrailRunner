const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button('Edit the selected row.  Keyboard Shortcut: enter');
  t.Add_RowToGrid(GridTypeEnum.SUPPLIER, ColumnTypeEnum.TEXTBOX, 1, 'Art');
}
