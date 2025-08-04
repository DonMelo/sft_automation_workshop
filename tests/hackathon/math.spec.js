import { test, expect } from '@playwright/test';
test.only('math operator', async ({ browser })=>{

  function digitFromSuperscript(superChar) {
    var result = "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(superChar);
    if(result > -1) { return result; }
    else { return -1; }
}


  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.mathster.com/10secondsmaths/?NumberLimit=%22max%22");



  await page.locator("li input").first().waitFor();
  const listLength = await page.locator("li input").count();
  for(let i = 0; i < listLength; i++){
    await page.locator("li input").nth(i).click();
  }
  //await page.locator("li input").nth(0).click();
  //await page.locator("li input").nth(3).click();

  const answerInput = page.locator("#question-answer");


  await page.locator(".tooltip").hover();
  await page.mouse.down();
  await page.mouse.move(1000, 100);
  await page.mouse.up();


  var subscripts = /[\u2070-\u209F\u00B2\u00B3\u00B9]/;
  let answer = 0;


  while(page.locator("#results [style*=\"none\"]").isVisible()){


  let numLine = await page.locator("#question").textContent();
  



//let numberLine = "2³ - 14 + 31 + 55 + 61 * 85 + √49 * 5³ ÷ 5 - 6  * 7³";
/*
let squareLine = "2³";
let rootLine = "√49";
let addLine = "15 + 15";
let subtractLine = "15 - 5";
let multiplyLine = "4 * 4";
let divisionLine = "15 ÷ 3";
*/

//let numLine = squareLine;

if(numLine){


// jeigu kvadratinis veiksmas
let supIndex = numLine.match(subscripts)?.index;
if(supIndex){
  let num = numLine.substring(0, numLine.length-1);
  let supValue = digitFromSuperscript(numLine[supIndex]);
  answer = Math.pow(parseInt(num), supValue);
}

// jeigu saknies veiksmas
else if(numLine.includes("√")){
  answer = Math.sqrt(parseInt(numLine.substring(1)))
}

else{

  let splitArray = numLine.split(" ");
  let operator = splitArray[1];


  switch(operator){
    case "×":
      answer = parseInt(splitArray[0]) * parseInt(splitArray[2]);
      break;
    case "÷":
      answer = parseInt(splitArray[0]) / parseInt(splitArray[2]);
      break;
    case "+":
      answer = parseInt(splitArray[0]) + parseInt(splitArray[2]);
      break;
    case "-":
      answer = parseInt(splitArray[0]) - parseInt(splitArray[2]);
      break;
  }



}
await answerInput.fill(answer.toString());
await page.locator("#submit-answer").click();

}

}
}



)