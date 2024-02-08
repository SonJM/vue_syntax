<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top: 20px;">
            <h1>상품 목록</h1>
        </div>
        <div class="d-flex justify-content-between" style="margin-top:20px">
            <form @submit.prevent="searchItems" style="margin: 20px">
                <select class="form-control" style="display: inline-block; width: auto; margin-right: 5px" v-model="searchType">
                    <option value="optional">선택</option>
                    <option value="name">상품명</option>
                    <option value="category">카테고리</option>
                </select>
                <input type="text" v-model="searchValue" />
                <button type="submit">검색</button>
            </form>
            <div>
                <button @click="addCart" class="btn btn-secondery">장바구니</button>
                <button @click="placeOrder" class="btn btn-success">주문하기</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th>제품사진</th>
                    <th>제품명</th>
                    <th>가격</th>
                    <th>재고수량</th>
                    <th>주문수량</th>
                    <th>id</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in itemList" :key="item.id">
                    <td><input type="checkbox" v-model="selectedItems[item.id]"/></td>
                    <td><img :src="getImage(item.id)" style="height: 100px; width: auto;"></td>
                    <td>{{item.name}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.stockQuantity}}</td>
                    <td><input type="number" min="1" v-model="item.quantity" class="form-control" style="width: 60px"/></td>
                    <td>{{item.id}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            itemList: [],
            pageSize: 10,
            currentPage: 0,
            searchType: 'name',
            searchValue: '',
            isLastPage: false,
            isLoading: false,
            selectedItems: {},
        }
    },
    created(){
        this.loadItems();
    },
    mounted() {
        window.addEventListener('scroll', this.scrollPagination);
    },
    methods: {  
        placeOrder(){
            console.log(this.selectedItems);
            // Object.keys : 위의 데이터구조에서 1,2 등 key값 추출하는 메서드
            // [{itemId:1, count:10}, {itemId:1, count:10}]
            const orderItems = Object.keys(this.selectedItems)
                                .filter(key=>this.selectedItems[key]===true)
                                .map(key => {
                                    const item = this.itemList.find(item => item.id == key);
                                    return {itemId:item.id, count:item.quantity};
                                });
            console.log(orderItems);
        },
        scrollPagination(){
            // innerHeight : viewport 높이를 픽셀단위로 변환
            // scrollY : 스크롤을 통해 Y축을 이동한 거리
            // offsetHeight : 전체브라우저 창의 높이
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
            if(nearBottom && !this.isLastPage && !this.isLoading) {
                this.currentPage++;
                this.loadItems();
            }
        },
        getImage(itemId){
            return `${process.env.VUE_APP_API_BASE_URL}/item/${itemId}/image`;
        },
        searchItems(){
            this.itemList = [];
            this.currentPage = 0;
            this.isLastPage = false;
            this.loadItems();
        },
        async loadItems(){
            this.isLoading=true;
            try{
            // params 키워드 사용해야 파라미터 방식으로 axios요청 가능
            const params = {
                page: this.currentPage,
                size: this.pageSize,
                // [this.searchType]: this.searchValue
            }
            if(this.searchType === "name"){
                params.name = this.searchValue;
            } else if(this.searchType === "category"){
                params.category = this.searchValue;
            }   
            console.log(params);
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/items`, {params});
            const addItemList = response.data.map(item=>({...item, quantity:1}));
            if(addItemList.length < this.pageSize) {
                this.isLastPage = true;
            }
            this.itemList = [...this.itemList, ...addItemList];
            } catch(error){
                console.log(error)
            }
            this.isLoading = false;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>