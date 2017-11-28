const t = require('../../scripts/trailCrusher.js');

module.exports.Run = function(){
  t.Click_Button("Transfer Money Within One Bank Account To Different Categories");
  t.Wait();
  t.CategoryTransfer_From('BN Arts', 100);
  // t.Enter_Text("Transfer Date:", "10/20/2017");

}
