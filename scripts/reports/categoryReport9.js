const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('9.Trial Balance')
  t.Wait()
  t.Click_ToUncheck('Active Categories Only')
  t.Select_Option('Category Number')
  t.Click_Select('E-Balance sheet')
  t.Click_Select('E-Board Funds')
  t.Enter_Text('dateStartInput', '10/13/2017')
  t.Enter_Text('dateEndInput', '12/13/2017')
  t.Click_Button('Continue')
}
