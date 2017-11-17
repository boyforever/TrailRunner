const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button("Insert new row.  Keyboard Shortcut: insert");
  t.Add_RowToGrid(t.GridTypeEnum.LEDGER, t.InputTypeEnum.TEXTBOX, 1, "11/12/2017");
}
