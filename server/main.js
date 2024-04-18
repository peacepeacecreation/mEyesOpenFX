import express from 'express'
import cors from 'cors'
import { filterMessage } from './messages.js'

const server = express()

// var corsOptions = {
//     origin: 'http://185.237.206.20',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }


server.use(cors())

server.get('/messages', async (req, res) => {
    const data = await filterMessage({ from: 'Nervas' })
    console.log(data)

    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(data))
})

server.listen(8080)
