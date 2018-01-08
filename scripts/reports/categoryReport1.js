const t = require('../../scripts/trailCrusher.js')

module.exports.Run = function() {
  t.Click_Button('Show All Reports')
  t.Click_Button('1. Detailed Category Summary')
  t.Click_Select('View Report In Accounting Style')
  t.Click_Select('Category Number')
  t.Click_Select('Include cashbox')
  // t.Click_Select('School Year:', '2016-2017')
  t.Click_Select('Select All Categories')
  t.Click_Select('Volleyball-Jr Girls')
  t.Click_Select('Volleyball-Sr Girls')
  t.Click_Button('Continue')
}
