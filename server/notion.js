import { Client } from '@notionhq/client'
import config from 'config'
import fs from 'fs'

const notion = new Client({ auth: config.get('NOTION_KEY') })

function encode_base64(filename) {
    fs.readFile(path.join(__dirname, filename), function (error, data) {
        if (error) {
            throw error;
        } else {
            //console.log(data);
            var dataBase64 = Buffer.from(data).toString('base64');
            console.log(dataBase64);
            client.write(dataBase64);
        }
    });
}



export async function init (data, index) {
    try {
        const response = await notion.pages.retrieve({
            page_id: config.get('NOTION_BLOCK_ID'),
        });

        const test = await notion.blocks.children.append({
            block_id: response.id,
            children: [
                {
                    "type": "image",
                    "image": {
                        "type": "external",
                        "external": {
                            url: `http://vps63345.hyperhost.name/photos/${data.photo}`
                        }
                    }
                },
                // {
                //     object: 'block',
                //     type: 'paragraph',
                //     paragraph: {
                //         rich_text: [
                //             {
                //                 type: 'text',
                //                 text: {
                //                     content: '' + index,
                //                 }
                //             }
                //         ]
                //     }
                // },
                // {
                //     "type": "image",
                //     "image": {
                //         "type": "external",
                //         "external": {
                //             url: `http://vps63345.hyperhost.name/photos/${data.photo}`
                //         }
                //     }
                // },
                // {
                //     object: 'block',
                //     type: 'paragraph',
                //     paragraph: {
                //         rich_text: [
                //             {
                //                 type: 'text',
                //                 text: {
                //                     content: data.text || 'not text' + ' ' + `http://vps63345.hyperhost.name/photos/${data.photo}`,
                //                 }
                //             }
                //         ]
                //     }
                // }
            ]
        });

        return test

    } catch (err) {
        console.log(err)
    }
}




// function base64_encode(file) {
//     // read binary data
//     var bitmap = fs.readFileSync(file);
//     // convert binary data to base64 encoded string
//     return Buffer.from(bitmap).toString('base64');
// }

// const base64 = base64_encode(data.photo)//fs.readFileSync(data.photo, {encoding: 'base64'})

// // const image = Buffer.from(base64, "base64").toString('base64')

// // fs.writeFileSync("image.png", image)

// console.log(base64)

// function base64_decode(base64Image, file) {
//     fs.writeFileSync(file, base64Image);
//     console.log('******** File created from base64 encoded string ********');
// }

// client.on('data', (data) => {
//     base64_decode(data,'copy.jpg')
// })


// async function writePhoto() {
//     const image = await fs.writeFileSync(data.photo, "This is an example text", {encoding: 'base64'})
//     const file = fs.readFileSync(data.photo)

//     return new Buffer(file).toString('base64');
// }
