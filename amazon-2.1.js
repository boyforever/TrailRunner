const fs = require('fs');
const {Builder, By, Key, until} = require('selenium-webdriver');
const request = require('request');

function readFile(filename) {
    return fs.readFileSync(filename).toString().split("\n");
}
function download (uri, filename, callback)
{    
    request.head(uri, (err, res, body)=>{
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
}
async function getData(isbn, driver){
    
    await driver.get('https://www.amazon.com');
    var element = await driver.findElement(By.id('twotabsearchtextbox'), 1000);
    await element.sendKeys('isbn ' + isbn, Key.RETURN);
    await driver.wait(until.titleContains(isbn, 1000));
    var elements = await driver.findElements(By.xpath('//div[contains(@class, "s-result-list")]//a[@class="a-link-normal a-text-normal"]'), 1000)
    await elements[0].click(); 
    try{
        var image = await driver.findElement(By.xpath("//div[@id='imageBlockContainer']//img"), 1000);
        var uri = await image.getAttribute('src');
        download(uri, isbn+'.jpg', ()=>{ console.log('download image done');})
    }
    catch{

    }
    try{
        var thumb = await driver.findElement(By.xpath("//div[@id='imageBlockThumbs']//img"), 1000);
        var thumburi = await thumb.getAttribute('src');
        download(thumburi, isbn+'-thumb.jpg', ()=>{ console.log('download thumb image done');})
    }
    catch{

    }
    try{
        var iframe = await driver.findElement(By.id('bookDesc_iframe',1000));
        await driver.switchTo().frame(iframe);
        var text = await driver.findElement(By.tagName('body'), 1000).getText();
        await fs.appendFile(isbn + '.txt', text + '\n', 'utf8', (err)=>{if(err) throw err;})
        await driver.switchTo().defaultContent();   
    }
    catch{

    }         
    element = driver.findElement(By.id('productDetailsTable'))
    await driver.executeScript("arguments[0].scrollIntoView();", element);
    elements = await element.findElements(By.xpath('//*[@id="productDetailsTable"]//*[@class="content"]/ul/li'), 1000);
    for(var i = 0; i < elements.length; i++){
        await elements[i].getText().then(async text => {
            await fs.appendFile(isbn + '.txt', text + '\n', 'utf8', (err)=>{if(err) throw err;})
        })
    };    
}
async function main(){
    var isbns = readFile('isbn.txt');
    let driver = await new Builder().forBrowser('chrome').build();
    for(var i = 0; i < isbns.length; i++){
        try{
            await getData(isbns[i].trim(), driver);
        }
        catch(err){
            console.log(err)
        }        
    }
    await driver.quit();
}

main();