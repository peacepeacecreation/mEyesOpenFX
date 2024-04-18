<template>
    <div>
        <div v-for="(item, index) in sortData"
            :key="index"
            class="messages-item">
            <span>{{ getTime(item.date) }}</span>
            <img :src="`http://vps63345.hyperhost.name/photos/${item.photo}`" alt="">
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
                data: []
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
                        .get('http://185.237.206.20:8080/messages', { from: 'Nervas' })

                    this.data = data

                } catch (err) {
                    console.error(err)
                }
            },
            getTime(value) {
                const date = new Date(value)
                let day = date.getDate()
                let month = date.getMonth() + 1

                day = day < 10 ? '0' + day : day
                month = month < 10 ? '0' + month : '' + month

                return `${date.getHours()}:${date.getMinutes()} ${day}.${month}.${date.getFullYear()}р.`
            },
        }
    }
</script>

<style>
.messages-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
