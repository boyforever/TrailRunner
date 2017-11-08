const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button('New Item');
  // t.Click_Button('CREATE A NEW ITEM');
  t.Select_List('School:', 'Huron Park');
  t.Click_Alert('OK');
  t.Wait();
  t.Select_List('School Year:', '2016/2017');
  t.Enter_Text('Name:', 'testing');
}
