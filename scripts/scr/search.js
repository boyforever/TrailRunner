const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Enter_Text('Student Last Name', 'aa')
  t.Click_Button('Search')
  t.Wait()
  t.Click_ToCheck('Haas, Anna', '')
  t.Click_Button('Select')
  t.Wait()
}
