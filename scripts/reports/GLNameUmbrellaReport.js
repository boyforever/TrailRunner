const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('GL Name Umbrella Report')
  t.Click_ToCheck('Select All GL Name')
  t.Enter_Text('dateStartInput', '')
  t.Enter_Text('dateEndInput', '')
  t.Click_Button('Continue')
}
