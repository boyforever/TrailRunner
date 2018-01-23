const t = require('../../../scripts/trailCrusher.js')

module.exports.Run = function() {
  // t.Click_Button('New Item')
  // create a basic item with Category and save
  // unlimited quantity and Unlimited per person

  t.Click_Button('CREATE A NEW ITEM')
  t.Wait()
  t.Wait()
  t.Wait()
  // t.Click_Button('New Item')
  t.Enter_Text('txt-basics-name', 'testing 1')
  t.Wait()
  // t.Enter_Text('txt-basics-description', 'testing 1 description')
  // t.Select_Item('slct-financials-school', 'Blue Willow P.S.')
  // t.Wait()
  // t.Wait()
  // t.Click_ToUpload('img-basics-image', 'test') // can't pick a file
  // t.Select_Item('slct-financials-school-year', '2017/2018') need id in md-option of schoolyear
  // t.Click_Button('tgl-financials-cost-recovery')
  // t.Click_Button('tgl-financials-multi-school')
  // t.Wait()
  // t.Check_Item('cbx-financials-school-type', 'Elementary')
  // t.Check_Item('cbx-financials-school', 'Adrienne Clarkson P.S.')
  // t.Click_Button('Done') // need id on "done" button
  // t.Wait()
  // need id on button "edit" for multi school
  t.Click_Button('btn-financials-add-category')
  // need id of category list
  // can't handle this: id="slct-financials-category-name_{{$index}}"
  // need id for start Date
  // need id for end Date
  // need id for reminder email
  t.Click_Button('tgl-availability-limit-per-student')
  t.Enter_Text('txt-availability-limit-per-person', '2')
  t.Click_Button('tgl-availability-limit-quantity')
  t.Click_Button('tgl-availability-scheduled-payments')
  t.Click_Button('tgl-availability-public')
  t.Click_Button('tgl-availability-unlisted')
  t.Click_Button('lbl-extras-options')
  t.Click_Button('lbl-extras-permission-form')
  t.Click_Button('lbl-extras-custom-form')
  t.Click_Button('btn-preview-on-sco')
  t.Click_Button('btn-cancel')
  t.Click_Button('btn-save-and-create-new')
  t.Click_Button('btn-save-and-copy')
  t.Click_Button('btn-save')
  // need id for refund policy
  // need id for scroll to top
}
