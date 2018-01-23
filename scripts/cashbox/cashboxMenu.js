const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Select('Bayview SS Cashbox')
  t.Click_Button('Open Selected Cashbox')
  t.Wait()
  t.Click_Button('Cashbox Menu')
}
