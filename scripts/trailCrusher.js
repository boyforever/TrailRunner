const fs = require('fs')
const webdriver = require('selenium-webdriver')
// const until = webdriver.until
const By = webdriver.By
const Key = webdriver.Key
let driver
let logFileName = 'log'

const GridTypeEnum = {
  CATEGORY: 1,
  SUPPLIER: 2,
  CATEGORYUMBRELLA: 3,
  GLDEPARTMENT: 4,
  GLNAME: 5,
  GLNAMEUMBRELLA: 6,
  MEMO: 7,
  CASHBOX: 8,
  LEDGER: 9,
  PURCHASEORDER: 10,
  properties: {
    1: { grid: 'gridCategories' },
    2: { grid: 'gridSuppliers' },
    3: { grid: 'gridCategoryUmbrellas' },
    4: { grid: 'gridGLDepartments' },
    5: { grid: 'gridGLNames' },
    6: { grid: 'tabGLNameUmbrella_Datagrid1' },
    7: { grid: 'gridMemo' },
    8: { grid: 'gridCashbox' },
    9: { grid: 'gridLedger' },
    10: { grid: 'tableItems' }
  }
}
const InputTypeEnum = { TEXTBOX: 1, DROPDOWNBOX: 2, CHECKBOX: 3, BUTTON: 4, LIST: 5, OPTION: 6, RADIO: 7 }
module.exports = {
  GridTypeEnum,
  InputTypeEnum,
  CategoryTransfer_From: (categroy, amount, memo, dept, code) => { categoryTransfer(1, categroy, amount, memo, dept, code) },
  CategoryTransfer_To: (categroy, amount, memo, dept, code) => { categoryTransfer(2, categroy, amount, memo, dept, code) },
  ChangeBankAccount: (bankAccountName) => { this.Select_List('', bankAccountName); driver.sleep(1000) },
  Click_Alert: (value) => { if (value.toLowerCase() === 'ok') { driver.switchTo().alert().accept().then(Log('Alert...ok')) } else { driver.switchTo().alert().dismiss().then(Log('Alert...cancel')) } },
  Click_Button: (title1, title2) => { if (typeof title1 === 'string') { click(InputTypeEnum.BUTTON, title1, title2, 0) } else { for (let i = 0; i < title1.length; i++) { click(InputTypeEnum.BUTTON, title1, '', 0); driver.sleep(1000) } } },
  Click_ButtonInRgTable: (title, value) => {
    const grid = driver.findElement(By.xpath('//table[@class="rgMasterTable"]'))
    switch (title) {
      case 'Item Attachments': grid.findElement(By.xpath('//tr[td[contains(text(), ' + value + ')]]/td[5]/a')).click(); break
      case 'Scheduled Payments': grid.findElement(By.xpath('//tr[td[contains(text(), ' + value + ')]]/td[6]/a')).click(); break
      default: grid.findElement(By.xpath('//tr[td[contains(text(), ' + value + ')]]/td[7]/a')).click()
    }
  },
  Click_Button_InTable: (table, row, column, value) => { actionInTable(table, row, column, value, InputTypeEnum.BUTTON) },
  Click_FileButton: (value) => { driver.findElement(By.xpath('//input[@type="file"]')).sendKeys(value); Log('[' + value + ']...selected') },
  Click_InTable: (title, subtitle, column) => { driver.findElement(By.xpath('//div[*[contains(text(), "' + title + '")]]//table/tbody/tr[td/*[contains(text(),"' + subtitle + '")]]/td[' + column + ']')).then((elem) => { elem.click().then(Log('[' + title + ' (' + subtitle + ', ' + column + ')]...clicked')) }, () => { Log('[' + title + ' (' + subtitle + ', ' + column + ')]...not found') }) },
  Click_Select: (title, value) => { clickSelect(xpathsSelects(title, value), 0, title + ' | ' + value) },
  Click_ToUncheck: (title, value) => { click(InputTypeEnum.CHECKBOX, title, value, 0, false) },
  Click_ToCheck: (title, value) => { click(InputTypeEnum.CHECKBOX, title, value, 0, true) },
  Click_ToCheck_InTable: (table, row, column, value) => { actionInTable(table, row, column, value, InputTypeEnum.CHECKBOX) },
  clickCheckBoxAgGridHeader: clickCheckBoxAgGridHeader,
  clickCheckBoxAgGridRow: clickCheckBoxAgGridRow,
  Close: () => { driver.quit() },
  Enter_Text_InTable: (title, subtitle, column, value) => { driver.findElement(By.xpath('//div[*[contains(text(), "' + title + '")]]//table/tbody/tr[td/*[contains(text(),"' + subtitle + '")]]/td[' + column + ']/input[@type="text"]')).then((elem) => { elem.sendKeys(Key.ENTER + Key.chord(Key.CONTROL, 'a') + Key.DELETE + value + Key.ENTER).then(Log('[' + title + ' (' + subtitle + ', ' + column + ') | ' + value + ']...entered')) }, () => { Log('[' + title + ' (' + subtitle + ', ' + column + ') | ' + value + ']...not found') }) },
  Enter_Text: (title1, value, title2) => {
    if (typeof value === 'string') { input(title1, title2, 0, value) } else {
      const xpath = '(//table/thead[tr/td/p[contains(text(), ' + title1 + ')]]//td/input[@type=text])['
      for (let i = 1; i <= value.length; i++) { driver.findElement(By.xpath(xpath + i + ']')).sendKeys(value[i - 1]); driver.sleep(1000); Log('[' + title1 + ']=[' + value[i - 1] + ']...done') }
      driver.findElement(By.xpath(xpath + value.length + ']')).sendKeys(Key.ENTER)
    }
  },
  Goto_Page: (pageUrl) => { driver.get(pageUrl) },
  JournalEntry_Debit: (categroy, amount, memo, dept, code) => { journalEntryForm(1, categroy, amount, memo, dept, code) },
  JournalEntry_Credit: (categroy, amount, memo, dept, code) => { journalEntryForm(2, categroy, amount, memo, dept, code) },
  Log: Log,
  LogFileName: (title) => { logFileName = title },
  Move_Slider: (title, minValue, maxValue) => { driver.findElement(By.id('RadSliderEndDrag_RdSliderMinMax')).then((elem) => { driver.actions().dragAndDrop(elem, { x: (maxValue - 1) * 5, y: 0 }).perform() }); driver.findElement(By.id('RadSliderDrag_RdSliderMinMax')).then((elem) => { driver.actions().dragAndDrop(elem, { x: (minValue - 1) * 5, y: 0 }).perform() }) },
  Open: (pageUrl, expectedTitle) => { driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build(); if (pageUrl) { if (expectedTitle) { driver.get(pageUrl).then(driver.getTitle().then((title) => { if (title.toLowerCase() === expectedTitle.toLowerCase()) { Log(pageUrl + '...loaded') } else { Log(pageUrl + '...failed: ' + title) } })).catch(console.log.bind(console)) } else { driver.get(pageUrl) } } },
  Run: (title, action) => { require('./' + title + '.js').Run(action) },
  Select_ItemInRgTable: (title, value) => { driver.findElement(By.xpath('//table[@class=rgMasterTable]/tbody/tr/td[contains(text(), ' + value + ')]')).then((elem) => { driver.actions().click(elem).perform(); Log('[' + value + ']...selected') }, () => { Log('[' + value + ']...not found') }) },
  Select_List: (title, value) => { if (title) { selectRddropdown(title, 0, value) } else { driver.findElement(By.xpath('//select/option[contains(text(), "' + value + '")]')).then((elem) => { elem.click(); Log('[' + value + ']...selected') }, () => { Log('[' + value + ']...not found') }) } },
  Select_List_InTable: (title, subtitle, column, value) => { driver.findElement(By.xpath('//div[*[contains(text(), "' + title + '")]]//table/tbody/tr[td/*[contains(text(),"' + subtitle + '")]]/td[' + column + ']/select/option[contains(text(), "' + value + '")]')).then((elem) => { elem.click().then(Log('[' + title + ' (' + subtitle + ', ' + column + ') | ' + value + ']...selected')) }, () => { Log('[' + title + ' (' + subtitle + ', ' + column + ') | ' + value + ']...not found') }) },
  Select_Option: (title, value) => { click(InputTypeEnum.OPTION, title, value, 0) },
  SwitchTo_MainScreen: () => { driver.switchTo().defaultContent() },
  SwitchTo_Popup: (title) => { driver.switchTo().frame(iframe(title)) },
  TakeScreenshot: (fn) => { driver.takeScreenshot().then((image, err) => { fs.writeFile('./screenshots/' + fn + '.png', image, 'base64', (err) => { Log(err) }) }) },
  Wait: (interval) => { if (!interval || interval <= 0) { interval = 2000; driver.sleep(interval) } }
}
// module.exports.OpenIE = function(){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.ie()).build();  driver.ignoreZoomSetting = true;};
// module.exports.OpenEdge = function(){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();};
// module.exports.OpenEdge = function(pageUrl){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build(); driver.get(pageUrl);};
module.exports.Add_RowToGrid = (gridType, columnType, columnIndex, value) => {
  let xpath = ''
  if (gridType === GridTypeEnum.PURCHASEORDER) {
    xpath = '//table[@id=' + GridTypeEnum.properties[gridType].grid + ']/tbody/tr[last()]'
    driver.findElement(By.xpath(xpath)).then((elem) => { elem.click() })
    driver.sleep(1000)
    let action = 'click'
    switch (columnIndex) {
      case 1: xpath = xpath + '/td[2]/select[1]/option[text()= ' + value + ']'; break
      case 2: xpath = xpath + '/td[2]/select[2]/option[text()= ' + value + ']'; break
      case 3: xpath = xpath + '/td[2]/select[3]/option[text()= ' + value + ']'; break
      case 5: xpath = xpath + '/td[3]/select/option[text()= ' + value + ']'; break
      case 6: xpath = xpath + '/td[4]/select[1]/option[text()= ' + value + ']'; break
      case 7: xpath = xpath + '/td[4]/select[2]/option[text()= ' + value + ']'; break
      case 4:
        xpath = xpath + '/td[3]/input'
        action = 'oneinput'
        break
      case 8:
        xpath = xpath + '/td[5]/input'
        action = 'input'
        break
      case 9:
        xpath = xpath + '/td[6]/input'
        action = 'input'
    }
    switch (action) {
      case 'click': driver.findElement(By.xpath(xpath)).then((elem) => { elem.click() }); break
      case 'input': driver.findElement(By.xpath(xpath)).then((elem) => { elem.clear(); elem.sendKeys(value) }); break
      case 'oneinput': driver.findElement(By.xpath(xpath)).then((elem) => { elem.clear(); elem.sendKeys(value); elem.sendKeys(Key.ENTER) })
    }
  } else {
    xpath = '//div[contains(@id, _' + GridTypeEnum.properties[gridType].grid + '_column' + (columnIndex - 1) + '_control)]'
    if (columnType === InputTypeEnum.DROPDOWNBOX) {
      xpath = xpath + '/select/option[text()= ' + value + ']'
      driver.findElement(By.xpath(xpath)).then((elem) => { elem.click() })
    } else if (columnType === InputTypeEnum.TEXTBOX) {
      xpath = xpath + '/input[@type=text]'
      driver.findElement(By.xpath(xpath)).then((elem) => { elem.clear(); elem.sendKeys(value) })
    } else if (columnType === InputTypeEnum.CHECKBOX) {
      xpath = xpath + '/input[@type=checkbox]'
      driver.findElement(By.xpath(xpath)).then((elem) => { elem.click() })
    }
  }
}

// private functions
function Log(msg) { fs.appendFileSync('./logs/' + logFileName + '.txt', '[' + new Date().toJSON() + '] ' + msg + '\r\n', 'utf8') };
function oneClick(xpath, title1, title2) { driver.findElement(By.xpath(xpath)).then((elem) => { elem.click().then(Log('[' + title1 + ' | ' + title2 + ']' + '...clicked')) }, () => { Log('[' + title1 + ' | ' + title2 + ']...not found') }) };
function oneInput(xpath, title1, title2, value) { driver.findElement(By.xpath(xpath)).then((elem) => { elem.sendKeys(Key.ENTER + Key.chord(Key.CONTROL, 'a') + Key.DELETE + value).then(() => { Log('[' + title1 + ' | ' + title2 + ']=[' + value + ']...done') }, () => { Log('[' + title1 + ' | ' + title2 + ']...failed.') }) }, () => { Log('[' + title1 + ' | ' + title2 + ']...not found.') }) };
function categoryTransfer(index, category, amount, memo, dept, code) {
  switch (index) {
    case 1:
      let xpath = '//div[@id=categoryTransferDiv]/table/tbody/tr[1]'
      let type = 'Transfer From'
      if (category) { oneClick(xpath + '/td[2]/select/option[contains(text(),' + category + ')]', type, category) };
      if (memo) { oneClick(xpath + '/td[4]/select/option[contains(text(),' + memo + ')]', type, memo) };
      if (dept) { oneClick(xpath + '/td[5]/select/option[contains(text(),' + dept + ')]', type, dept) };
      if (code) { oneClick(xpath + '/td[6]/select/option[contains(text(),' + code + ')]', type, code) };
      oneInput(xpath + '/td[3]/input[@type=text]', type, 'Amount', amount)
      break
    case 2:
      xpath = '//div[@id=categoryTransferDiv]/table/tbody/tr[4]'
      type = 'Transfer To'
      if (category) { oneClick(xpath + '/td[1]/select/option[contains(text(),' + category + ')]', type, category) };
      if (memo) { oneClick(xpath + '/td[3]/select/option[contains(text(),' + memo + ')]', type, memo) };
      if (dept) { oneClick(xpath + '/td[4]/select/option[contains(text(),' + dept + ')]', type, dept) };
      if (code) { oneClick(xpath + '/td[5]/select/option[contains(text(),' + code + ')]', type, code) };
      oneInput(xpath + '/td[2]/input[@type=text]', type, 'Amount', amount)
  }
}
function click(type, title1, title2, index, isToCheck) {
  if (!isToCheck) isToCheck = false
  const xps = Xpaths(type, title1, title2, isToCheck)
  driver.findElement(By.xpath(xps[index])).then(
    (elem) => { driver.actions().click(elem).perform(); Log('[' + title1 + ' | ' + title2 + ']' + '...clicked') },
    () => { if (index + 1 >= xps.length) { Log('[' + title1 + ' | ' + title2 + ' | ' + isToCheck + ']...not found') } else { click(type, title1, title2, index + 1, isToCheck) } })
}
function clickSelect(xpaths, index, subject) {
  driver.findElement(By.xpath(xpaths[index])).then(
    (elem) => { elem.click().then(Log('[' + subject + ']' + '...clicked')) },
    () => { if (index + 1 >= xpaths.length) { Log('[' + subject + ']...not found') } else { clickSelect(xpaths, index + 1, subject) } })
}
function input(title1, title2, index, value) {
  const xps = Xpaths(InputTypeEnum.TEXTBOX, title1, title2)
  driver.findElement(By.xpath(xps[index])).then(
    (elem) => { elem.clear(); elem.sendKeys(value); Log('[' + title1 + ' | ' + title2 + ']=[' + value + ']...done') },
    () => { if (index + 1 === xps.length) { Log('[' + title1 + ' | ' + title2 + ']...not found.') } else { input(title1, title2, index + 1, value) } })
}
function journalEntryForm(index, category, amount, memo, dept, code) {
  const xpath = '//table[@class=journal-table][' + index + ']'
  let type = 'Debit'
  if (index === 2) type = 'Credit'
  if (category) { oneClick(xpath + '/tbody//td[1]/select/option[contains(text(),' + category + ')]', type, category) };
  if (memo) { oneClick(xpath + '/tbody//td[4]/select/option[contains(text(),' + memo + ')]', type, memo) };
  if (dept) { oneClick(xpath + '/tbody//td[5]/select/option[contains(text(),' + dept + ')]', type, dept) };
  if (code) { oneClick(xpath + '/tbody//td[6]/select/option[contains(text(),' + code + ')]', type, code) };
  oneInput(xpath + '/tbody//td[3]/input[@type=text]', type, 'Amount', amount)
}
function clickCheckBoxAgGridHeader(title) { const grid = attachmentGrid(title); driver.findElement(By.xpath('//div[@id="' + grid + '"]//div[@class=ag-header]/div[@class=ag-pinned-left-header]//input[@type=checkbox]')).then((elem) => { elem.click().then(Log('[' + title + ']...clicked')) }, () => { Log('[' + title + ']...not found') }) }
function clickCheckBoxAgGridRow(title, value) { const grid = attachmentGrid(title); driver.findElement(By.xpath('//div[@id=' + grid + ']//div[@class=ag-body-container]//div[contains(@class, ag-row)][div[contains(@class, ag-cell) and contains(text(), ' + value + ')]]')).then((elem) => { elem.getAttribute('row').then((rowid) => { driver.findElement(By.xpath('//div[@id=' + grid + ']//div[@class=ag-pinned-left-cols-container]//div[contains(@class, ag-row) and @row=' + rowid + ']//input')).then((cb) => { cb.click().then(Log('[' + title + ' | ' + value + ']...clicked')) }, () => { Log('[' + title + ' | ' + value + ' | ' + rowid + ']...not found') }) }, () => { Log('[' + title + ' | ' + value + ']...getAttribue failed') }) }, () => { Log('[' + title + ' | ' + value + ']...not found') }) }
function attachmentGrid(title) {
  switch (title.toLowerCase()) {
    case 'all students': return 'selectedStudentsGrid'
    case 'grade': return 'gradeGrid'
    case 'course': return 'courseGrid'
    case 'homeroom': return 'homeroomGrid'
    case 'group': return 'groupGrid'
    case 'individual': return 'individualGrid'
  }
}
function selectRddropdown(title, index, value) { const xps = Xpaths(InputTypeEnum.LIST, title, ''); driver.findElement(By.xpath(xps[index])).then((elem) => { driver.actions().click(elem).perform(); Log('[' + title + ']...clicked'); driver.sleep(1000); elem.getAttribute('id').then((eid) => { eid = eid.replace('_Input', '_DropDown'); elem.findElement(By.xpath('//div[@id=' + eid + ']//li[contains(text(), ' + value + ')]')).then((elem) => { driver.actions().click(elem).perform(); Log('[' + value + ']...selected') }, () => { Log('[' + value + ']...not found') }) }) }, () => { if (index + 1 >= xps.length) { Log('[' + title + ']...not found') } else { selectRddropdown(title, index + 1, value) } }) };
function iframe(title) {
  switch (title) {
    case 'Add an Item Category': return 'RdWindowAddModifyCategory'
    case 'Add an Option': return 'RdWindowAddModifyOption'
    case 'Add an Option Choice': return 'RdWindowAddModifyOptionChoice'
    case 'Add a permission form': return 'RdWindowPermissionForm'
    case 'Add a Picture': return 'RdWindowPicture'
    case 'Delete Item': return 'RdWindowDeleteItem'
    case 'Expire Item': return 'RdWindowEditItem'
    case 'Modify an Option': return 'RdWindowAddModifyOption'
    case 'Public Confirmation': return 'RdWindowPublicConfirmation'
  }
}
function Xpaths(type, title1, title2, isToCheck) {
  switch (type) {
    case InputTypeEnum.BUTTON: return xpathsButtons(title1, title2)
    case InputTypeEnum.CHECKBOX: return xpathsCheckBoxes(title1, title2, isToCheck)
    case InputTypeEnum.OPTION: return xpathsOptions(title1, title2)
    case InputTypeEnum.TEXTBOX: return xpathsTextBoxes(title1, title2)
    case InputTypeEnum.LIST: return xpathsLists(title1)
  }
}
function xpathsButtons(title1, title2) {
  if (title2) { return ['//div[span[contains(text(), "' + title1 + '")]]//td[contains(text(), "' + title2 + '")]'] } else {
    return [
      '//input[@type="button" and @id="' + title1 + '"]',
      '//td[contains(@class, "buttonMiddle")][contains(text(), "' + title1 + '")]',
      '//input[@type="button"][contains(@title, "' + title1 + '")]',
      '//input[contains(@class, "button") or @type="button" or @buttontype="button" or @type="submit"][contains(@value, "' + title1 + '")]',
      '//a[text()[normalize-space(.) = "' + title1 + '"]]',
      '//img[contains(@title, "' + title1 + '") or contains(@alt, "' + title1 + '")]',
      '//input[@type="image" and @alt = "' + title1 + '"]',
      '//input[@type="image"][contains(@src, "' + title1.toLowerCase() + '")]',
      '//tr[td[contains(text(), "' + title1 + '")]]',
      '//img[contains(@src, "' + title1.toLowerCase() + '")]',
      '//button/span[contains(text(), "' + title1 + '")]',
      '//a/span/span[contains(text(), "' + title1 + '")]'
    ]
  }
}
function xpathsCheckBoxes(title, value, isToCheck) {
  let cond = 'input[@type="checkbox" and @checked="checked"]'
  if (isToCheck) { cond = 'input[@type="checkbox" and not (@checked)]' }
  return [
    '//*[div[contains(text(), "' + title + '")]][//label[contains(text(), "' + value + '")]]//' + cond,
    '//div[div[contains(text(), "' + title + '")]]//div[contains(text(), "' + value + '")]//' + cond,
    // '//p[label[contains(text(), "' + title + '")]]//' + cond,
    '//div[contains(text(), "' + title + '")]/' + cond,
    // '//td[label[contains(text(), "' + title + '")]]/' + cond,
    '//tr[td[contains(text(), "' + title + '")]]/td/' + cond,
    '//tr[td/p[contains(text(), "' + title + '")]]/td/' + cond,
    '//tr[td/a[contains(text(), "' + title + '")]]/td/' + cond,
    '//*[label[contains(text(), "' + title + '")]]/' + cond
  ]
}
function xpathsOptions(title, value) {
  return [
    '//*[div[contains(text(), "' + title + '")]]//td[label[contains(text(), "' + value + '")]]/input',
    '//*[td[contains(text(), "' + title + '")]]//td[label[contains(text(), "' + value + '")]]/input',
    '//table[//a[contains(text(), "' + title + '")]]//td[contains(text(), "' + value + '")]',
    '//div[p[contains(text(), "' + title + '")]]//label[text()[normalize-space(.) = "' + value + '"]]/input[@type=radio]',
    '//table/tbody[tr/td[contains(text(), "' + title + '")]]//tr/td//li[span[contains(text(), "' + value + '")]]',
    '//*[label[contains(text(), "' + value + '")]]/input[@type="radio"]'
  ]
}

// combined checkbox, radio, dropdown
function xpathsSelects(title, value) {
  return [
    '//*[div[contains(text(), "' + title + '")]][//label[contains(text(), "' + value + '")]]//input[@type="checkbox" or @type="radio"]',
    '//div[div[contains(text(), "' + title + '")]]//div[contains(text(), "' + value + '")]//input[@type="checkbox"]',
    '//div[contains(text(), "' + title + '")]/input[@type="checkbox"]',
    '//tr[td[contains(text(), "' + title + '")]]/td/input[@type="checkbox"]',
    '//tr[td/*[contains(text(), "' + title + '")]]/td/input[@type="checkbox"]',
    // '//tr[td/a[contains(text(), "' + title + '")]]/td/input[@type="checkbox"]',
    '//*[label[text() = "' + title + '"]]/input[@type="checkbox" or @type="radio"]',
    '//*[label[contains(text(), "' + title + '")]]/input[@type="checkbox" or @type="radio"]',
    '//*[td[contains(text(), "' + title + '")]]//td[label[contains(text(), "' + value + '")]]/input',
    '//table[//a[contains(text(), "' + title + '")]]//td[contains(text(), "' + value + '")]',
    '//div[p[contains(text(), "' + title + '")]]//label[text()[normalize-space(.) = "' + value + '"]]/input[@type=radio]',
    '//table/tbody[tr/td[contains(text(), "' + title + '")]]//tr/td//li[span[contains(text(), "' + value + '")]]',
    '//*[text()[contains(normalize-space(.), "' + title + '")]]/select/option[contains(text(), "' + value + '")]',
    '//select/option[text() = "' + title + '"]',
    // rddropdown
    '//td[contains(text(), "' + title + '")]/following-sibling::td[1]//input[@type="text"]',
    '//div[contains(@style, "block")]/div[contains(text(), "' + title + '")]/following-sibling::div[1]//input[@type="text"]',
    '//div[contains(text(), "' + title + '")]/following-sibling::*[1]//input[@type="text"]',
    '//div[span[contains(text(), "' + title + '")]]/following-sibling::*[1]//input[@type="text"]',
    '//input[@type="text" and contains(@value, "' + title + '")]',
    '//li[span[contains(text(), "' + title + '")]]'
  ]
}

function xpathsLists(title) {
  return [
    '//td[contains(text(), "' + title + '")]/following-sibling::td[1]//input[@type="text"]',
    '//div[contains(@style, "block")]/div[contains(text(), "' + title + '")]/following-sibling::div[1]//input[@type="text"]',
    '//div[contains(text(), "' + title + '")]/following-sibling::*[1]//input[@type="text"]',
    '//div[span[contains(text(), "' + title + '")]]/following-sibling::*[1]//input[@type="text"]',
    '//input[@type="text" and contains(@value, "' + title + '")]',
    '//li[span[contains(text(), "' + title + '")]]'
  ]
}
function xpathsTextBoxes(title1, title2) {
  if (title2) {
    return [
      '//table[thead//td/p[contains(text(), "' + title1 + '")]]/tbody//td[p[contains(text(), "' + title2 + '")]]/following-sibling::td[1]//input[@type="text"]',
      '//div[div[contains(text(), "' + title1 + '")]][//div[contains(text(), "' + title2 + '")]]//td[@class="rcInputCell"]//input[@type="text" and contains(@id, "' + title2.replace(/\s|:/g, '') + '")]',
      '//div[div/span[contains(text(), "' + title1 + '")]]//td[@class="rcInputCell"]//input[@type="text" and contains(@id, "' + title2.replace(/\s|:/g, '') + '")]',
      '//div[@class="formRow"][div[@class="formItemLabel"][contains(text(), "' + title1 + '")]][//div[contains(text(), "' + title2 + '")]]//td[@class="rcInputCell"]//input[@type="text"]'
    ]
  } else {
    return [
      '//input[@name= "' + title1 + '"]',
      '//div[div[contains(text(),"' + title1 + '")]]//input[@type="text"]',
      '//div[div[contains(text(),"' + title1 + '")]]//textarea',
      '//td[contains(text(),"' + title1 + '")]/following-sibling::td[1]//input[@type="text"]',
      '//td[p[contains(text(),"' + title1 + '")]]/following-sibling::td[1]//input[@type="text"]',
      '//input[contains(@placeholder, "' + title1 + '")]',
      '//label[contains(text(), "' + title1 + '")]/following-sibling::input[1]',
      '//label[contains(text(), "' + title1 + '")]/input[@type="text"]',
      '//input[@type="text" and @id="' + title1 + '"]'
    ]
  }
}

// under construction
function actionInTable(table, rowLocator, columnIndex, value, type) {
  const subject = table + ' (' + rowLocator + ', ' + columnIndex + ') | ' + value
  const xpaths = getXpathInTable(table, rowLocator, columnIndex, type, value)
  switch (type) {
    case InputTypeEnum.TEXTBOX:
      textboxEnter(xpaths, 0, subject, value)
      break
    case InputTypeEnum.DROPDOWNBOX:
    case InputTypeEnum.CHECKBOX:
      elementClick(xpaths, 0, subject)
      break
    case InputTypeEnum.RADIO:
      elementClick(xpaths, 0, subject)
      break
    case InputTypeEnum.BUTTON:
      elementClick(xpaths, 0, subject)
      break
    case InputTypeEnum.LIST:
      break
    default:
  }
}
function elementClick(xpaths, index, subject) {
  driver.findElement(By.xpath(xpaths[index])).then((elem) => { elem.click().then(Log('[' + subject + ']...selected')) }, () => { if (index + 1 >= xpaths.length) { Log('[' + subject + ']...not found') } else { elementClick(xpaths, index + 1, subject) } })
}
function textboxEnter(xpaths, index, subject, value) {
  driver.findElement(By.xpath(xpaths[0])).then((elem) => { elem.sendKeys(Key.ENTER + Key.chord(Key.CONTROL, 'a') + Key.DELETE + value + Key.ENTER).then(Log('[' + subject + ']...entered')) }, () => { if (index + 1 >= xpaths.length) { Log('[' + subject + ']...not found') } else { elementClick(xpaths, index + 1, subject, value) } })
}
function getXpathInTable(table, rowLocator, columnIndex, type, value) {
  // for groupCollection
  const t = ((table) ? '//tbody[tr[td//*[text()[contains(normalize-space(.), "' + table + '")]]]]' : '') + ((rowLocator) ? '//tbody/tr[td[contains(text(), "' + rowLocator + '")]]' : '/tr[position()=last()]') + ((columnIndex) ? '/td[' + columnIndex + ']' : '/td[1]')
  switch (type) {
    case InputTypeEnum.BUTTON: return [t + '//img']
    case InputTypeEnum.CHECKBOX: return [t + '/input[@type="checkbox" and not (@checked)]']
    case InputTypeEnum.DROPDOWNBOX: return [t + '/select/option[contains(text(), "' + value + '")]']
    case InputTypeEnum.OPTION: break
    case InputTypeEnum.TEXTBOX: return [t + '/input[@type="text"]']
    case InputTypeEnum.LIST: break
    case InputTypeEnum.RADIO: return [t + '/input']
  }
}
