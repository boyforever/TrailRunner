const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  // select Edit item first
  // then Click_Button('Edit')

t.Select_List('', 'Cookstown Central Public')
t.Wait()
t.Select_List('', '2016/2017')
t.Wait()

  t.Select_Option('Item Name', 'Item-1-1-copy-1')
  t.Wait()
  t.Click_Button('Edit')
  t.Wait()

  t.Enter_Text('Effective From:', '11/20/2018', 'End Date')
  t.Wait()
  t.Click_Button('Save')

  t.Wait()

  //t.Close()






}
