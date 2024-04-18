import express from 'express'
import cors from 'cors'
import { filterMessage, allMessages } from './messages.js'

const server = express()

// var corsOptions = {
//     origin: 'http://185.237.206.20',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }


server.use(cors())

server.get('/messages', async (req, res) => {
    const data = await filterMessage(req.params)

    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(data))
})

server.get('/all-messages', async (req, res) => {
    const data = await allMessages({ from: 'Nervas' })

    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(data))
})

server.listen(8080)
