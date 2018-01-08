const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Group Collection')
  t.Wait()
  // t.Click_ToCheck_InTable('Create New Group Collection:', 'Basketball - Sr. Girls - 2017/2018', 1)
  t.Click_ToCheck_InTable('', 'Basketball - Sr. Girls - 2017/2018', 1)
  t.Click_Button('select_button_create')
  t.Wait()
  t.Click_ToCheck_InTable('', '09', 1)
}
