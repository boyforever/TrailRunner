const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  // t.Click_Button('New Item')


//Create item with Option and choice

  t.Click_Button('CREATE A NEW ITEM')
  //t.Click_Button('New Item')
  t.Select_List('School:', 'Cookstown Central Public School')
  t.Click_Alert('OK')
  t.Wait()




	t.Select_List('School Year:', '2016/2017')

	t.Enter_Text('Name:', 'Option item')

	t.Enter_Text('Description:', 'test test ... ... ')

	t.Select_Option('Bank Account:', 'Cookstown PS - SGF - TD')

	t.Enter_Text('Effective From:', '10/16/2017', 'Start Date')
	t.Enter_Text('Effective From:', '10/10/2018', 'End Date')
	t.Wait()


     //t.Click_ToCheck('Limit Per Person:', 'Unlimited?')
	 //t.Enter_Text('Limit Per Person','2')



t.Click_ToCheck('Send Reminder Email:', '')
t.Enter_Date_Reminder('Send Reminder Email:', '11/20/2017', 'Send Date')
	 t.Wait()

t.Click_Button('Add Category')
t.SwitchTo_Popup('Add an Item Category')
t.Select_List('Category:', 'BN Hockey')
t.Wait()
t.Enter_Text('Amount', '2.00')
//works on category

t.Click_Button('Save Category')
t.SwitchTo_MainScreen()

//works on option
t.Click_Button('Add Option')
t.SwitchTo_Popup('Add an Option')
t.Enter_Text ('Option Name', 'Option 1')
t.Enter_Text('Description:', 'this is option1')
t.Select_List('Category:', 'BN Commencement')

//0 to 6
t.Move_Slider('Choose Between:', 1, 5)

//t.Wait(5000)

t.Click_Button('Save Option')
t.SwitchTo_MainScreen()
t.Wait()
//works on choice
t.Click_Button('Add Choice')
t.SwitchTo_Popup('Add an Option Choice')
t.Enter_Text('Choice Name', 'Choice 1')
t.Enter_Text('Amount', '1.00')
t.Click_Button('Save Choice')
t.SwitchTo_MainScreen()
t.Wait()
t.Click_Button('Save')
t.Wait(5000)

//t.Close()






}
