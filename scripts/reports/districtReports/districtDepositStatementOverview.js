const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('*District Level Reports')
  t.Click_Button('Deposit Statement')
  t.Click_Button('Deposit Statement', 'Overview Report')
  t.Wait()
  t.Click_Select('2015-2016')
  t.Enter_Text('dateStartDateInput', '12/13/2017')
  t.Enter_Text('dateEndDateInput', '12/13/2017')
  t.Click_Select('BoysGolf')
  t.Click_Button('Continue')
}
