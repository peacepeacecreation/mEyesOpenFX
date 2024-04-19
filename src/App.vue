<template>
    <div>
        <div class="message-filter">
            <div class="field">
                <label class="label">FROM</label>
                <v-select
                    v-model="params.from"
                    :options="['Nervas']"
                />
            </div>


            <div class="field">
                <label class="label">With Only</label>
                <v-select
                    v-model="params.policyWithIn"
                    :options="['photo']"
                    multiple
                    @update:modelValue="fetch()"
                />
            </div>

            <div class="field">
                <label class="label">DEVICE</label>
                <v-select
                    v-model="params.device"
                    :options="['ALL', 'DESKTOP', 'PHONE']"
                    @update:modelValue="fetch"
                />
            </div>


            <!-- <div class="field">
                <label class="label">Without</label>
                <v-select
                    v-model="params.policyWithout"
                    :options="['photo']"
                    multiple
                    @input="fetch()"
                />
            </div> -->
        </div>

        <div v-for="(item, index) in sortData"
            :key="index"
            class="messages-item">
            <div class="messages-item-header">
                <template v-if="index == 0 || sortData[index - 1].date_unixtime != item.date_unixtime">
                    <span>{{ getDate(item.date) }}</span>
                    <span>{{ getTime(item.date) }}</span>
                </template>
            </div>
            <img v-if="item.photo" :src="`http://vps63345.hyperhost.name/${item.photo}`" alt="" style="font-size: 5px">

            <!-- <span v-if="item.reply_to_message_id">Reply : {{ item.reply_to_message_id }}</span> -->
            <span v-if="item.text">{{ item.text }}</span>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'App',
        data() {
            return {
                data: [],
                params: {
                    from: 'Nervas',
                    policyWithIn: ['photo'],
                    policyWithout: [],
                    device: 'DESKTOP',
                    exclusionDevice: [251352, 251429, 252747, 252753, 253508, 253511, 253809, 255317, 259754, 260634, 260633, 260672]
                },
            }
        },
        computed: {
            sortData() {
                return this.data.sort((a, b) => a.date_unixtime - b.date_unixtime)
            },
        },
        created() {
            this.fetch()
        },
        methods: {
            async fetch() {
                try {
                    const url = 'http://185.237.206.20:8080'
                    const { data } = await axios.get(`${url}/messages`, { params: this.params })

                    this.data = data

                    // let count = 0

                    // const test = data.reduce((res, item, index) => {
                    //     if ((index + 1) > (30 * (count + 1))) {
                    //         count = count + 1
                    //     }

                    //     if (!res[count]) res.push([])

                    //     res[count].push(item.photo)

                    //     return res
                    // }, [])

                    // test.forEach((item) => {
                    //     console.log(item.map((text) => `cp ${text} newPhoto`).join(' && '))
                    // })
                    //this.allMessages()

                } catch (err) {
                    console.error(err)
                }
            },
            getTime(value) {
                const date = new Date(value)
                let hour = date.getHours()
                hour = hour < 10 ? '0' + hour : hour

                let minutes = date.getHours()
                minutes = minutes < 10 ? '0' + minutes : minutes

                return `${hour}:${minutes}`
            },
            getDate(value) {
                const date = new Date(value)
                let day = date.getDate()
                let month = date.getMonth() + 1

                day = day < 10 ? '0' + day : day
                month = month < 10 ? '0' + month : '' + month

                return `${day}.${month}.${date.getFullYear()}`
            },
            // async allMessages() {
            //     await axios
            //         .get('http://185.237.206.20:8080/all-messages', { from: 'Nervas' })
            // }
        }
    }
</script>

<style>

@import "vue-select/dist/vue-select.css";
.messages-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5px;
    margin-bottom: 10px;
    transition: .2s;
    box-shadow: 0px 0px 10px -1px #ddd;
}

.messages-item:hover {
    box-shadow: 0px 0px 10px -1px #6f6f6f;
}

.messages-item-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.messages-item-header span {
    padding: 5px 10px 0px;
}

.messages-item img {
    width: 100%;
}
.message-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.message-filter .field {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    margin: 5px;
}
.message-filter .v-select {
    width: 100%;
}
.message-filter .label {
    margin-bottom: 5px;
}
</style>
