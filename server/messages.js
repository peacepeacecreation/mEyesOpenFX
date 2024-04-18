import { init } from './notion.js'
import { readFile } from 'fs/promises';
import config from 'config'

const { messages } = JSON.parse(
    await readFile(
        new URL('../result.json', import.meta.url)
    )
);

const canAccessPhoto = async (photo) => {
    const url = `${config.get('SERVER_PATH')}/photos/${photo}`
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
    const data = messages
        .filter((item) => item.from == params.from)
        .filter((item) => item.photo)

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

// getMessage(11)
//filterMessage()



// NervasMessages.forEach(async (item, index) => {
//     await init(item, index)
// })
