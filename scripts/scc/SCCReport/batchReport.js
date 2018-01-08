
const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('REPORTS')
  t.Click_Button('Batch Report')
  t.Select_List('Bank Account:', 'Alliston', 'All')
  t.Select_List('Fiscal Year:', '2016/2017', '2017/2018')
  // t.Click_ToUncheck('Registration', 'Registered')
  // t.Click_ToCheck('School Type', 'Elementary')
  // t.Select_List('Select a School Year:', '2017/2018')
  // t.Select_List('Select a School:', 'Alliston')
  // t.Wait(5000)
  // t.Select_List('Homeroom:', 'Alliston', 'All')
  t.Enter_Date('Deposit Start Date:', 'Start', '9/1/2016')
  // t.Enter_Date('Registration Date:', 'End:', '8/31/2017')
}
