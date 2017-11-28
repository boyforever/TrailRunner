var fs = require('fs');
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;
var Key = webdriver.Key;
var driver;
var logFileName = "log";

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
    1: {grid: "gridCategories"},
    2: {grid: "gridSuppliers"},
    3: {grid: "gridCategoryUmbrellas"},
    4: {grid: "gridGLDepartments"},
    5: {grid: "gridGLNames"},
    6: {grid: "tabGLNameUmbrella_Datagrid1"},
    7: {grid: "gridMemo"},
    8: {grid: "gridCashbox"},
    9: {grid: "gridLedger"},
    10: {grid: "tableItems"},
  }
};
const InputTypeEnum = {
  TEXTBOX: 1,
  DROPDOWNBOX: 2,
  CHECKBOX: 3,
  BUTTON: 4,
  LIST: 5,
  OPTION: 6,
};
module.exports = {
  GridTypeEnum,
  InputTypeEnum,
  ChangeBankAccount : function(bankAccountName){ this.Select_List('', bankAccountName);  driver.sleep(1000);},
  Click_Alert : function(value){ if(value.toLowerCase() == 'ok'){ driver.switchTo().alert().accept().then( Log("Alert...ok")).catch(error=>Log(error.message));} else {driver.switchTo().alert().dismiss().then(function(){Log("Alert...cancel")}).catch(error=>Log(error.message));}},
  Click_Button : function (title1, title2){ if(typeof title1 === 'string'){ Click(InputTypeEnum.BUTTON, title1, title2, 0); } else { for (var i = 0; i < title1.length; i++){ Click(InputTypeEnum.BUTTON, title1, "", 0); driver.sleep(1000); }}},
  Click_FileButton : function(value){ driver.findElement(By.xpath("//input[@type='file']")).sendKeys(value); Log("[" + value + "]...selected")},
  Click_ToUncheck : function(title, value){ Click(xpathsCheckBoxes(InputTypeEnum.CHECKBOX, title, value, false), 0);},
  // Click_ToUncheck : function(title){ Click(xpathsCheckBoxes(InputTypeEnum.CHECKBOX, title, "", false), 0);},
  Click_ToCheck : function(title, value){
    Click(xpathsCheckBoxes(InputTypeEnum.CHECKBOX, title, value, true), 0);
    // if(value){Click(xpathsCheckBoxes(InputTypeEnum.CHECKBOX, title, value, true), 0);}else{Click(xpathsCheckBoxes(InputTypeEnum.CHECKBOX, title, "", true), 0);}
   },
  // Click_ToCheck : function(title){ Click(xpathsCheckBoxes(InputTypeEnum.CHECKBOX, title, "", true), 0);},
  Click_CheckBox_AgGridHeader : Click_CheckBox_AgGridHeader,
  Click_CheckBox_AgGridRow : Click_CheckBox_AgGridRow,
  Close : function(){ driver.quit();},
  Goto_Page : function(pageUrl){ driver.get(pageUrl);},
  Log : Log,
  LogFileName : function(title){ logFileName = title;},
  Run : function(title, action){ require('./' + title + '.js').Run(action);},
  Select_ItemInRgTable : function(title, value){ driver.findElement(By.xpath("//table[@class='rgMasterTable']/tbody/tr/td[contains(text(), '"+ value + "')]")).then(function(elem){ driver.actions().click(elem).perform(); Log("[" + value + "]...selected");}, function(){ Log("[" + value + "]...not found");})},
  Select_List : function(title, value){ if(title){ Select_RdDropDown(title, 0, value); } else { driver.findElement(By.xpath("//select/option[contains(text(), '" + value + "')]")).then(function(elem){elem.click(); Log( "[" + value + "]...selected");}, function(){ Log("[" + value + "]...not found");})}},
  Select_Option : function(title, value){ Click(InputTypeEnum.OPTION, title, value, 0);},
  // Select_Item : function(title, value){ Click(InputTypeEnum.OPTION, title, value, 0);},
  SwitchTo_MainScreen : function(){ driver.switchTo().defaultContent();},
  SwitchTo_Popup : function(title){ driver.switchTo().frame(iframe(title));},
  TakeScreenshot : function(fn){ driver.takeScreenshot().then(function(image, err) { fs.writeFile('./screenshots/' + fn + '.png', image, 'base64', function(err) { }); });},
  Wait : function(interval){ if(!interval || interval <= 0) interval = 2000;  driver.sleep(interval);},
};
module.exports.Open = function(pageUrl, expectedTitle){
  driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  if(pageUrl){
    if(expectedTitle){
      driver.get(pageUrl).then(()=>{ driver.getTitle().then(
        function(title){
          if(title.toLowerCase() === expectedTitle.toLowerCase()){
            Log(pageUrl + "...loaded");
          }else{
            Log(pageUrl + "...failed: " + title);
          }})}).catch(console.log.bind(console));
      } else {
        driver.get(pageUrl);
      }
    }
  }
// module.exports.OpenIE = function(){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.ie()).build();  driver.ignoreZoomSetting = true;};
// module.exports.OpenEdge = function(){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();};
// module.exports.OpenEdge = function(pageUrl){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build(); driver.get(pageUrl);};
module.exports.Add_RowToGrid = function (gridType, columnType, columnIndex, value){
  var xpath = "";
  if(gridType === GridTypeEnum.PURCHASEORDER){
    xpath = "//table[@id='" + GridTypeEnum.properties[gridType].grid + "']/tbody/tr[last()]";
    driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click();});
    driver.sleep(1000);
    switch (columnIndex) {
      case 1:
        xpath = xpath + "/td[2]/select[1]/option[text()= \"" + value + "\"]";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click();});
        break;
      case 2:
        xpath = xpath + "/td[2]/select[2]/option[text()= \"" + value + "\"]";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click();});
        break;
      case 3:
        xpath = xpath + "/td[2]/select[3]/option[text()= \"" + value + "\"]";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click();});
        break;
      case 4:
        xpath = xpath + "/td[3]/input";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.clear(); elem.sendKeys(value); elem.sendKeys(Key.ENTER);});
        break;
      case 5:
        xpath = xpath + "/td[3]/select/option[text()= \"" + value + "\"]";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click();});
        break;
      case 6:
        xpath = xpath + "/td[4]/select[1]/option[text()= \"" + value + "\"]";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click();});
        break;
      case 7:
        xpath = xpath + "/td[4]/select[2]/option[text()= \"" + value + "\"]";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click();});
        break;
      case 8:
        xpath = xpath + "/td[5]/input";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.clear(); elem.sendKeys(value);});
        break;
      case 9:
        xpath = xpath + "/td[6]/input";
        driver.findElement(By.xpath(xpath)).then(function(elem){ elem.clear(); elem.sendKeys(value);});
        break;
      default:
    }
  } else {
    xpath = "//div[contains(@id, \"_" + GridTypeEnum.properties[gridType].grid + "_column" + (columnIndex - 1) + "_control\")]";
    if(columnType === InputTypeEnum.DROPDOWNBOX){
      xpath = xpath + "/select/option[text()= \"" + value + "\"]";
      driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click();});
    } else if(columnType === InputTypeEnum.TEXTBOX) {
      xpath = xpath + "/input[@type=\"text\"]";
      driver.findElement(By.xpath(xpath)).then(function(elem){ elem.clear(); elem.sendKeys(value);});
    }else if(columnType === InputTypeEnum.CHECKBOX) {
      xpath = xpath + "/input[@type=\"checkbox\"]";
      driver.findElement(By.xpath(xpath)).then(function(elem){ elem.click(); });
    }
  }
};
module.exports.Click_ButtonInRgTable = function(title, value){
  var grid = driver.findElement(By.xpath("//table[@class='rgMasterTable']"));
  switch (title) {
    case 'Item Attachments':
      grid.findElement(By.xpath("//tr[td[contains(text(), '" + value + "')]]/td[5]/a")).click();
      break;
    case 'Scheduled Payments':
      grid.findElement(By.xpath("//tr[td[contains(text(), '" + value + "')]]/td[6]/a")).click();
      break;
    default:
      grid.findElement(By.xpath("//tr[td[contains(text(), '" + value + "')]]/td[7]/a")).click();
  }
};
module.exports.Enter_Text = function (title1, value, title2){
  if(typeof value === 'string'){
    Input(title1, title2, 0, value);
  } else {
    var xpath = "(//table/thead[tr/td/p[contains(text(), '" + title1 + "')]]//td/input[@type='text'])[";
    for (var i = 1; i <= value.length; i++){
      driver.findElement(By.xpath(xpath + i + ']')).sendKeys(value[i-1]);
      driver.sleep(1000);
      Log("[" + title1 + "]=[" + value[i-1] + "]...done");
    }
    driver.findElement(By.xpath(xpath + value.length + ']')).sendKeys(Key.ENTER);
  }
};
module.exports.Move_Slider = function(title, minValue, maxValue){
  driver.findElement(By.id("RadSliderEndDrag_RdSliderMinMax")).then(function(elem){ driver.actions().dragAndDrop(elem,{x: (maxValue - 1) * 5, y: 0}).perform(); })
  driver.findElement(By.id("RadSliderDrag_RdSliderMinMax")).then(function(elem){ driver.actions().dragAndDrop(elem, {x: (minValue - 1) * 5, y: 0}).perform();  });
};
module.exports.JournalEntry_Debit = function (categroy, amount, memo, dept, code){
  JournalEntryForm (1, categroy, amount, memo, dept, code);
};
module.exports.JournalEntry_Credit = function (categroy, amount, memo, dept, code){
  JournalEntryForm (2, categroy, amount, memo, dept, code);
};
module.exports.CategoryTransfer_From = function (categroy, amount, memo, dept, code){
  CategoryTransfer(1, categroy, amount, memo, dept, code);
};
module.exports.CategoryTransfer_To = function (categroy, amount, memo, dept, code){
  CategoryTransfer(2, categroy, amount, memo, dept, code);
};


//========================================private functions==============================================//
function Log (msg){ fs.appendFileSync('./logs/' + logFileName + '.txt', '[' + new Date().toJSON() + '] ' + msg + '\r\n', 'utf8');};
function OneClick(xpath, title1, title2){
  driver.findElement(By.xpath(xpath)).then(
    function(elem){ elem.click().then( Log("[" + title1 + " | " + title2 + "]" + "...clicked")); },
    function(){ Log("[" + title1 + " | " + title2 + "]...not found"); });
}
function OneInput(xpath, title1, title2, value){
  driver.findElement(By.xpath(xpath)).then(function(elem){
    elem.sendKeys(Key.ENTER);
    elem.sendKeys(Key.chord(Key.CONTROL, "a"));
    elem.sendKeys(Key.DELETE);
    elem.sendKeys(value).then( function(){ Log("[" + title1 + " | " + title2 + "]=[" + value + "]...done"); },function(){ Log("[" + title1 + " | " + title2 + "]...failed.");})
  }, function(){ Log("[" + title1 + " | " + title2 + "]...not found.");});
}
function CategoryTransfer(index, category, amount, memo, dept, code){
  switch (index) {
    case 1:
      var xpath = "//div[@id='categoryTransferDiv']/table/tbody/tr[1]";
      var type = "Transfer From";
      if(category){
        OneClick(xpath + "/td[2]/select/option[contains(text(),'" + category + "')]", type, category);
      };
      if(memo){
        OneClick(xpath + "/td[4]/select/option[contains(text(),'" + memo + "')]", type, memo);
      };
      if(dept){
        OneClick(xpath + "/td[5]/select/option[contains(text(),'" + dept + "')]", type, dept);
      };
      if(code){
        OneClick(xpath + "/td[6]/select/option[contains(text(),'" + code + "')]", type, code);
      };
      OneInput(xpath + "/td[3]/input[@type='text']", type, "Amount", amount);
      break;
    case 2:
      var xpath = "//div[@id='categoryTransferDiv']/table/tbody/tr[4]";
      var type = "Transfer To";
      if(category){
        OneClick(xpath + "/td[1]/select/option[contains(text(),'" + category + "')]", type, category);
      };
      if(memo){
        OneClick(xpath + "/td[3]/select/option[contains(text(),'" + memo + "')]", type, memo);
      };
      if(dept){
        OneClick(xpath + "/td[4]/select/option[contains(text(),'" + dept + "')]", type, dept);
      };
      if(code){
        OneClick(xpath + "/td[5]/select/option[contains(text(),'" + code + "')]", type, code);
      };
      OneInput(xpath + "/td[2]/input[@type='text']", type, "Amount", amount);
  }
}
function Click (type, title1, title2, index){
  var xps = Xpaths(type, title1, title2);
  driver.findElement(By.xpath(xps[index])).then(
    function(elem){ driver.actions().click(elem).perform(); Log("[" + title1 + " | " + title2 + "]" + "...clicked"); },
    function(){ if(index + 1 >= xps.length){ Log("[" + title1 + " | " + title2 + "]...not found"); } else { Click(type, title1, title2, index + 1); } });
};
function Input (title1, title2, index, value){
  var xps = Xpaths(InputTypeEnum.TEXTBOX, title1, title2);
  driver.findElement(By.xpath(xps[index])).then(function(elem){ elem.clear(); elem.sendKeys(value); Log("[" + title1 + " | " + title2 + "]=[" + value + "]...done") },function(){ if(index + 1 == xps.length){Log("[" + title1 + " | " + title2 + "]...not found."); } else {  Input(title1, title2, index + 1, value);  }  });
};
function JournalEntryForm (index, category, amount, memo, dept, code){
  var xpath = "//table[@class='journal-table'][" + index + "]";
  var type = "Debit";
  if(index == 2) type = "Credit";

  if(category){
    OneClick(xpath + "/tbody//td[1]/select/option[contains(text(),'" + category + "')]", type, category);
  };
  if(memo){
    OneClick(xpath + "/tbody//td[4]/select/option[contains(text(),'" + memo + "')]", type, memo);
  };
  if(dept){
    OneClick(xpath + "/tbody//td[5]/select/option[contains(text(),'" + dept + "')]", type, dept);
  };
  if(code){
    OneClick(xpath + "/tbody//td[6]/select/option[contains(text(),'" + code + "')]", type, code);
  };
  OneInput(xpath + "/tbody//td[3]/input[@type='text']", type, "Amount", amount);
};
function Click_CheckBox_AgGridHeader (title){
  var grid = Attachment_Grid(title);
  driver.findElement(By.xpath("//div[@id='" + grid + "']//div[@class='ag-header']/div[@class='ag-pinned-left-header']//input[@type='checkbox']")).then(
    function(elem){
      elem.click().then( Log("[" + title + "]" + "...clicked")).catch( error=>Log("[" + title + "]..." + error.message));
       },
    function(){ Log("[" + title + "]...not found"); });
}
function Click_CheckBox_AgGridRow (title, value){
  var grid = Attachment_Grid(title);
  driver.findElement(By.xpath("//div[@id='" + grid + "']//div[@class='ag-body-container']//div[contains(@class, 'ag-row')][div[contains(@class, 'ag-cell') and contains(text(), '" + value + "')]]")).then(
    function(elem){
      elem.getAttribute('row').then(function(rowid){
        driver.findElement(By.xpath("//div[@id='" + grid + "']//div[@class='ag-pinned-left-cols-container']//div[contains(@class, 'ag-row') and @row='" + rowid + "']//input")).then(function(cb){ cb.click().then(Log("[" + title + " | " + value + "]...clicked"));}, function(){ Log("[" + title + " | " + value + " | " + rowid + "]...not found")});
      }, function(){ Log("[" + title + " | " + value + "]...getAttribue failed");});
    },
    function(){ Log("[" + title + " | " + value + "]...not found");});
}
function Attachment_Grid (title){
  switch (title.toLowerCase()) {
    case "all students": return 'selectedStudentsGrid';
    case "grade": return 'gradeGrid';
    case "course": return 'courseGrid';
    case "homeroom": return 'homeroomGrid';
    case "group": return 'groupGrid';
    case "individual": return 'individualGrid';
  }
}
function Select_RdDropDown (title, index, value){
  var xps = Xpaths(InputTypeEnum.LIST, title, "");
  driver.findElement(By.xpath(xps[index])).then(function(elem){
    driver.actions().click(elem).perform();
    Log("[" + title + "]...clicked");
    driver.sleep(1000);
    elem.getAttribute("id").then(function(eid){
      eid = eid.replace('_Input', '_DropDown');
      elem.findElement(By.xpath("//div[@id='" + eid + "']//li[contains(text(), '" + value + "')]")).then(function(elem){
        driver.actions().click(elem).perform();
        Log("[" + value + "]...selected");
      }, function(){Log("[" + value + "]...not found");})
    })
  },function(){
    if(index + 1 >= xps.length){ Log("[ " + title + " ]" + "...not found"); } else {
    Select_RdDropDown(title, index + 1, value);}}
  );
};
function iframe(title){
  switch (title) {
    case 'Add an Item Category': return 'RdWindowAddModifyCategory';
    case 'Add an Option': return 'RdWindowAddModifyOption';
    case 'Add an Option Choice': return 'RdWindowAddModifyOptionChoice';
    case 'Add a permission form': return 'RdWindowPermissionForm';
    case 'Add a Picture': return 'RdWindowPicture';
    case 'Delete Item': return 'RdWindowDeleteItem';
    case 'Expire Item': return 'RdWindowEditItem';
    case 'Modify an Option': return 'RdWindowAddModifyOption';
    case 'Public Confirmation': return 'RdWindowPublicConfirmation';
  }
};
function Xpaths(type, title1, title2){
  switch (type) {
    case InputTypeEnum.BUTTON:  return xpathsButtons(title1, title2);
    case InputTypeEnum.CHECKBOX:  return xpathsCheckBoxes(title1, title2, true);
    case InputTypeEnum.OPTION:  return xpathsOptions(title1, title2);
    case InputTypeEnum.TEXTBOX: return xpathsTextBoxes(title1, title2);
    case InputTypeEnum.LIST:  return xpathsLists(title1);
  }
}
//========================================xpath==============================================//
function xpathsButtons(title1, title2){
  if(title2){
    return [
      "//div[span[contains(text(), '" + title1 + "')]]//td[contains(text(), '" + title2 + "')]"
    ];
  } else {
    return [
      "//td[contains(@class, \"buttonMiddle\")][contains(text(), \"" + title1 + "\")]",
      "//input[@type=\"button\"][contains(@title, \"" + title1 + "\")]",
      "//input[contains(@class, \"button\") or @type=\"button\" or @buttontype=\"button\" or @type=\"submit\"][contains(@value, \"" + title1 + "\")]",
      "//a[text()[normalize-space(.) = \"" + title1 + "\"]]",
      "//img[contains(@title, \"" + title1 + "\") or contains(@alt, \"" + title1 + "\")]",
      "//input[@type=\"image\" and @alt = \"" + title1 + "\"]",
      "//input[@type=\"image\"][contains(@src, \"" + title1.toLowerCase() + "\")]",
      "//tr[td[contains(text(), \"" + title1 + "\")]]",
      "//img[contains(@src, '" + title1.toLowerCase() + "')]",
      "//button/span[contains(text(), '" + title1 + "')]",
      "//a/span/span[contains(text(), '" + title1 + "')]"
    ];
  }
};
function xpathsCheckBoxes(title, value, isToCheck){
  var cond = "input[@type='checkbox']";
  // var cond = "input[@type='checkbox' and @checked='checked']";
  // if(isToCheck){ cond = "input[@type='checkbox' and not (@checked)]"; }
  return [
    "//*[div[contains(text(), '" + title + "')]][//label[contains(text(),'" + value + "')]]//" + cond,
    "//div[div[contains(text(),'" + title + "')]]//div[contains(text(),'" + value + "')]//" + cond,
    "//p[label[contains(text(),'" + title + "')]]//"+ cond,
    "//div[contains(text(),'" + title + "')]/" + cond,
    "//td[label[contains(text(), '" + title + "')]]/" + cond,
    "//tr[td[contains(text(), '" + title + "')]]/td/" + cond,
    "//tr[td/p[contains(text(), '" + title + "')]]/td/" + cond
  ];
};

function xpathsOptions(title, value) {
  return [
    "//*[div[contains(text(),'" + title + "')]]//td[label[contains(text(),'" + value + "')]]/input",
    "//*[td[contains(text(), '" + title + "')]]//td[label[contains(text(), '" + value + "')]]/input",
    "//table[//a[contains(text(), '" + title + "')]]//td[contains(text(), '" + value + "')]",
    "//div[p[contains(text(), '" + title + "')]]//label[text()[normalize-space(.) = '" + value + "']]/input[@type='radio']",
    "//table/tbody[tr/td[contains(text(), '" + title + "')]]//tr/td//li[span[contains(text(), '" + value + "')]]"
  ];
}
function xpathsLists(title){
  return [
    "//td[contains(text(), '" + title + "')]/following-sibling::td[1]//input[@type='text']",
    "//div[contains(@style, 'block')]/div[contains(text(), '" + title + "')]/following-sibling::div[1]//input[@type='text']",
    "//div[contains(text(), '" + title + "')]/following-sibling::*[1]//input[@type='text']",
    "//div[span[contains(text(), '" + title + "')]]/following-sibling::*[1]//input[@type='text']",
    "//input[@type='text' and contains(@value, '" + title + "')]",
    "//li[span[contains(text(), '" + title + "')]]"
  ];
};
function xpathsTextBoxes(title1, title2){
  if(title2){
    return [
      "//table[thead//td/p[contains(text(), '" + title1 + "')]]/tbody//td[p[contains(text(), '" + title2 + "')]]/following-sibling::td[1]//input[@type='text']",
      "//div[div[contains(text(),'" + title1 + "')]][//div[contains(text(), '" + title2 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s|:/g, '') + "')]",
      "//div[div/span[contains(text(),'" + title1 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s|:/g, '') + "')]",
      "//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title1 + "')]][//div[contains(text(), '" + title2 + "')]]//td[@class='rcInputCell']//input[@type='text']"
    ];
  } else {
    return [
      "//input[@name='" + title1 + "']",
      "//div[div[contains(text(),'" + title1 + "')]]//input[@type='text']",
      "//div[div[contains(text(),'" + title1 + "')]]//textarea",
      "//td[contains(text(),'" + title1 + "')]/following-sibling::td[1]//input[@type='text']",
      "//td[p[contains(text(),'" + title1 + "')]]/following-sibling::td[1]//input[@type='text']",
      "//input[contains(@placeholder, '" + title1 + "')]",
      "//label[contains(text(), '" + title1 + "')]/following-sibling::input[1]",
      "//label[contains(text(), '" + title1 + "')]/input[@type='text']"
    ];
  }
};
