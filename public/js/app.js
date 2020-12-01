
fetch('https://exnodejs-yanuarvalentino147494.codeanyapp.com/weather?address=xpxpxpxp').then((response) => {
    response.json().then(({error='',forecast,location,address} = {}) => {
        if(error)
        {
            return console.log(error)
        }
        console.log(forecast)
        console.log(address)
        console.log(location)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading Message'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
    response.json().then(({error='',forecast,location,address} = {}) => {
        if(error)
        {
            messageOne.textContent = error
            return console.log(error)
        }
        messageTwo.textContent = "Forecast: "+forecast+"\n"
        messageOne.textContent = "Location: "+ location +"\n"
        console.log(forecast)
        console.log(address)
        console.log(location)
        })
    })

})