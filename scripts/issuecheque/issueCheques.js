const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  // t.Enter_Text('Pay To The Order Of:', 'frankwang testing');
  // t.Enter_Text('Address:', '');
  // t.Wait(5000);
  // t.Click_Button('frankwang testing');
  // t.Wait();
  // t.Click_Button('You are attempting to create a new supplier.', 'Continue');
  // t.Wait();
  // t.Click_Alert('OK');
  t.Click_Button('Edit the selected row.  Keyboard Shortcut: enter');
  t.Add_RowToGrid('category', 'dropdownbox', 1, 'Art');
  t.Add_RowToGrid('category', 'textbox', 6, '2');
  t.Add_RowToGrid('category', 'textbox', 10, 'test selenium');
  t.Click_Button('Update Suppliers');
}
