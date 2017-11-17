
const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button('Journal Entry for Revenue Transactions (Credit)');
  t.Wait();
  t.Enter_Text('Date:','10/11/2017');
  t.Click_Button('add');
  t.Click_Button('delete');
}
