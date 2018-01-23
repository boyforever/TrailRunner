const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  // t.Enter_Text('Pay To The Order Of:', 'testing')
  // t.Enter_Text('Address:', '')
  // t.Wait(5000)
  // t.Click_Button('You are attempting to create a new supplier.', 'Continue')
  // t.Wait()
  // t.Click_Alert('OK')
  t.Click_Button('Edit the selected row.  Keyboard Shortcut: enter')
  t.Add_RowToGrid(t.GridTypeEnum.CATEGORY, t.InputTypeEnum.DROPDOWNBOX, 1, 'Art')
  t.Add_RowToGrid(t.GridTypeEnum.CATEGORY, t.InputTypeEnum.TEXTBOX, 6, '2')
  t.Add_RowToGrid(t.GridTypeEnum.CATEGORY, t.InputTypeEnum.TEXTBOX, 10, 'test selenium')
  // t.Click_Button('Update Suppliers')
}
