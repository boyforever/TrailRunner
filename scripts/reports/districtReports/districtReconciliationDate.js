const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('*District Level Reports')
  t.Click_Button('Reconciliation Date By School')
  t.Select_Option('October')
  t.Click_Button('Continue')
}
