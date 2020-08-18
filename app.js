const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5050

app.use(express.static('public'))

app.get('/', (req, res) => {     res.sendfile(path.resolve('/public/index.html')) })


app.get('/restaurant', (req, res) => { res.sendfile(path.resolve('public/restaurant.html')) })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))