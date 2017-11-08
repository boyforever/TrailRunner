const t = require('./scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Enter_Text('Username', 'kevimplement');
  t.Enter_Text('Password', 'banking07');
  t.Click_Button('Sign In');
  t.Wait();
  t.Click_Button('continue');
  t.Wait();
}
