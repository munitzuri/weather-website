const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')
const name = 'Amit Munitz'
const port = process.env.PORT||3000
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)
app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'help Me',
        name
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({error:'no address'})
    }
    geoCode(req.query.address, (error,{longitude,latitude,location}={}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        errorMsg: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        errorMsg: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})