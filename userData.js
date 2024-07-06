const puppeteer = require("puppeteer");

async function userData(userName){
    console.log("Fetching...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.geeksforgeeks.org/user/${userName}/`);

    const selector = '.profilePicSection_head_userHandleAndFollowBtnContainer_userHandle__p7sD'
    try{
        await page.waitForSelector(selector, { timeout: 5000 });
    }
    catch{
        await browser.close();
        return {
            "Status": `User ${userName} not found`,
            "Shariq ": "You have entered wrong username, try again. Thank you!"
        }; 
    }
    
}

module.exports = userData;