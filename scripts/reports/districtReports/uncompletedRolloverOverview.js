const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('*District Level Reports')
  t.Click_Button('Uncompleted Rollover Overview')
  t.Wait()
  t.Click_Select('2015-2016')
  t.Click_Button('Continue')
}
