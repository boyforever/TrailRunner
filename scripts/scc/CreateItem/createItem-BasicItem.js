const t = require('../../../scripts/trailCrusher.js');

module.exports.Run = function(){
  // t.Click_Button('New Item');
  //create a basic item with Category and save
  //unlimited quantity and Unlimited per person

  t.Click_Button('CREATE A NEW ITEM');
  //t.Click_Button('New Item');
  t.Select_List('School:', 'Cookstown Central Public School');
  t.Click_Alert('OK');
  t.Wait();




	t.Select_List('School Year:', '2016/2017');

	t.Enter_Text('Name:', 'basic item');

	t.Enter_Text('Description:','test test ... ... ');

	t.Select_Option('Bank Account:','Cookstown PS - SGF - TD');

	t.Enter_Text('Effective From:', '10/16/2017','Start Date');
	t.Enter_Text('Effective From:', '10/10/2018','End Date');
	t.Wait();


     t.Click_ToCheck('Limit Per Person:', 'Unlimited?');


t.Click_Button('Add Category');
t.SwitchTo_Popup('Add an Item Category');
t.Select_List('Category:','BN Hockey');
t.Wait();
//works on category

t.Click_Button('Save Category');
t.SwitchTo_MainScreen();

t.Wait();
t.Click_Button('Save');
t.Wait(5000);

//t.Close();






}
