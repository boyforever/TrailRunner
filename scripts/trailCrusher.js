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
};
module.exports = {
  GridTypeEnum,
  InputTypeEnum,
  Close : function(){ driver.quit();},
  Goto_Page : function(pageUrl){ driver.get(pageUrl);},
  Run : function(title, action){ require('./' + title + '.js').Run(action);},
  TakeScreenshot : function(fn){ driver.takeScreenshot().then(function(image, err) { fs.writeFile('./screenshots/' + fn + '.png', image, 'base64', function(err) { }); } );},
  Wait : function(interval){ if(!interval || interval <= 0) interval = 2000;  driver.sleep(interval);},
};
module.exports.Open = function(pageUrl, expectedTitle){
  driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  if(pageUrl){
    if(expectedTitle){
      driver.get(pageUrl).then(()=>{ driver.getTitle().then(
        function(title){
          if(title.toLowerCase() === expectedTitle.toLowerCase()){
            Log(logFileName, pageUrl + "...loaded");
          }else{
            Log(logFileName, pageUrl + "...failed: " + title);
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
module.exports.ChangeBankAccount = function(bankAccountName){
  this.Select_List('', bankAccountName);
  driver.sleep(1000);
};
module.exports.Click_Alert = function(value){
  switch (value) {
    case 'OK': driver.switchTo().alert().accept().then(function(){Log(logFileName, "Alert...ok")}).catch(error=>Log(logFileName, error.message)); break;
    default: driver.switchTo().alert().dismiss().then(function(){Log(logFileName, "Alert...cancel")}).catch(error=>Log(logFileName, error.message));
  }
};
module.exports.Click_Button = function (title1, title2){
    if(typeof title1 === 'string'){ Click("button", title1, title2, 0); } else { for (var i = 0; i < title1.length; i++){ Click("button", title1, "", 0); driver.sleep(1000); } }
};
module.exports.Click_FileButton = function(value){ driver.findElement(By.xpath("//input[@type='file']")).sendKeys(value);};
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
module.exports.Click_ToUncheck = function(title, value){
  Click(xpathsCheckBoxes("checkbox", title, value, false), 0);
};
module.exports.Click_ToUncheck = function(title){
  Click(xpathsCheckBoxes("checkbox", title, "", false), 0);
};
module.exports.Click_ToCheck = function(title, value){
  Click(xpathsCheckBoxes("checkbox", title, value, true), 0);
};
module.exports.Click_ToCheck = function(title){
  Click(xpathsCheckBoxes("checkbox", title, "", true), 0);
};
module.exports.Enter_Date = function(title1, title2, value ){
  // var xpaths = [
  //   "//div[div[contains(text(),'" + title1 + "')]][//div[contains(text(), '" + title2 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s|:/g, '') + "')]",
  //   "//div[div/span[contains(text(),'" + title1 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s|:/g, '') + "')]",
  // ];
  Input(title1, title2, 0, value);
};
module.exports.Enter_Date_Reminder = function(title1, title2, value ){
  driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title1 + "')]][//div[contains(text(), '" + title2 + "')]]//td[@class='rcInputCell']//input[@type='text']")).then(function(elem){ elem.clear(); elem.sendKeys(value);});
};
module.exports.Enter_Text = function (title1, title2, value){
  Input(title1, title2, 0, value);
};
module.exports.Enter_Text = function (title, value){
  if(typeof value === 'string'){
    Input(title, '', 0, value);
  } else {
    var xpath = "(//table/thead[tr/td/p[contains(text(), '" + title + "')]]//td/input[@type='text'])[";
    for (var i = 1; i <= value.length; i++){
      driver.findElement(By.xpath(xpath + i + ']')).sendKeys(value[i-1]);
      driver.sleep(1000);
    }
    driver.findElement(By.xpath(xpath + value.length + ']')).sendKeys(Key.ENTER);
  }
};
function Log(fn, msg){ fs.appendFileSync('./logs/' + fn + '.txt', '[' + new Date().toJSON() + '] ' + msg + '\r\n', 'utf8');};
module.exports.Move_Slider = function(title, minValue, maxValue){
  driver.findElement(By.id("RadSliderEndDrag_RdSliderMinMax")).then(function(elem){ driver.actions().dragAndDrop(elem,{x: (maxValue - 1) * 5, y: 0}).perform(); })
  driver.findElement(By.id("RadSliderDrag_RdSliderMinMax")).then(function(elem){ driver.actions().dragAndDrop(elem, {x: (minValue - 1) * 5, y: 0}).perform();  });
};
module.exports.Select_ItemInRgTable = function(title, value){
  driver.findElement(By.xpath("//table[@class='rgMasterTable']/tbody/tr/td[contains(text(), '"+ value + "')]")).then(function(elem){ driver.actions().click(elem).perform(); });
};
module.exports.Select_List = function(title, value){
  if(title){ Select_RdDropDown(title, 0, value); } else { driver.findElement(By.xpath("//select/option[contains(text(), '" + value + "')]")).then(function(elem){elem.click();})}
};
module.exports.Select_Option = function(title, value){
  Click("option", title, value, 0);
};
module.exports.SwitchTo_MainScreen = function(){ driver.switchTo().defaultContent();};
module.exports.SwitchTo_Popup = function(title){
  switch (title) {
    case 'Add an Item Category':
      driver.switchTo().frame('RdWindowAddModifyCategory');
      break;
    case 'Add an Option':
      driver.switchTo().frame('RdWindowAddModifyOption');
      break;
    case 'Add an Option Choice':
      driver.switchTo().frame('RdWindowAddModifyOptionChoice');
      break;
    case 'Add a permission form':
      driver.switchTo().frame('RdWindowPermissionForm');
      break;
    case 'Add a Picture':
      driver.switchTo().frame('RdWindowPicture');
      break;
    case 'Delete Item':
      driver.switchTo().frame('RdWindowDeleteItem');
      break;
    case 'Expire Item':
      driver.switchTo().frame('RdWindowEditItem');
      break;
    case 'Modify an Option':
      driver.switchTo().frame('RdWindowAddModifyOption');
      break;
    case 'Public Confirmation':
      driver.switchTo().frame('RdWindowPublicConfirmation');
      break;
    default:
  }
};
//private functions


// function perform(xpath, value){
//   var xpaths = [];
//   xpaths.push(xpath);
//   if(value){
//     //Input
//     Input (xpaths, 0, value);
//   } else {
//     //click
//     Click(xpaths, 0);
//   }
// };

function Click (type, title1, title2, index){
  var xps = Xpaths(type, title1, title2);
  driver.findElement(By.xpath(xps[index])).then(
    function(elem){ driver.actions().click(elem).perform(); Log(logFileName, "[ " + title1 + " | " + title2 + " ]" + "...clicked"); },
    function(){ if(index + 1 >= xps.length){ Log(logFileName, "[ " + title1 + " | " + title2 + " ]...not found"); } else { Click(type, title1, title2, index + 1); } });
};
function Input (title1, title2, index, value){
  var xps = Xpaths("textbox", title1, title2);
  driver.findElement(By.xpath(xps[index])).then(function(elem){ elem.clear(); elem.sendKeys(value); Log(logFileName, "[" + title + "][" + value + "]...done") },function(){ if(index + 1 == xps.length){Log(logFileName, "[" + title1 + " | " + title2 + "]...not found."); } else {  Input(title1, title2, index + 1, value);  }  });
};
function Select_RdDropDown (title, index, value){
  var xps = Xpaths("list", title, "");
  driver.findElement(By.xpath(xps[index])).then(function(elem){
    driver.actions().click(elem).perform();
    Log(logFileName, "[" + title + "]...clicked");
    driver.sleep(1000);
    elem.getAttribute("id").then(function(eid){
      eid = eid.replace('_Input', '_DropDown');
      elem.findElement(By.xpath("//div[@id='" + eid + "']//li[contains(text(), '" + value + "')]")).then(function(elem){
        driver.actions().click(elem).perform();
        Log(logFileName, "[" + value + "]...selected");
      }, function(){Log(logFileName, "[" + value + "]...not found");})
    })
  },function(){
    if(index + 1 >= xps.length){ Log(logFileName, "[ " + title + " ]" + "...not found"); } else {
    Select_RdDropDown(title, index + 1, value);}}
  );
};

function Xpaths(type, title1, title2){
  switch (type.toLowerCase()) {
    case "button":  return xpathsButtons(title1, title2);
    case "checkbox":  return xpathsCheckBoxes(title1, title2);
    case "option":  return xpathsOptions(title1, title2);
    case "textbox": return xpathsTextBoxes(title1, title2);
    case "list":  return xpathsLists(title1);
  }
}
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
      "//input[@type=\"image\"][contains(@alt, \"" + title1 + "\")]",
      "//input[@type=\"image\"][contains(@src, \"" + title1.toLowerCase() + "\")]",
      "//tr[td[contains(text(), \"" + title1 + "\")]]",
      "//img[contains(@src, '" + title1.toLowerCase() + "')]",
      "//button/span[contains(text(), '" + title1 + "')]",
      "//a/span/span[contains(text(), '" + title1 + "')]"
    ];
  }
};
function xpathsCheckBoxes(title, value, isToCheck){
  var cond = "input[@type='checkbox' and @checked='checked']";
  if(isToCheck){ cond = "input[@type='checkbox' and not (@checked)]"; }
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
    "//table[//a[contains(text(), '" + title + "')]]//td[contains(text(), '" + value + "')]"
  ];
}
function xpathsLists(title){
  return [
    "//td[contains(text(), '" + title + "')]/following-sibling::td[1]//input[@type='text']",
    "//div[contains(@style, 'block')]/div[contains(text(), '" + title + "')]/following-sibling::div[1]//input[@type='text']",
    "//div[contains(text(), '" + title + "')]/following-sibling::*[1]//input[@type='text']",
    "//div[span[contains(text(), '" + title + "')]]/following-sibling::*[1]//input[@type='text']",
    "//input[@type='text' and contains(@value, '" + title + "')]"
  ];
};
function xpathsTextBoxes(title1, title2){
  if(title2){
    return [
      "//table[thead//td/p[contains(text(), '" + title1 + "')]]/tbody//td[p[contains(text(), '" + title2 + "')]]/following-sibling::td[1]//input[@type='text']",
      "//div[div[contains(text(),'" + title1 + "')]][//div[contains(text(), '" + title2 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s|:/g, '') + "')]",
      "//div[div/span[contains(text(),'" + title1 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s|:/g, '') + "')]"
    ];
  } else {
    return [
      "//input[@name='" + title1 + "']",
      "//div[div[contains(text(),'" + title1 + "')]]//input[@type='text']",
      "//div[div[contains(text(),'" + title1 + "')]]//textarea",
      "//td[contains(text(),'" + title1 + "')]/following-sibling::td[1]//input[@type='text']",
      "//td[p[contains(text(),'" + title1 + "')]]/following-sibling::td[1]//input[@type='text']",
      "//input[contains(@placeholder, '" + title1 + "')]",
      "//label[contains(text(), '" + title1 + "')]/following-sibling::input[1]"
    ];
  }
};
