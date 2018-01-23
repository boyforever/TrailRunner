const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('Journal Entry Report')
  t.Enter_Text('dateEditStartDateInput', '')
  t.Enter_Text('dateEditEndDateInput', '')
  t.Click_Button('Continue')
}
