const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  // select delete item first
  // then Click_Button('Delete')

t.Select_List('', 'Cookstown Central Public')
t.Wait()
t.Select_List('', '2016/2017')
t.Wait()

t.Select_Option('Item Name', 'Item-1-1-copy-1')
  t.Wait()
  t.Click_Button('Delete')
  t.SwitchTo_Popup('Delete Item')
  t.Wait(2000)
  t.Click_Button('Yes')
  t.Wait()
  t.Click_Button('OK')
  t.SwitchTo_MainScreen()
  t.Wait()

  //t.Close()






}
