
const t = require('../scripts/trailCrusher.js');

module.exports.Run = function(action){
  t.Click_Button(action);
  t.Wait();
}
