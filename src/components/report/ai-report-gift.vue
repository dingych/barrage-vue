<template>
  <div class="ai-report-gift" >
    <span style="font-family: 黑体;font-weight: 200;color: #4ed54e">礼品信息</span>
    <div class="ai-report-gift-info" >
      <div  v-for="(item,index ) in items" :key="index" ref="gift">
        <a v-if="item.shortId>0" style="color: #8ce7ff;cursor: pointer" :href="'https://live.douyin.com/'+item.shortId" target="_blank">
          <img :src="item.avatar" width="40" height="40" style="border-radius: 50%">
        </a>
        <a v-else style="color: #8ce7ff;" >{{item.nickName}}:</a>
        <span>{{item.describe}}</span>
        <img :src="item.imgUrl" width="50" height="50">
        <span>x {{item.giftCount}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "@/public/bus";
export default {
  name: "ai-report-gift",
  data(){
    return{
      items: [],
      maxLength: 50000,
    }
  },
  created() {
    bus.$on('show-gift', this.enq)
  },
  beforeDestroy() {
    bus.$off('show-gift')
  },
  mounted() {

  },
  methods:{
    enq(data) {
      data.imgUrl = "http://p6-webcast.douyinpic.com/img/"+data.imgUrl+"~tplv-obj.image"
        if (this.items.length >= this.maxLength) {
          this.items.shift();
        }
        this.items.push(data);
        this.toBottom()
    },
    toBottom() {
      this.$nextTick(() => {
        const gift = this.$refs.gift;
        gift[gift.length-1].scrollIntoView({
          block:"start",
          behavior:"smooth"
        })
      });
    },
  }
}
</script>

<style scoped>
.ai-report-gift{

}
.ai-report-gift-info{
  margin: 2px;
  border-radius: 5px;
  overflow-y: auto;
  width: 38vh;
  height: 58vh;
  background-color: #2e2f3b;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  color: white;
}
</style>
