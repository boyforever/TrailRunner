const t = require('../../../scripts/trailCrusher.js');

module.exports.Run = function(){
  // select Edit item first
  // then Click_Button('Attach');

t.Select_List('', 'Cookstown Central Public');
t.Wait();
t.Select_List('', '2016/2017');
t.Wait();

  t.Select_Option('Item Name', 'Option item');
  t.Wait();
  t.Click_Button('Attach Students');
  t.Wait();
  t.Click_Alert('OK');

  //t.Click_Button('Attach Students');
  //t.Wait();
  //t.Click_Alert('OK');


t.Select_Option('Attach Item As:', 'Optional');

t.Select_Option('Attach Item To', 'All Students');

t.Click_Button('View Selected Students');
t.Wait();
t.Click_CheckBox_AgGridHeader('All Students');
t.Click_CheckBox_AgGridRow('All Students', 'Ackerman, Ashley')
  t.Wait();

  //t.Close();






}
