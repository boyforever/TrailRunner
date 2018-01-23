const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('*District Level Reports')
  t.Click_Button('Umbrella Reports')
  t.Click_Button('Umbrella Reports', 'Summary Report')
  t.Wait()
  t.Click_Select('2015-2016')
  t.Enter_Text('dateEndInput', '12/13/2017')
  t.Click_Button('Continue')
}
