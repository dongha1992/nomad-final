function clock() {
    const timeSpan = document.querySelector(".time")
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    timeSpan.innerText = `${hour < 10 ? `0${hour}`: hour} : ${minute < 10 ? `0${minute}`: minute} : ${second < 10 ? `0${second}`: second}`
    setTimeout(clock, 1000)
}

clock()