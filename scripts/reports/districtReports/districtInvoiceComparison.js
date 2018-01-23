const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('*District Level Reports')
  t.Click_Button('Payment/Invoice Comparison Report')
  t.Wait()
  t.Click_Select('2015-2016')
  t.Enter_Text('dateStartInput', '12/13/2017')
  t.Enter_Text('dateEndInput', '12/13/2017')
  t.Enter_Text('dateInvoiceInput', '12/13/2017')
  t.Click_Select('Adrienne Clarkson P.S.')
  t.Click_Button('Continue')
}
