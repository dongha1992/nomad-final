const first = document.querySelector(".first-page")
const container = document.querySelector(".container")
const firstForm = document.querySelector(".first-page .once")
const firstInput = document.getElementById("first-input")
const typingSpan = document.querySelector(".auto")

let LOCAL_USER_NAME = "USER"
let userName = JSON.parse(localStorage.getItem(LOCAL_USER_NAME)) || []

const words = ["Tell Me Your Name"]
let cnt = 0
let letter = ""
let timer
let currentText = ""
let type = true;
let show = true;


function typing() {
    if (type === true) {
        letter = words.join("")
        currentText = letter.slice(0, cnt++)
        typingSpan.textContent = currentText
        if (currentText.length === letter.length) {
            cnt = 0
        }
        setTimeout(typing, 600)
    } else {
        return
    }
}
typing()


firstForm.addEventListener("submit", (e) => {
    if (e.target.classList.contains("once")) {
        e.preventDefault()
        clearInterval(typing)
        type = false
        let name = firstInput.value
        typingSpan.innerHTML = `Good day! ${name}`
        firstInput.value = ""
        userName.push(name)
        saveUser()
        greeting()
    } else {
        return
    }
    return
})

function greeting() {
    console.log(userName, name)
    if (userName === null || userName.length === 0) {
        type = true;
        typingSpan.innerHTML = ""
        first.style.display = ""
        container.style.display = "none"

    } else if (!userName === null || userName) {
        type = false;
        if (show === true) {
            typingSpan.innerHTML = `Good day! ${userName}`
            setTimeout(() => {
                first.style.display = "none"
                firstForm.style.display = "none"
                container.style.display = ""
                firstInput.disabled = true

            }, 1000)
        }

    } else {
        show = false;
    }

}

function saveUser() {
    localStorage.setItem(LOCAL_USER_NAME, JSON.stringify(userName))
}
greeting()