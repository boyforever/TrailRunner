var fs = require('fs');
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;
var driver;

module.exports.Open = function(browser){ driver = browser;};
module.exports.Goto_Page = function(pageUrl){ driver.get(pageUrl);};
module.exports.Close = function(){ driver.quit();};
module.exports.Log = function(fn, msg){ fs.appendFile('./logs/' + fn, msg, 'utf8');};
module.exports.TakeScreenshot = function(fn){ driver.takeScreenshot().then(
    function(image, err) {
        fs.writeFile('./screenshots/' + fn + '.png', image, 'base64', function(err) {
            // console.log(err);
        });
      }
    );
};
module.exports.Wait = function(interval){
  if(!interval || interval <= 0) interval = 2000;
  driver.sleep(interval);
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
module.exports.Click_ToUncheck = function(title, value){
  driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title + "')]]//div[contains(text(),'" + value + "')]//input[@type='checkbox'][@checked='checked']")).then(function(elem){ elem.click();})
};
module.exports.Click_ToCheck = function(title, value){
  driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title + "')]]//div[contains(text(),'" + value + "')]//input[@type='checkbox' and not (@checked)]")).then(function(elem){ elem.click();})
};
module.exports.Click_Toincrease = function(title, value){
  for(var i = 0; i <= value; i++){
    driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel' and contains(text(), '" + title + "')]]//a[@title='Increase']")).then(function(elem){elem.click();});
  }
}
module.exports.Click_Button = function (title){
  driver.findElement(By.xpath("//input[contains(@class, 'button')][@value='" + title + "']")).then(
    function(elem){elem.click();},
    function(){driver.findElement(By.xpath("//a[@class='addButtonLink'][contains(text(),'" + title + "')]")).then(
      function(elem){elem.click();},
      function(){ driver.findElement(By.xpath("//td[contains(@class, 'buttonMiddle')][text()='" + title + "']")).then(
        function(elem){elem.click();},
        function(){ driver.findElement(By.xpath("//div[@id='menuItem']/a[contains(text(),'" + title + "')]")).then(
          function(elem){elem.click();},
          function(){ driver.findElement(By.xpath("//input[@type='button'][@value='" + title + "']")).then(
            function(elem){ elem.click().then(null,
              function(){ driver.findElement(By.xpath("//input[@buttontype='button'][@value='" + title + "']")).then(
                function(elem){elem.click();})})},
            function(){ driver.findElement(By.xpath("//input[@buttontype='button'][@value='" + title + "']")).then(
              function(elem){elem.click();})
             })})})})});
};
module.exports.SwitchTo_Popup = function(title){
  switch (title) {
    case 'Add an Item Category':
      driver.switchTo().frame('RdWindowAddModifyCategory');
      break;
    case 'Add an Option':
      driver.switchTo().frame('RdWindowAddModifyOption');
      break;
    case 'Add a Picture':
      driver.switchTo().frame('RdWindowPicture');
      break;
    case 'Add a permission form':
      driver.switchTo().frame('RdWindowPermissionForm');
      break;
    case 'Public Confirmation':
      driver.switchTo().frame('RdWindowPublicConfirmation');
      break;
    default:
  }
};
module.exports.SwitchTo_MainScreen = function(){ driver.switchTo().defaultContent();};
module.exports.Enter_Date = function(title1, title2, value ){
  driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title1 + "')]][//div[contains(text(), '" + title2 + "')]]//td[@class='rcInputCell']//input[@type='text' and contains(@id, '" + title2.replace(/\s/g, '') + "')]")).then(function(elem){elem.sendKeys(value);});
};
module.exports.Enter_Text = function (title, value){
  driver.findElement(By.id(title)).then(function(elem){elem.clear(); elem.sendKeys(value);}, function(){ driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title + "')]]//input[@type='text']")).then(function(elem){elem.clear(); elem.sendKeys(value);}, function(){ driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title + "')]]//textarea")).sendKeys(value);});});
};
module.exports.Select_List = function(title, value){
  driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title + "')]]//a[contains(text(),'select')]")).then(function(elem){
    driver.actions().click(elem).perform();
    driver.sleep(1000);
    driver.findElement(By.xpath("//li[@class='rcbItem'][text()='" + value + "']")).then(function(elem){ elem.click();});
  });
};
module.exports.Select_Option = function(title, value){
  driver.findElement(By.xpath("//div[@class='formRow'][div[@class='formItemLabel'][contains(text(),'" + title + "')]]//td[label[contains(text(),'" + value + "')]]/input")).then(function(elem){ elem.click();})
};
