const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('18.Government Reports')
  t.Click_Select('School Funds Government Report - Schedule 14')
  t.Enter_Text('dateStartInput', '10/13/2017')
  t.Enter_Text('dateEndInput', '12/13/2017')
  t.Click_Button('Continue')
}
