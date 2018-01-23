const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('*District Level Reports')
  t.Click_Button('Vendor')
  t.Click_Button('Vendor', 'Summary Report')
  t.Wait()
  t.Enter_Text('dateStartInput', '12/13/2017')
  t.Enter_Text('dateEndInput', '12/13/2017')
  t.Click_Button('Continue')
}
