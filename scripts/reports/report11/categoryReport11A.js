const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('11.Transaction Reports Various')
  t.Click_Button('reportName', 'Transaction Report Detailed By Transaction Type')
  t.Click_ToCheck('Select All Transaction Types')
  t.Click_ToCheck('Transaction Type/#')
  t.Click_ToCheck('Category Name')
  t.Click_Button('Continue')
}
