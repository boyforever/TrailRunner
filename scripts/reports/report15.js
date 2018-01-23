const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('15. Modified Transactions')
  t.Enter_Text('dateStartDateInput', '')
  t.Enter_Text('dateEndDateInput', '')
  t.Click_Button('Continue')
}
