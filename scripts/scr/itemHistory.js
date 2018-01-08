const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Item History')
  t.Select_List('', 'Fully Paid')
  t.Select_List('', '2016/2017')
}
