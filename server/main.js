import express from 'express'
import { filterMessage } from './messages.js'

const server = express()

server.get('/messages', async (req, res) => {
    const data = await filterMessage({ from: 'Nervas' })
    console.log(data)

    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(data))
})

server.listen(8080)
