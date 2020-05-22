const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//paths for Express config
const pathPublic = path.join(__dirname, "../public")
const pathView = path.join(__dirname, "../templates/views")
const pathPartials = path.join(__dirname, "../templates/partials")

//handlebars setup
app.set("view engine", "hbs")
app.set ("views", pathView)
hbs.registerPartials(pathPartials)

//setup static directory to server
app.use(express.static(pathPublic))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bob Garick'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bob Garick'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Bob Garick",
        helptext: 'Something went wrong...'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send([{
            error: 'You must supply an address.'
        }])
    } 

    geocode(req.query.address,  (error, {latitude, longitude, location} = {}) => {
        if (error){
          return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
          if (error){
            return res.send({error})
          }
    
          res.send([{
            forecast: forecastData,
            location,
            address: req.query.address
        }])
        //   console.log(location)
        //   console.log(forecastData)
        })
    })

    // res.send([{
    //     forecast: "It is 70 and sunny.",
    //     location: "Philadelphia",
    //     address: req.query.address
    // }])
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Bob Garick",
        errormessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Bob Garick",
        errormessage: 'Page not found.'
    })
})




app.listen(3000, () => {
    console.log("Web Server is running.")
})