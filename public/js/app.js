/*
//Example
fetch("https://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});
*/

// Goal: Fetch weather!

// 1. Setup sa call to fetch weather for boston
// 2. Get the parse JSON response
//     -If error property, print error
//     -If no error property, print location and forecast
// 3. Refresh the browser and test your work

/*
const weatherForm = document.querySelector("form"); //When  clicks the button search it directs to the desired input
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value; //the value variable gets the value to put into location
  
  //Use input value to get weather
// 1. migrate fetch call into the submit callback
// 2. use the search text as the address query string value
// 3. Submit the form with a valid and invalid value to test

  fetch("http://localhost:3000/viewweather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    }
  );
});
*/

// Goal: Render content to paragraphs
// 1. select the second message p from JavaScript
// 2. Just before fetch, render loading message and empty p
// 3. If error, render error;
// 4. If no error, render location and forecast

const weatherForm = document.querySelector("form"); //When  clicks the button search it directs to the desired input
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value; //the value variable gets the value to put into location

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/viewweather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
          //   console.log(data.location);
          //   console.log(data.forecast);
        }
      });
    }
  );
});
