
//put on trail run shoes
const t = require('./scripts/toughMudder.js');
var fs = require('fs');
var webdriver = require('selenium-webdriver');

function Start(){
//ready
t.Open(new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build());
//set
t.Goto_Page('http://qascaweb01.schoolcash.net/_Simcoe');
//run!
t.Enter_Text('Username', 'kevimplement');
t.Enter_Text('Password', 'banking07');
t.Click_Button('Sign In');
t.Click_Button('continue');
t.Click_Button('School Cash Catalog');
t.TakeScreenshot('viewitem');
t.Click_Button('New Item');
t.Select_List('School:', 'Cookstown Central Public School');
t.Click_Alert('OK');
t.Wait();
t.Select_List('School Year:', '2015/2016');
t.Enter_Text('Name:', 'test');
t.Enter_Text('Description:','test test ... ... ');
t.Select_Option('Bank Account:','Cookstown PS - SGF - TD');
t.Click_ToCheck('Send Reminder Email:', '');
t.Click_ToUncheck('Quantity Available:','Unlimited?');
// t.Click_ToCheck('Limit Per Person:', 'Unlimited?');
t.Click_ToCheck('Available to Public?', '');
t.SwitchTo_Popup('Public Confirmation');
t.Click_Button('Yes');
t.SwitchTo_MainScreen();
t.Click_ToCheck('Available to Public?', 'Unlisted Fee?');
t.Wait();
t.Enter_Date('Effective From:','Start Date', '10/10/2017');
t.Enter_Date('Effective From:','End Date', '10/10/2018');
t.Wait();
t.Click_Button('Add Category');
t.SwitchTo_Popup('Add an Item Category');
t.Select_List('Category:','BN Hockey');
t.Wait();
//works on category
t.Click_Button('Cancel');
t.SwitchTo_MainScreen();
t.Click_Button('Add Option');
t.SwitchTo_Popup('Add an Option');
t.Click_Toincrease('Choose Between:', 5);
t.Wait(5000);
//works on option

t.Click_Button('Cancel');
t.SwitchTo_MainScreen();
t.Click_Button('Add Picture');
t.SwitchTo_Popup('Add a Picture');
t.Wait();
//works on picture
t.Click_Button('Cancel');
t.SwitchTo_MainScreen();
// t.Click_ToUncheck('Limit Per Person:', 'Unlimited?');
t.Enter_Text('Limit Per Person:','99')

t.Wait(5000);
t.Click_Button('Cancel');
t.Click_Alert('OK');
t.Close();
}

for(var i = 0; i < 20; i ++){
  Start();
}
