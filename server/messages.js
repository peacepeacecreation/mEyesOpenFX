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
        data = data.filter((item) => params.policyWithout.every(item => !res.hasOwnProperty(item)))
    }

    let result = []
    const getMessage = async (index) => {
        const item = data[index]

        if (item.hasOwnProperty(photo)) {
            const hasAccess = await canAccessPhoto(item.photo)
            if (hasAccess)
                result.push(item)
        } else {
            result.push(item)
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
