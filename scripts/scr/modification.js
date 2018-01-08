const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Modification')
  t.Wait()
  t.Click_Button_InTable('', '1', 6)
  t.Wait()
  t.Click_Button('Cancel')
}
