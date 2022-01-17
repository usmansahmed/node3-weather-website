console.log('Reach for the sky!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address=' + search.value).then((response) => {
    response.json().then( (data) => {
        if (data.error) {
            return msg1.textContent = data.error
        }

        msg1.textContent = data.forecast
        msg2.textContent = data.location
    })
})

})