const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button('Edit the selected row.  Keyboard Shortcut: enter');
  t.Add_RowToGrid(t.GridTypeEnum.SUPPLIER, t.InputTypeEnum.TEXTBOX, 1, 'Art');
}
