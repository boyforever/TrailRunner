const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Wait()
  t.Click_ToCheck_InTable('Czachor, Isaac', 'Boy\'s Soccer Team fee', 1)
  // t.Wait()
  // t.Click_InTable('Czachor, Isaac', '', 4)
  // t.Wait()
  // t.Select_List_InTable('Czachor, Isaac', '', 4, 'Partial Payment')
  // t.Wait()
  // t.Enter_Text_InTable('Czachor, Isaac', '', 8, '5.00')
  // t.Wait()
  // t.Click_Button('Check')
  // t.Wait()
  // t.Click_Button('Cancel')
}
