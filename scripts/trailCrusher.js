var fs = require('fs');
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;
var driver;

module.exports.Run = function(title){ require('../' + title + '.js').Run();};
module.exports.Run = function(title, action){ require('../' + title + '.js').Run(action);};
module.exports.Open = function(){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();};
module.exports.Open = function(pageUrl){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build(); driver.get(pageUrl);};
module.exports.OpenIE = function(){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.ie()).build();  driver.ignoreZoomSetting = true;};
module.exports.OpenEdge = function(){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();};
module.exports.OpenEdge = function(pageUrl){ driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build(); driver.get(pageUrl);};
module.exports.Goto_Page = function(pageUrl){ driver.get(pageUrl);};
module.exports.Close = function(){ driver.quit();};
module.exports.Log = function(fn, msg){ fs.appendFile('./logs/' + fn, msg, 'utf8');};
module.exports.TakeScreenshot = function(fn){ driver.takeScreenshot().then(function(image, err) { fs.writeFile('./screenshots/' + fn + '.png', image, 'base64', function(err) { }); } );};
module.exports.Wait = function(interval){ if(!interval || interval <= 0) interval = 2000;  driver.sleep(interval);};


//for deposits->calculatingdeposit
module.exports.Add_Category = function (name, amount, reason, dept, object, memo){
  ////div[@class="divDataGrid"]//table/tbody/tr/td/div[@id="tabDepositPage_tabDeposit_gridCategories_column0_control"]/select/option[contains(text(), 'Art')]
  var xpaths = [
    "//div[@class=\"divDataGrid\"]//table/tbody/tr/td/div[@id=\"tabDepositPage_tabDeposit_gridCategories_column0_control\"]/select/option[text()= \"Art\"]",
    // "//div[@class=\"divDataGrid\"]//table/tbody/tr/td/div[@id=\"tabDepositPage_tabDeposit_gridCategories_column1_control\"]/input[@type=\"text\"]",
    "//div[@class=\"divDataGrid\"]//table/tbody/tr/td/div[@id=\"tabDepositPage_tabDeposit_gridCategories_column2_control\"]/input[@type=\"text\"]",
    "//div[@class=\"divDataGrid\"]//table/tbody/tr/td/div[@id=\"tabDepositPage_tabDeposit_gridCategories_column3_control\"]/input[@type=\"text\"]"
    // "//div[@class=\"divDataGrid\"]//table/tbody/tr/td/div[@id=\"tabDepositPage_tabDeposit_gridCategories_column4_control\"]/select/option[contains(text(), \"" + dept + "\")]",
    // "//div[@class=\"divDataGrid\"]//table/tbody/tr/td/div[@id=\"tabDepositPage_tabDeposit_gridCategories_column5_control\"]/select/option[contains(text(), \"" + object + "\")]",
    // "//div[@class=\"divDataGrid\"]//table/tbody/tr/td/div[@id=\"tabDepositPage_tabDeposit_gridCategories_column6_control\"]/select/option[contains(text(), \"" + memo + "\")]"
  ];
  // var values = ['','',''];
  // values[1] = amount;
  // values[2] = reason;
  // for(var i = 0; i < 2; i++){
  //   perform(xpaths[i], values[i]);
  // }
  driver.findElement(By.xpath(xpaths[0])).then(function(elem){ driver.actions().click(elem).perform();});
  driver.findElement(By.xpath(xpaths[1])).then(function(elem){ elem.clear(); elem.sendKeys(amount);});
  driver.findElement(By.xpath(xpaths[2])).then(function(elem){ elem.clear(); elem.sendKeys(reason);});
  // // Click_Element()
  // var id = "tabDepositPage_tabDeposit_gridCategories_column6_control";
  // driver.findElement(By.xpath("//div[@class=\"divDataGrid\"]//table/tbody/tr/td/div[@id=\"" + id + "\"]")).then(function(input){
  //   //input.
  // });


  // for(var i = 1; i <= 8; i++){
  //   driver.findElement(By.xpath("//div[@class=\"divDataGrid\"]//table/thead/tr/th[" + i + "]")).then(function(th){
  //     // var text = '';
  //     th.getText().then(function(t){
  //       console.log(t);
  //     })
  //     // console.log(th);
  //     // console.log(th.getText());
  //     // if(th.getText())
  //     // console.log("found ths");
  //     // var columns = [];
  //     // for(var i =0; i < ths.length; i++){
  //     //   columns.push(ths[i].getText());
  //     //   console.log(ths[i].getText());
  //     // }
  //
  //     //get columns headers
  //     ////div[@class="divDataGrid"]//table/thead/tr/descendant-or-self::*/text()
  //
  //     // console.log(columns);
  //   }, function(){
  //     console.log("no text");
  //   });
  // }

};

module.exports.Click_Alert = function(value){
  switch (value) {
    case 'OK':
      driver.switchTo().alert().accept();
      break;
    default:
      driver.switchTo().alert().dismiss();
  }
};
module.exports.Click_Button = function (title){
  if(typeof title === 'string'){
    Click_Button(title);
  } else {
    for (var i = 0; i < title.length; i++){
      Click_Button(title[i]);
      driver.sleep(1000);
    }
  }
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
}
module.exports.Click_ToUncheck = function(title, value){
  Click_CheckBox(title, value, false);
};
module.exports.Click_ToCheck = function(title, value){
  Click_CheckBox(title, value, true);
};
module.exports.Enter_Date = function(title1, title2, value ){
  var xpaths = [
    "//div[div[contains(text(),'" + title1 + "')]][//div[contains(text(), '" + title2 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s|:/g, '') + "')]",
    "//div[div/span[contains(text(),'" + title1 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s|:/g, '') + "')]",
  ];
  Enter_Text(xpaths, 0, value);
};
module.exports.Enter_Date_Reminder = function(title1, title2, value ){
  driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title1 + "')]][//div[contains(text(), '" + title2 + "')]]//td[@class='rcInputCell']//input[@type='text']")).then(function(elem){ elem.clear(); elem.sendKeys(value);});
};
module.exports.Enter_Text = function (title, value){
  var xpaths = [
    "//input[@name='" + title + "']",
    "//div[div[contains(text(),'" + title + "')]]//input[@type='text']",
    "//div[div[contains(text(),'" + title + "')]]//textarea",
    "//td[contains(text(),'" + title + "')]/following-sibling::td[1]//input[@type='text']",
    "//td[p[contains(text(),'" + title + "')]]/following-sibling::td[1]//input[@type='text']"
  ];
  Enter_Text(xpaths, 0, value);
};
module.exports.Move_Slider = function(title, minValue, maxValue){
  driver.findElement(By.id("RadSliderEndDrag_RdSliderMinMax")).then(function(elem){ driver.actions().dragAndDrop(elem,{x: (maxValue - 1) * 5, y: 0}).perform(); })
  driver.findElement(By.id("RadSliderDrag_RdSliderMinMax")).then(function(elem){ driver.actions().dragAndDrop(elem, {x: (minValue - 1) * 5, y: 0}).perform();  });
};
module.exports.Select_ItemInRgTable = function(title, value){
  driver.findElement(By.xpath("//table[@class='rgMasterTable']/tbody/tr/td[contains(text(), '"+ value + "')]")).then(function(elem){
    driver.actions().click(elem).perform();
  });
};
module.exports.Select_List = function(title, value){
  if(title){
    var xpaths = [
      "//td[contains(text(), '" + title + "')]/following-sibling::td[1]//input[@type='text']",
      "//div[contains(@style, 'block')]/div[contains(text(), '" + title + "')]/following-sibling::div[1]//input[@type='text']",
      "//div[contains(text(), '" + title + "')]/following-sibling::*[1]//input[@type='text']",
      "//div[span[contains(text(), '" + title + "')]]/following-sibling::*[1]//input[@type='text']",
      "//input[@type='text' and contains(@value, '" + title + "')]"
    ];
    Select_RdDropDown(xpaths, 0, value);
  } else {
    driver.findElement(By.xpath("//select/option[contains(text(), '" + value + "')]")).then(function(elem){elem.click();})
  }
};
module.exports.Select_Option = function(title, value){
  var xpaths = [
    "//*[div[contains(text(),'" + title + "')]]//td[label[contains(text(),'" + value + "')]]/input",
    "//*[td[contains(text(), '" + title + "')]]//td[label[contains(text(), '" + value + "')]]/input"
  ];
  Click_Element(xpaths, 0);
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
function perform(xpath, value){
  var xpaths = [];
  xpaths.push(xpath);
  if(value){
    //enter_Text
    Enter_Text (xpaths, 0, value);
  } else {
    //click
    Click_Element(xpaths, 0);
  }
}
function Click_Element (xpaths, index){
  driver.findElement(By.xpath(xpaths[index])).then(function(elem){ driver.actions().click(elem).perform();},function(){ Click_Element(xpaths, index + 1);});
};
function Enter_Text (xpaths, index, value){
  driver.findElement(By.xpath(xpaths[index])).then(function(elem){ elem.clear(); elem.sendKeys(value);},function(){ Enter_Text(xpaths, index + 1, value);});
}
function Select_RdDropDown (xpaths, index, value){
  driver.findElement(By.xpath(xpaths[index])).then(function(elem){
    driver.actions().click(elem).perform();
    driver.sleep(1000);
    elem.getAttribute("id").then(function(eid){
      eid = eid.replace('_Input', '_DropDown');
      elem.findElement(By.xpath("//div[@id='" + eid + "']//li[contains(text(), '" + value + "')]")).then(function(elem){
        driver.actions().click(elem).perform();
      })
    })
  },function(){ Select_RdDropDown(xpaths, index + 1, value);});
}
function Click_CheckBox(title, value, isToCheck){
  var cond = "input[@type='checkbox' and @checked='checked']";
  if(isToCheck){
    cond = "input[@type='checkbox' and not (@checked)]";
  }
  var xpaths = [
    "//*[div[contains(text(), '" + title + "')]][//label[contains(text(),'" + value + "')]]//" + cond,
    "//div[div[contains(text(),'" + title + "')]]//div[contains(text(),'" + value + "')]//" + cond,
    "//p[label[contains(text(),'" + value + "')]]//"+ cond,
    "//div[contains(text(),'" + title + "')]/" + cond,
    "//td[label[contains(text(), '" + value + "')]]/" + cond
  ];
  Click_Element(xpaths, 0);
};
function Click_Button(title){
  var xpaths = [
    "//td[contains(@class, \"buttonMiddle\")][contains(text(), \"" + title + "\")]",
    "//input[@type=\"button\"][contains(@title, \"" + title + "\")]",
    "//input[contains(@class, \"button\") or @type=\"button\" or @buttontype=\"button\" or @type=\"submit\"][contains(@value, \"" + title + "\")]",
    "//a[text()[normalize-space(.) = \"" + title + "\"]]",
    "//img[contains(@title, \"" + title + "\") or contains(@alt, \"" + title + "\")]",
    "//input[@type=\"image\"][contains(@alt, \"" + title + "\")]"
  ];
  Click_Element(xpaths, 0);
};
