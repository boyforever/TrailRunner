
const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  // t.Enter_Text('$1', '5');
  t.Click_Button(["Detailed Receipt", "Insert new row"]);
  t.Add_RowToGrid(GridTypeEnum.CATEGORY, ColumnTypeEnum.DROPDOWNBOX, 1, 'Art');
  // t.Add_RowToGrid('category', 'dropdownbox', 1, 'Art');
  // t.Add_RowToGrid('category', 'textbox', 3, '2');
  // t.Add_RowToGrid('category', 'textbox', 4, 'test selenium');
  // t.Add_Category("Art", 1, "2", 3, "test selenium", 4);
  // t.Enter_Text("Checks", ['1', '15']);
  // t.Select_List("Art");
  // t.Click_Button();
  // t.Click_Button("Forms");
  // t.Click_Button("Add Form");
  // t.Wait();
  // t.Click_Button("Forms");
  // t.Click_Button("Delete Form");
  // t.Wait();
  // t.Click_Alert("OK");
  // t.Click_Button("List View");
  // t.Wait();
  // t.Click_Button("Quick Receipt");
  // t.Click_Button("Detailed Receipt");
  //
  // t.Click_Button('Deposits/Receipts');
  // t.Wait();
}
