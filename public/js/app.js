console.log('Client side JavaScript file is loaded..')

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')

// weatherForm.addEventListener('submit', () => {
//     console.log('testing!!')
// })

const searchedElement = document.querySelector('input')
// const messageOne = document.querySelector('.className')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()      // Prevents the browser from refreshing
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = searchedElement.value

    // console.log(location)
    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                // console.log(data.location)
                // console.log(data.description)
                // console.log(data.address)
                messageOne.textContent = data.location
                messageTwo.textContent = data.description
            }
        })
    })
})