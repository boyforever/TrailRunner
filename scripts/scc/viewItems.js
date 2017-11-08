const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button('VIEW ITEMS');
  t.Wait();
  t.Select_List('', 'Expired');
  t.Select_List('', '2016/2017');
}
