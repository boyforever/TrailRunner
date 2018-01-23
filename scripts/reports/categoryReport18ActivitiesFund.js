const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('18.Government Reports')
  t.Enter_Text('dateEditStartDateInput', '10/13/2017')
  t.Enter_Text('dateEditEndDateInput', '12/13/2017')
  t.Click_Button('Continue')
}
