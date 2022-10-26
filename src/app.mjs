import path from 'path';
const __dirname = path.resolve(); //Always add this statement bcz of changes in es6
import express from 'express'
import hbs from 'hbs'
import geocode from './geocode.mjs'
import forecast from './forecast.mjs'

const app=express()

// //website_name.get() helps us to configure what the server should do when the server when user tries to get the resource at a specific url eg. website_name/about
// //the get method takes 2 arguement=1. the rout(partial url ie. /about)    2. the 2nd will be a function where we will describe what response we should send back when so one visits that particular rout
// app.get('',(req,res)=>{
//     res.send("hello express")
// })

// app.get('/help',(req,res)=>{
//     res.send("help page")
// })

// app.listen(800, () => {
//     console.log("server is up on port 800")
// })






// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)




// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//route for just the localhost
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sonali'
    })
})

//route for about url 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sonali'
    })
})

//route for help url
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sonali'
    })
})

//route for weather url
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
        error:'you must provide an address!'
        })
    }
  geocode(req.query.address,(error,{latitude,longitude,location})=>{
    if(error){
        return res.send({error})
    
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
    })
   })
})

//route for all other url inside help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sonali',
        errorMessage: 'Help article not found.'
    })
})

//route for all other url
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sonali',
        errorMessage: 'Page not found.'
    })
})

app.listen(800, () => {
    console.log('Server is up on port 800.')
})


// // Setup static directory to serve
// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'Sonali'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Sonali'
//     })
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helpText: 'This is some helpful text.',
//         title: 'Help',
//         name: 'Sonali'
//     })
// })

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'You must provide an address!'
//         })
//     }

//     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
//         if (error) {
//             return res.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Sonali',
//         errorMessage: 'Help article not found.'
//     })
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Sonali',
//         errorMessage: 'Page not found.'
//     })
// })

// app.listen(800, () => {
//     console.log('Server is up on port 800.')
// })