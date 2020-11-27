const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

const app = express()

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
  res.render('index',{
    title: 'Weather App',
    name: 'Andrew'
  })
})

app.get('/about', (req,res) => {
  res.render('about',{
    title: 'About Weather',
    name: 'Andrew'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Andrew'
  })
})

app.get('/weather', (req,res) => {
  if(!req.query.address) {
    return res.send({
      error: "You must provide the address"
    })
  }

  geocode(req.query.address,(error, {latitude, longitude, location}={}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: "You must provide search term"
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title:'404',
    name: 'Andrew',
    message: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew',
    message: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})