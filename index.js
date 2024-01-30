
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            const url = 'https://vue3-course-api.hexschool.io/v2';
            const path = 'anan56';
            axios.post(`${url}/admin/signin`, this.user)
                .then((res) => {
                    const { token, expired } = res.data;
                    // 以下步驟 from Mdn：1.後面的 path 要刪掉 2.expired 是時間格式，要以 new Date 處理
                    document.cookie = `ananToken=${token}; expires=${new Date(expired)};`;
                    window.location = "products.html";
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
    },
}).mount('#app');
