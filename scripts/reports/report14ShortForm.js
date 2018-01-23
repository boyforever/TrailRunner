const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('14. Tax Rebate Reports')
  t.Click_Button('Short Form')
  t.Enter_Text('dateStartDateInput', '')
  t.Enter_Text('dateEndDateInput', '')
  t.Click_Button('Continue')
}
