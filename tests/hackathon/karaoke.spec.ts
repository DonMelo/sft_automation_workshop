import { chromium } from "playwright";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=NxilU56kPu0";
const LYRICS_SITE_URL = "https://ttsreader.com/player/?goal=mp3";

async function startKaraoke() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    const youtubePage = await context.newPage();
    await youtubePage.goto(YOUTUBE_URL);
    await youtubePage.waitForTimeout(3000);
    try {
        await youtubePage.click('button[aria-label="Play"]');
        console.log("YouTube video started.");
    } catch {
        console.log("Couldn’t click YouTube play button. Maybe it's already playing.");
    }

    console.log("Waiting 5 seconds before starting the lyrics site...");
    await youtubePage.waitForTimeout(10000);

    const lyricsPage = await context.newPage();
    await lyricsPage.goto(LYRICS_SITE_URL);
    await lyricsPage.waitForTimeout(3000);

    try {
        await lyricsPage.click('button.play, button[aria-label="Play"], #play'); 
        console.log("Lyrics site playback started.");
    } catch {
        console.log("Couldn’t find Play button on the lyrics site. Adjust selector as needed.");
    }

    console.log("Karaoke started: YouTube playing + lyrics site started after 5 seconds.");
}

startKaraoke();
