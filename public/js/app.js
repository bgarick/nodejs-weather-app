console.log("js/app.js is running")

const weatherform = document.querySelector('form')
const searchTerm = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherform.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = searchTerm.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if (data[0].error){
            messageOne.textContent = data[0].error;
        } else {
            messageOne.textContent = "Location: " + data[0].location;
            messageTwo.textContent = "Forecast: " + data[0].forecast;
        }
    })
})

})