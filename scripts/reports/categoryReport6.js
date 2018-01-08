const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('6. Memo Summary')
  t.Wait()
  t.Click_Select('Art')
  t.Click_Button('Continue')
}
