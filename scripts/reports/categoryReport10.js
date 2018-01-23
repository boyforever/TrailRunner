const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('10.Trial Balance')
  t.Wait()
  t.Click_ToUncheck('Active Categories Only')
  t.Click_Select('E-Board Funds')
  t.Enter_Text('dateStartInput', '10/13/2017')
  t.Enter_Text('dateEndInput', '12/13/2017')
  t.Click_Button('Continue')
}
