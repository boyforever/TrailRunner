const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('11.Transaction Reports Various')
  t.Click_Button('reportName', 'Outstanding Transactions Detailed By Date')
}
