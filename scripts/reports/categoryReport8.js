const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('8. Trial Balance')
  t.Wait()
  t.Click_ToUncheck('Active Categories Only')
  t.Select_Option('Category Number')
  t.Click_Select('E-Balance sheet')
  t.Click_Select('E-Board Funds')

  t.Click_Button('Continue')
}
