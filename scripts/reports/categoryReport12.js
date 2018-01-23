const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('10.Trial Balance')
  t.Click_Button('12.School\'s Net Worth Grand')
}
