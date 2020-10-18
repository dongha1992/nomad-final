const body = document.querySelector("body")
let timerId

function randomBackground() {
    let randomNumber = Math.floor(Math.random() * 5 + 1)
    body.style.backgroundImage = `url(img/img${randomNumber}.jpg)`
    console.log(randomNumber)


}
timerId = setInterval(randomBackground, 5000)