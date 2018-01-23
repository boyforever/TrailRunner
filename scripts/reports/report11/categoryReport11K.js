const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('11.Transaction Reports Various')
  t.Click_Button('reportName', 'Reprint-Monthly Bank Reconciliation')
  t.Click_Select('2015-2016')
  t.Click_Select('04/30/2016')
  t.Click_Button('Continue')
}
