const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  // t.Enter_Text("Requested By:", "test");
  t.Add_RowToGrid(t.GridTypeEnum.PURCHASEORDER, t.InputTypeEnum.DROPDOWNBOX, 1, "Badminton");
  t.Add_RowToGrid(t.GridTypeEnum.PURCHASEORDER, t.InputTypeEnum.DROPDOWNBOX, 3, "Permit #B001011");
  // t.Wait();
  t.Add_RowToGrid(t.GridTypeEnum.PURCHASEORDER, t.InputTypeEnum.TEXTBOX, 4, "Badminton");
  // t.Wait();
  t.Click_Alert("Cancel");
  t.Add_RowToGrid(t.GridTypeEnum.PURCHASEORDER, t.InputTypeEnum.TEXTBOX, 8, "5");
  // t.Wait();
  t.Add_RowToGrid(t.GridTypeEnum.PURCHASEORDER, t.InputTypeEnum.TEXTBOX, 9, "12");
  // t.Wait();
}
