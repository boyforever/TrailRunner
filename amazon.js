
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');
const request = require('request');
var drivers = [];

async function scan(driver, isbn) {   
    await driver.get('https://www.amazon.com');
    var element = await driver.findElement(By.id('twotabsearchtextbox'), 1000);
    await element.sendKeys('isbn ' + isbn, Key.RETURN);
    await driver.wait(until.titleContains(isbn, 1000));

    var elements = await driver.findElements(By.xpath('//div[contains(@class, "s-result-list")]//a[@class="a-link-normal a-text-normal"]'), 1000)
    await elements[0].click(); 
    
    var image = await driver.findElement(By.xpath("//div[@id='imageBlockContainer']//img"), 1000);
    var uri = await image.getAttribute('src');
    await download(uri, isbn+'.jpg', ()=>{ console.log('download image done');})

    var thumb = await driver.findElement(By.xpath("//div[@id='imageBlockThumbs']//img"), 1000);
    var thumburi = await thumb.getAttribute('src');
    await download(thumburi, isbn+'-thumb.jpg', ()=>{ console.log('download thumb image done');})

    element = driver.findElement(By.id('productDetailsTable'))
    driver.executeScript("arguments[0].scrollIntoView();", element);
    elements = await element.findElements(By.xpath('//*[@id="productDetailsTable"]//*[@class="content"]/ul/li'), 1000)

    await elements.forEach(element => {
        element.getText().then( text => {
            fs.appendFileSync(isbn + '.txt', text + '\n', 'utf8');
        });
    }); 

    element = await driver.findElement(By.xpath('//a[@title="UGC upload link"]'), 1000);
    await element.click();
    await driver.wait(until.titleContains('Amazon Sign In'), 1000);
    await driver.quit();
}

var download = (uri, filename, callback)=>{    
    request.head(uri, (err, res, body)=>{
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
}

function readFile(filename) {
    return fs.readFileSync(filename).toString().split("\n");
}

async function main(file) {
    var isbns = readFile('isbn.txt');
    
    for(var i = 0; i < isbns.length; i++){
        let webdriver = await new Builder()
                                .forBrowser('chrome')
                                .build();

        drivers.push(webdriver);
        try{
            scan(drivers[i], isbns[i].trim());
        }
        catch(err){
            console.log(err);
        }        
    }
}

main()