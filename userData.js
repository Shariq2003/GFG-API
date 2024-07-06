const puppeteer = require("puppeteer");

async function userData(userName){
    console.log("Fetching...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.geeksforgeeks.org/user/${userName}/`);

    const selector = ".profilePicSection_head_userHandleAndFollowBtnContainer_userHandle__p7sDO";
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

    const getUserData = await page.evaluate(() => {
        const name = document.querySelector('.profilePicSection_head_userHandleAndFollowBtnContainer_userHandle__p7sDO').textContent;
        const rank = document.querySelector('.profilePicSection_head_userRankContainer_rank__abngM').firstChild.textContent;
        const institute = document.querySelector('.educationDetails_head_left--text__tgi9I').textContent;
        const overall_coding_score = document.getElementsByClassName("scoreCard_head_card_left--score__pC6ZA")[0].textContent;
        const total_problems_solved = document.getElementsByClassName("scoreCard_head_card_left--score__pC6ZA")[1].textContent;
        const monthly_coding_score = document.getElementsByClassName("scoreCard_head_card_left--score__pC6ZA")[2].textContent;
        const current_streak = document.querySelector(".circularProgressBar_head_mid__IKjUN").childNodes[1].childNodes[0].textContent;
        const languages = document.querySelector('.educationDetails_head_right--text__lLOHI').textContent;

        const problems = document.querySelector('.problemListSection_head__JAiP6');

        const school = Array.from(problems.childNodes[3].childNodes[0].childNodes).map((li) => {
            return li.childNodes[0].innerText;
        })
        const basic = Array.from(problems.childNodes[2].childNodes[0].childNodes).map((li) => {
            return li.childNodes[0].innerText;
        })
        const easy = Array.from(problems.childNodes[1].childNodes[0].childNodes).map((li) => {
            return li.childNodes[0].innerText;
        })
        const medium = Array.from(problems.childNodes[0].childNodes[0].childNodes).map((li)=>{
            return li.childNodes[0].innerText;
        })
        const hard = Array.from(problems.childNodes[4].childNodes[0].childNodes).map((li) => {
            return li.childNodes[0].innerText;
        })
        return {
            name,
            rank,
            institute,
            overall_coding_score,
            total_problems_solved,
            monthly_coding_score,
            current_streak,
            languages,
            school,
            basic,
            easy,
            medium,
            hard
        };
    });
    await browser.close();
    console.log("Fetched");
    return getUserData;
}

module.exports = userData;