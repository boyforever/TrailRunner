const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Print')
  t.Wait()
  t.Click_Button('Print Statements')
}
