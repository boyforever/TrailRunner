const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('Object Codes Umbrella Report')
  t.Enter_Text('dateStartInput', '')
  t.Enter_Text('dateEndInput', '')
  t.Click_Button('Continue')
}
