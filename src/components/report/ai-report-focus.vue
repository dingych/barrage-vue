<template>
  <div class="ai-report-focus" >
    <span style="font-family: 黑体;font-weight: 200;color: #4ed54e">关注信息</span>
    <div class="ai-report-focus-info" >
      <div  v-for="(item,index ) in items" :key="index" ref="focus">
        <a v-if="item.shortId>0" style="color: #8ce7ff;cursor: pointer" :href="'https://live.douyin.com/'+item.shortId" target="_blank">
          <img :src="item.avatar" width="40" height="40" style="border-radius: 50%">
          {{item.nickName}}
        </a>
        <a v-else style="color: #8ce7ff;" >{{item.nickName}}:</a>
        <span>关注了</span>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "@/public/bus";
export default {
  name: "ai-report-focus",
  data(){
    return{
      items: [],
      maxLength: 2000,
    }
  },
  created() {
    bus.$on('show-focus', this.enq)
  },
  beforeDestroy() {
    bus.$off('show-focus')
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
        const focus = this.$refs.focus;
        focus[focus.length-1].scrollIntoView({
          block:"start",
          behavior:"smooth"
        })
      });
    },
  }
}
</script>

<style scoped>
.ai-report-focus{

}
.ai-report-focus-info{
  margin: 2px;
  border-radius: 5px;
  overflow-y: auto;
  width: 30vh;
  height: 58vh;
  background-color: #2e2f3b;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  color: white;
}
</style>
