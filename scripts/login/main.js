
const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function(action, input) {
  switch (action) {
    case 'Select Language':
      t.Click_Button('Select Language')
      t.Wait()
      t.Click_Button(input)
      break
    case 'Select Bank Account':
      t.Select_List('', input)
      t.Wait()
      t.Click_Button('continue')
      t.Wait()
      break
    default:
      t.Click_Button(action)
  }
  t.Wait()
}
