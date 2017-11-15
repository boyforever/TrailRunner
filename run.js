
//put on trail run shoes
const t = require('./scripts/trailCrusher.js');

//ready...set...
t.Open('http://qascaweb01.schoolcash.net/_Simcoe');
//run!
t.Run('login/login');
t.Run('login/main', 'Transfer Entries');
t.Run('transfer/categoryTransfer');
// t.Run('login/main', 'Reconciliation');
// t.Run('reconciliation/reconcileInformation');

// t.Run('login/main', 'School Cash Register');
// t.Run('scr/search')
// t.ChangeBankAccount('login/main', 'Barrie Learning Centre - SGF');
// t.Run('login/main', 'Issue Checks - Disbursements');
// t.Run('issuecheque/issueCheques');
// t.Run('issuecheque/supplier');
// t.Run('login/main', 'Deposits/Receipts');
// t.Run('deposits/selectCurrency');
// t.Run('deposits/calculatingDeposit');
// t.Run('login/main', 'School Cash Catalog');
// t.Run('viewItems');
// t.Run('scripts/main', 'Deposits/Receipts');

// t.Run('scc');
// t.Run('scc/createItem');
// t.Run('batchReport');
// t.Run('itemAttachmentReport');
// t.Run('itemOptionReport');
// t.Run('itemOrderReport');
// t.Run('adoptionReport');

//good job!
// t.Close();
