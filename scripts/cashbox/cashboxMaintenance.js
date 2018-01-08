const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Add_RowToGrid(t.GridTypeEnum.CASHBOX, t.InputTypeEnum.TEXTBOX, 1, 'test')
}
