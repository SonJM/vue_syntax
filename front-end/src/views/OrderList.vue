<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top: 20px"><h1>주문 목록</h1></div>
        <table class="table">
            <thead>
                <th>#</th>
                <th>회원EMAIL</th>
                <th>주문상태</th>
                <th>ACTION</th>
            </thead>
            <tbody>
                <tr v-for="order in orderList" :key="order.id">
                    <td>{{order.id}}</td>
                    <td>{{order.memberEmail}}</td>
                    <td>{{order.orderStatus}}</td>
                    <td><button> CANCLE</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            memberList: []
        }
    },
    async created(){
        try{
            const token = localStorage.getItem('token');
            const headers = {Authorization: `Bearer ${token}`};
            const response = await axios.get("http://localhost:8082/members", {headers});
            this.memberList = response.data;
        } catch(error) {
            console.log(error.response);
        }
    }
}
</script>