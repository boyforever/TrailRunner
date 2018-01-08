const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('7. Categories With No Activity')
  t.Wait()
  t.Click_Select('E-Balance sheet')
  t.Click_Select('E-Board Funds')

  t.Click_Button('Continue')
}
