<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <!--在组件中，使用v-for一定要绑定key-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" />
            </mt-swipe-item>
        </mt-swipe>

        <!--九宫格-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/1.png">
                    <div class="mui-media-body">新闻资讯</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/1.png">
                    <div class="mui-media-body">图片分享</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/1.png">
                    <div class="mui-media-body">商品购买</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/1.png">
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/1.png">
                    <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../img/1.png">
                    <div class="mui-media-body">联系我们</div></a></li>

            </ul>
        </div>
    </div>
</template>

<script>
    import {Toast}from 'mint-ui'
    export default {
        data(){
            return {
                lunbotuList:[]//保存轮播图的数组
            }
        },
        created(){
            this.getLunbotu()
        },
        methods:{
            getLunbotu(){//获取轮播图的方法

                 this.$http.get('http://vue.studyit.io/api/getlunbo').then(result =>{
                    if(result.body.status === 0){
                        //成功了
                        this.lunbotuList = result.body.message;

                    }else{
                        //失败的

                        Toast('加载轮播图失败')
                    }
                 })

            }

        }
    }
</script>

<style scoped>
.mint-swipe{
    height: 200px;
}
img{
    width: 100%;
    height: 100%;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    background-color: #fff;
    border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell img{
    width: 60px;
    height: 60px;
}
</style>