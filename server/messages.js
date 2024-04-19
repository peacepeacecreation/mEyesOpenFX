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

    if (params.policyWithIn && params.policyWithIn.length > 0) {
        data = data.filter((item) => params.policyWithIn.every((option) => item.hasOwnProperty(option)))
    }

    if (params.policyWithout && params.policyWithout.length > 0) {
        data = data.filter((item) => params.policyWithout.every((option) => !item.hasOwnProperty(option)))
    }

    if (params.device == 'DESKTOP') {
        data = data.filter((item) => params.exclusionDevice.includes(item.id) || item.width > item.height)
    } else if (params.device == 'PHONE') {
        data = data.filter((item) => params.exclusionDevice.includes(item.id) || item.width < item.height)
    }

    let result = []
    const setResult = async (index) => {
        const item = data[index]

        // if (item.hasOwnProperty('photo')) {
        //     const hasAccess = await canAccessPhoto(item.photo)
        //     if (!hasAccess)
        //         result.push(item)

        //     return
        // }

        result.push(item)
    }

    let count = data.length

    const cycleMessages = async () => {
        if (count !== 0) {
            await setResult(count - 1)

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


// setResult(11)
//filterMessage()



// NervasMessages.forEach(async (item, index) => {
//     await init(item, index)
// })
