const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Add_RowToGrid(GridTypeEnum.CASHBOX, ColumnTypeEnum.TEXTBOX, 1, 'test');
}
