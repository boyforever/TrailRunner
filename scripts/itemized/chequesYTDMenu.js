const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('View Year To Date Entries')
  t.Click_Button('Cheques YTD Menu')
  t.Click_Button('Non-Sufficient Funds Menu')
  t.Click_Button('Cheques YTD Menu')

  t.Click_Button('Receipt Menu')
  t.Click_Button('Issue New Receipts')
  t.Wait()
  t.Click_Button('Receipt Menu')
  t.Click_Button('Re-Issue Receipts')
  t.Wait()
  t.Click_Button('Receipt Menu')
  t.Click_Button('Cheques YTD Menu')

  t.Click_Button('YTD History Report')
  t.Click_Button('Cheques YTD Menu')
}
