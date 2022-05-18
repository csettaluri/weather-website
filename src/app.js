const path = require('path')    //  This is a core node module
//  In terminal you can open the web-server directory and run the command -> node src/app.js <-
const express = require('express')          //  Here the variable express is a function unlike others which are objects
const hbs = require('hbs')
const chalk = require('chalk')
const geoCode = require('./utils/geoCode.js')
const fetchWeatherInfo = require('./utils/weatherInfo.js')

// console.log(__dirname)
// console.log(__filename)

//  Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// console.log(publicDirectoryPath)  //  To change get the directory for another folder

const app = express()
const port = process.env.PORT || 3000   // Heroku uses PORT, localhost uses 3000

//  Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)     // Express looks for the folder views.. we're customizing the name to templates
hbs.registerPartials(partialsPath)      //  Give the command -> nodemon src/app.js -e js, hbs, html <-

//  Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chandra'
    })
})

//  Fetch information form example.com
// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>')
// })

//  Fetch info from example.com/about
//  Fetch info from example.com/about.html
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Information Page',
        name: 'Mike Ross'
    })
})

//  Fetch info from example.com/help
//  Fetch info from example.com/help.html
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful text.',
        title: 'Get Help',
        name: 'Harvey Specter'
    })
    // res.send([{
    //     name: 'Chandra',
    //     age: 24
    // }, {
    //     name: 'Mike',
    //     age: 40
    // }])
})

app.get('/weather', (req, res) => {
    let output;
    if (!req.query.address) {
        return res.send({
            error: 'You need to enter an address to get information on the weather...'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude} = {} ) => {
        if (error) {
            return res.send({ error })
        } else {
            fetchWeatherInfo(latitude, longitude, (err2, weatherData) => {
                if (err2) {
                    return res.send({ error: err2 })
                } else {
                    return res.send({
                        location: weatherData.location.name +', ' + weatherData.location.region +
                        ', ' + weatherData.location.country,
                        description:  weatherData.current.weather_descriptions[0] + 
                        ' throughout the day. Last observed at ' + 
                        weatherData.current.observation_time + '. It is currently ' + 
                        weatherData.current.temperature + ' degrees out and it feels like ' + 
                        weatherData.current.feelslike + '. There is ' + weatherData.current.precip + 
                        '% chance of rain. Wind direction is towards ' + weatherData.current.wind_dir,
                        address: req.query.address
                    })
                }
            })
        }
        })
    // res.send({
    //     forecast: 'It\'s currently 38 degrees out',
    //     location: 'Hyderabad',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    // Run the URL -> http://localhost:3000/products?search=games&rating=5 -<
    // console.log(req.query)
    // We cannot send 2 responses back
    if (!req.query.search) {
        // return helps us here and it will not execute all the statements after this return statement. Therefore, we are avoiding sending multiple responses to the client
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

//  http://localhost:3000/products.html
app.get('/products', (req, res) => {
    res.send('This is not the actual response... Try to run the url http://localhost:3000/products.html')
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found')
    res.render('404', {
        title: 'Error 404',
        name: 'CS',
        errorMessage: 'Help article not found'
    })
})

//  The below code has to come at the last get call
app.get('*', (req, res) => {
    // res.send('My 404 Page')
    res.render('404', {
        title: '404',
        name: 'Chandrahas Settaluri',
        errorMessage: 'Page not found'
    })
})

// app.listen(3000, () => {        //  Here the argument callback function argument is optional..
//     console.log('Server is up on port 3000.')   // This message to display in terminal/console but not on browser
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})