const path = require('path')
const express = require('express')
    // const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

// define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../views')

// setup handlebars view engine and path
app.set('view engine', 'hbs')
app.set('views', viewPath)

// setup static path to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Certiio',
        description: 'Verify your authenticated document!'
    })
})

app.get('/index.hbs', (req, res) => {
    res.render('index', {
        title: 'Certiio',
        description: 'Verify your authenticated document!'
    })
})

app.get('/signDocument.hbs', (req, res) => {
    res.render('signDocument', {
        title: 'Certiio',
        description: 'Sign and authenticate your document!'
    })
})

app.get('/registerSignature.hbs', (req, res) => {
    res.render('registerSignature', {
        title: 'Certiio',
        description: 'Register your signature!'
    })
})

app.get('/rechargeSignature.hbs', (req, res) => {
    res.render('rechargeSignature', {
        title: 'Certiio',
        description: 'Recharge your signature!'
    })
})

app.listen(port, () => {
    console.log(`Express server running on port: ${port}`)
})