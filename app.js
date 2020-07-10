const express = require('express')
const app = express()
const port = process.env.PORT || 5050

app.use(express.static('public'))

app.get('/', (req, res) => {     res.send(filename, path.resolve('/public/index.html')) })




app.listen(port, () => console.log(`Example app listening on port ${port}!`))