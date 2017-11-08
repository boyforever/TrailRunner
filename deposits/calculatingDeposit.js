
const t = require('../scripts/trailCrusher.js');

module.exports.Run = function(){
  // t.Enter_Text('$1', '5');
  t.Click_Button(["List View", "Quick Receipt", "Detailed Receipt", "Insert new row"]);
  t.Add_Category("Art", "2", "test selenium");
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
