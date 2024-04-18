import { init } from './notion.js'
import { readFile } from 'fs/promises';
import config from 'config'

const { messages } = JSON.parse(
    await readFile(
        new URL('../result.json', import.meta.url)
    )
);

const canAccessPhoto = async (photo) => {
    const url = `${config.get('SERVER_PATH')}/${photo}`
    const data = await fetch(url)
        .then(async (response) => {
            return await response.blob()
        })
        .catch((err) => {
            console.log('err', err)
        })

    if (data && data.type.includes('image')) return true
}

export async function filterMessage (params) {
    let data = messages;

    if (params.from) {
        data = data.filter((item) => item.from == params.from)
    }

    if (params.policyWithIn) {
        data = data.filter((item) => params.policyWithIn.every(item => res.hasOwnProperty(item)))
    }

    if (params.policyWithout) {
        data = data.filter((item) => params.policyWithIn.every(item => !res.hasOwnProperty(item)))
    }

    const checkPhoto = params.policyWithIn.length == 1 && params.policyWithIn == 'photo' && params.policyWithout.length == 0

    if (!checkPhoto) return data

    let result = []

    const getMessage = async (index) => {
        const item = data[index]

        const hasAccess = await canAccessPhoto(item.photo)

        //console.log(hasAccess)
        if (hasAccess) {
            //await init(item, index)
            result.push(item)
        } else {
            //console.log('error')
        }

        return hasAccess
    }

    let count = data.length

    const cycleMessages = async () => {
        if (count !== 0) {
            await getMessage(count - 1)

            count = count - 1
            await cycleMessages()
        } else {
            return result
        }
    }

    await cycleMessages()

    console.log(result)

    return result
}


export async function allMessages (params) {
    return messages
        .filter((item) => item.from == params.from)
}


// getMessage(11)
//filterMessage()



// NervasMessages.forEach(async (item, index) => {
//     await init(item, index)
// })
