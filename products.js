import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

// Bootstrap Modal
// 此次不以 data-bs，而是以 js 的方法
// 方法一：modal 的 body 內容會無法連動
// const productModal = document.querySelector('#productModal');
// 實體化
// from bootstrap 文件： var myModal = new bootstrap.Modal(document.getElementById('myModal'), options)
// const myModal = new bootstrap.Modal(productModal);

// 方法二
// 將動元素放置 vue mounted 內
let productModal = '';
let delProductModal = '';

createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'anan56',
            // getData 
            products: [],
            isNew: false,
            // temp 新增後的資料
            tempProduct: {
                imagesUrl: [],
            },
        }
    },
    methods: {
        // 驗證
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    this.getData();
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'index.html';
                })
        },
        // gatData：取得產品資訊 & 渲染產品列表
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
            axios.get(url)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },

        // addData()：新增產品資料 / button: 建立新的產品
        addData() {
            this.tempProduct = {
                imagesUrl: [],
            };
            this.isNew = true;
            productModal.show();
        },
        // saveData()：新增、修改資料 / button: 確認
        saveData() {
            if (!this.isNew) {
                const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                // put 編輯後的產品資訊
                axios.put(url, { data: this.tempProduct })
                    .then((res) => {
                        console.log(res);
                        this.getData();
                    })
                    .catch((err) => {
                        err.response.data.message;
                    })
            } else {
                const url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
                // post 新的產品資訊
                axios.post(url, { data: this.tempProduct })
                    .then((res) => {
                        console.log(res);
                        this.getData();
                    })
                    .catch((err) => {
                        err.response.data.message;
                    })
            };
            this.tempProduct = '';
            productModal.hide();
        },
        // addImgs()：新增圖片
        addImgs() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');

        },
        // editData(item)：展開產品內容
        editData(item) {
            this.tempProduct = { ...item };
            this.isNew = false;
            productModal.show();
        },
        // delete
        deleteShow(item) {
            this.tempProduct = { ...item };
            delProductModal.show()
        },
        deleteProduct() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
                .then((res) => {
                    console.log(res);
                    delProductModal.hide();
                    this.getData();
                })
                .catch((err) => {
                    err.response.data.message;
                })
        },

    },
    mounted() {
        // token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)ananToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin()

        // modal 動元素
        productModal = new bootstrap.Modal(document.getElementById('productModal'), { keyboard: false });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), { keyboard: false });
    }
}).mount('#app');

