

fetch('http://localhost:3000/weather?address=boston').then(
    (response) => {
        response.json().then((data) => {
            if (data.error) {
                return console.log(data.error)
            }
            console.log(data.location)
            console.log(data.forecast)
        })

    })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    message1.textContent='loading...'
    message2.textContent=''

    fetch('/weather?address='+searchElement.value).then(
    (response) => {
        response.json().then((data) => {
           
            if (data.error) {
                return message1.textContent=data.error
            }
            message1.textContent=data.location
            message2.textContent=data.forecast
        })

    })
//
})