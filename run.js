
//put on trail run shoes
const t = require('./scripts/trailCrusher.js');
t.LogFileName("run");

// t.Log("starting...");
//ready...set...
// t.Open('http://qascaweb01.schoolcash.net/_Simcoe');
t.Open('http://qascaweb01.schoolcash.net/_Simcoe', 'Login');
//run!
t.Run('login/login');
// t.Log('log', 'test');
// t.Log(logFileName, "loading... main page");
// t.Run('login/main', 'fdasfsaf');
// t.Run('login/main', 'Journal Entries');
// t.Wait();
// t.Close();
// t.Run('journalentry/journalEntryFormKO');
// t.Click_Button('Main Menu');
// t.Wait();
// t.Run('login/main', 'Ledger Inquire');
// t.Run('ledger/ledgerInquire');
// t.Run('login/main', 'Transfer Entries');
// t.Wait();
// t.Run('login/main', 'Purchase Orders');
// t.Run('purchaseorder/purchaseOrder');
// t.Run('transfer/categoryTransfer');
// t.Run('login/main', 'Reconciliation');
// t.Run('reconciliation/reconcileInformation');

t.Run('login/main', 'School Cash Register');
t.Run('scr/search')

// t.ChangeBankAccount('Barrie Learning Centre - SGF');
// t.Wait();
// t.Run('login/main', 'Issue Checks - Disbursements');
// t.Run('issuecheque/issueCheques');

// t.Run('issuecheque/supplier');
// t.Run('login/main', 'Deposits/Receipts');
// t.Run('deposits/selectCurrency');
// t.Run('deposits/calculatingDeposit');
// t.Run('login/main', 'School Cash Catalog');
// t.Wait();
//  t.Run('SCC/ManageItem/Attach');
// t.Run('SCC/ManageItem/Edit');
// t.Log(logFileName, "loading... SCC");
// t.Select_List('', 'Cookstown Central Public');
// t.Wait();
// t.Select_List('', '2016/2017');
// t.Wait();
//
// t.Select_Option('Item Name', 'Second item');
// t.Log(logFileName, "finished");
//
//
// t.Click_Button('Delete');
// t.SwitchTo_Popup('Delete Item');
// t.Click_Button('Yes');
// t.Wait();
// t.Click_Button('OK');
// t.Wait();
// t.SwitchTo_MainScreen();

// t.Wait();
// t.Click_Button('OK');
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
