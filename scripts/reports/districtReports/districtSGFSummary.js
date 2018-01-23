const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('*District Level Reports')
  t.Click_Button('School Generated Funds Reports')
  t.Click_Button('School Generated Funds Reports', 'Summary')
  t.Wait()
  t.Click_Select('School Funds Government Report Schedule - Schedule E')
  t.Click_Select('2015-2016')
  t.Enter_Text('dateStartInput', '12/13/2015')
  t.Enter_Text('dateEndInput', '12/13/2016')
  t.Click_Select('Include cashbox')
  t.Click_Button('Continue')
}
