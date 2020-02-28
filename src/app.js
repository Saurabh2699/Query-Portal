const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('./db/mongoose')
const Query = require('./models/query')
const path = require('path')

const PORT = process.env.PORT 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'query.html'))
})

app.get('/getqueries', (req, res) => {
    Query.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.render('data', { queries: data })
        }
    })
})

app.post('/querydata', (req, res) => {
    const newQuery = new Query(req.body)
    newQuery.save().then(data => {
        res.status(200).json('Data submitted successfully!!!')
    }).catch(err => {
        res.status(400).json('Error in sending data')
    })
})


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
