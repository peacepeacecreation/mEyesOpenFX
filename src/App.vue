<template>
    <div>
        <div class="message-filter">
            <div class="field">
                <label class="label">Від</label>
                <v-select
                    v-model="params.from"
                    :options="['Nervas']"
                    class="select"
                />
            </div>


            <div class="field">
                <label class="label">З</label>
                <v-select
                    v-model="params.policyWithIn"
                    :options="['photo']"
                    multiple
                    class="select"
                />
            </div>


            <div class="field">
                <label class="label">Без</label>
                <v-select
                    v-model="params.policyWithout"
                    :options="['photo']"
                    multiple
                    class="select"
                />
            </div>
        </div>
        <div v-for="(item, index) in sortData"
            :key="index"
            class="messages-item">
            <span>{{ getDate(item.date) }}</span>
            <span>{{ getTime(item.date) }}</span>
            <img :src="`http://vps63345.hyperhost.name/${item.photo}`" alt="">
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
                    const { data } = await axios
                        .get('http://185.237.206.20:8080/messages', { params: this.params })

                    this.data = data
                    //this.allMessages()

                } catch (err) {
                    console.error(err)
                }
            },
            getTime(value) {
                const date = new Date(value)
                return `${date.getHours()}:${date.getMinutes()}`
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
.message-filter .select {
    width: 100%);
}
.message-filter .label {
    margin-bottom: 5px;
}
</style>
