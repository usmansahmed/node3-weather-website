const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views engine
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Syed Usman Ahmed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Syed Usman Ahmed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP ME!',
        name: 'Syed Usman Ahmed'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'Address not provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
        if (error) {
           return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({
                    error
                })
             }
    
             res.send({
                location,
                forecast: response
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        msg: 'Help article not found',
        name: 'Syed Usman Ahmed',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        msg: 'Page not found',
        name: 'Syed Usman Ahmed',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})