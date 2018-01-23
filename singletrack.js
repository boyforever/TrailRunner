
const t = require('./scripts/trailCrusher.js')
t.LogFileName('run')

t.Open('http://qascaweb01.schoolcash.net/QA_Yorkrdsb', 'Login')
t.Run('login/login')
t.Run('login/main', 'Select Language', 'en-CA')
t.Run('login/main', 'Select Bank Account', 'Bayview S.S. - School Generated Funds')

t.Run('login/main', 'Deposits/Receipts')
t.Run('deposits/selectCurrency')
t.Run('deposits/calculatingDeposit')
t.Click_Button('Main Menu')

t.Run('login/main', 'Cash/Cheques YTD Itemized')
t.Run('itemized/chequesYTDMenu')
t.Click_Button('Main Menu')

t.Run('login/main', 'Non Sufficient Funds')
t.Run('nsf/nsfMenu')
t.Click_Button('Main Menu')

t.Run('login/main', 'Issue Cheques - Disbursements')
t.Run('issuecheque/issueCheques')
t.Click_Button('Main Menu')

t.Run('login/main', 'Change Funds - Cashbox')
t.Run('cashbox/cashboxMenu')
t.Click_Button('Main Menu')

t.Run('login/main', 'Ledger Inquire')
t.Run('ledger/ledgerInquire')
t.Click_Button('Main Menu')

t.Run('login/main', 'Journal Entries')
t.Run('journalentry/journalEntryFormKO')
t.Click_Button('Main Menu')

t.Run('login/main', 'Reconciliation')
t.Run('reconciliation/reconcileInformation')

t.Run('login/main', 'Transfer Entries')
t.Run('transfer/categoryTransfer')
t.Click_Button('Main Menu')

t.Run('login/main', 'School Cash Catalog')
t.Run('scc/SCCReport/adoptionReport')
t.Click_Button('MAIN MENU')

t.Run('login/main', 'School Cash Register')
t.Run('scr/search')
// t.Run('scr/groupCollection')
// t.Run('scr/modification')
// t.Run('scr/printReceipts')
// t.Run('scr/itemHistory')
// t.Run('scr/checkOut')
t.Click_Button('Main Menu')

t.Run('reports/categoryReport1')
t.Click_Button('Main Menu')

t.Click_Button('Log Out')
