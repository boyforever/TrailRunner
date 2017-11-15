const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button('Inert new row.  Keyboard Shortcut: insert');
  t.Add_RowToGrid('category', 'textbox', 1, 'test selenium');
}
