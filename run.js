
//put on trail run shoes
const t = require('./scripts/trailCrusher.js');

//ready...set...
t.Open('http://qascaweb01.schoolcash.net/_Simcoe');
//run!
t.Run('scripts/login');
// t.Run('scripts/main', 'Deposits/Receipts');
// t.Run('scripts/deposits/selectCurrency');
// t.Run('scripts/deposits/calculatingDeposit');
t.Run('scripts/main', 'School Cash Catalog');
// t.Run('viewItems');
// t.Run('scripts/main', 'Deposits/Receipts');

// t.Run('scc');
t.Run('scripts/scc/createItem');
// t.Run('batchReport');
// t.Run('itemAttachmentReport');
// t.Run('itemOptionReport');
// t.Run('itemOrderReport');
// t.Run('adoptionReport');

//good job!
// t.Close();
