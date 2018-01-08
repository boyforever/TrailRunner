const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Close Out')
  t.Wait()
  t.Click_Button('Cancel')
}
