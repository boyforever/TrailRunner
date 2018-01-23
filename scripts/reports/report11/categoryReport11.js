const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function(reportname) {
  t.Click_Button('Show All Reports')
  t.Click_Button('11.Transaction Reports Various')
  switch (reportname) {
    case '11':
      openReport('Customized Transaction Report')
      break
    case '11A':
      openReport('Transaction Report Detailed By Transaction Type')
      break
    case '11B':
      openReport('Range Of Date Transactions Detailed Summary')
      break
    case '11C':
      openReport('Range Of Date Transactions Short Form Summary')
      break
    case '11D':
      openReport('Monthly Bank Statement')
      break
    case '11E':
      openReport('Outstanding Transactions Detailed By Date')
      break
    case '11F':
      openReport('Outstanding Transactions Detailed By Category')
      break
    case '11G':
      openReport('Outstanding Transactions Overview')
      break
    case '11H':
      openReport('Cleared Transactions Detailed By Date')
      break
    case '11I':
      openReport('Cleared Transactions Detailed By Category')
      break
    case '11J':
      openReport('Cleared Transactions Overview')
      break
    case '11K':
      openReport('Reprint-Monthly Bank Reconciliation')
      break
    case '11L':
      openReport('Reprint-Monthly Bank Reconciliation Overview Of Categories')
      break
    case '11M':
      openReport('Reprint-Monthly Bank Reconciliation Reconciliation Details')
      break
  }
  // t.Wait()
  // t.Click_ToUncheck('Active Categories Only')
  // t.Click_Select('E-Board Funds')
  // t.Enter_Text('dateStartInput', '10/13/2017')
  // t.Enter_Text('dateEndInput', '12/13/2017')
  // t.Click_Button('Continue')
}
function openReport(reportname) {
  t.Click_Button('reportName', reportname)
}
