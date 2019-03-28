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
    
    await driver.get('https://www.arbookfind.com/default.aspx');
    element = await driver.findElement(By.id('ContentPlaceHolder1_txtKeyWords'), 1000);
    await element.sendKeys(isbn, Key.RETURN);
    try{
        
        element = await driver.findElement(By.xpath('//td[@class="book-detail"]/a'), 1000);
        if(element != null){
            await element.click();
            await driver.wait(until.titleContains('Accelerated Reader Bookfinder US - Book Detail'), 1000);
            var elements = await driver.findElements(By.xpath('//table[@class="detail-table"]/tbody/tr/td[3]/table/tbody/tr'), 1000);
            for(var i =0; i<elements.length; i++){
                await elements[i].getText().then(async text => {
                    await fs.appendFile(isbn + '-ar.txt', text + '\n', 'utf8', (err)=>{if(err) throw err;})
                })
            };
        }
    }
    catch(error){
        console.log(error);
    }
}
async function main(){
    var isbns = readFile('isbn.txt');
    let webdriver = await new Builder().forBrowser('chrome').build();

    await webdriver.get('https://www.arbookfind.com/default.aspx');
    var element = await webdriver.findElement(By.id('radStudent'), 1000);
    await element.click();
    element = await webdriver.findElement(By.id('btnSubmitUserType'), 1000);
    await element.click();

    for(var i = 0; i < isbns.length; i++){
        try{
            await getData(isbns[i].trim(), webdriver);
        }
        catch(err){
            console.log(err)
        }        
    }
    await webdriver.quit();
}

main();