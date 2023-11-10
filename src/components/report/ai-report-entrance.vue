<template>
  <div class="ai-report-entrance" >
    <span style="font-family: 黑体;font-weight: 200;color: #4ed54e">入场信息</span>
    <div class="ai-report-entrance-info" >
      <div  v-for="(item,index ) in items" :key="index" ref="entrance">

        <a v-if="item.shortId>0" style="color: #8ce7ff;cursor: pointer;" :href="'https://live.douyin.com/'+item.shortId" target="_blank">
          <img :src="item.avatar" width="40" height="40" style="border-radius: 50%">
          {{item.nickName}}
        </a>
        <a v-else style="color: #8ce7ff;" >
          {{item.nickName}} 入场
        </a>
<!--        <span>来了</span>-->
      </div>
    </div>
  </div>
</template>
<script>
import bus from "@/public/bus";
export default {
  name: "ai-report-entrance",
  data(){
    return{
      items: [],
      maxLength: 100,
    }
  },
  created() {
    bus.$on('show-entrance', this.enq)
  },
  beforeDestroy() {
    bus.$off('show-entrance')
  },
  mounted() {

  },
  methods:{
    enq(data) {
        if (this.items.length >= this.maxLength) {
          this.items.shift();
        }
        this.items.push(data);
        this.toBottom()
    },
    toBottom() {
      this.$nextTick(() => {
        const entrance = this.$refs.entrance;
        entrance[entrance.length-1].scrollIntoView({
          block:"start",
          behavior:"smooth"
        })
      });
    },
  }
}
</script>

<style scoped>
.ai-report-entrance{

}
.ai-report-entrance-info{
  margin: 5px;
  border-radius: 5px;
  overflow-y: auto;
  width: 40vh;
  height: 28vh;
  background-color: #2e2f3b;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  color: white;

}
</style>
