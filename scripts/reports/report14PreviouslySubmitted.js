const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('14. Tax Rebate Reports')
  t.Click_Button('Previously Submitted')
  t.Click_Select('2015-2016')
  t.Click_Select('07/04/2016-1')
  t.Click_Button('Continue')
}
