
//put on trail run shoes
const t = require('./scripts/trailCrusher.js');

//ready...set...
t.Open('http://qascaweb01.schoolcash.net/_Simcoe');
//run!
t.Run('login');
t.Run('main', 'Deposits/Receipts');
t.Run('deposits/selectCurrency');
t.Run('deposits/calculatingDeposit');
// t.Run('main', 'School Cash Catalog');
// t.Run('viewItems');
// t.Run('main', 'Deposits/Receipts');

// t.Run('scc');
// t.Run('scc/createItem');
// t.Run('batchReport');
// t.Run('itemAttachmentReport');
// t.Run('itemOptionReport');
// t.Run('itemOrderReport');
// t.Run('adoptionReport');

//good job!
// t.Close();
