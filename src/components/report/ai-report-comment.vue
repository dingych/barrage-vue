<template>
  <div class="ai-report-comment" >
    <span style="font-family: 黑体;font-weight: 200;color: #4ed54e">评论区</span>
    <div class="ai-report-comment-info" >
      <div  v-for="(item,index ) in items" :key="index" ref="comment">

        <a v-if="item.shortId>0" style="color: #8ce7ff;cursor: pointer" :href="'https://live.douyin.com/'+item.shortId" target="_blank">
          <img :src="item.avatar" width="40" height="40" style="border-radius: 50%">
          {{item.nickName}}
        </a>
        <a v-else style="color: #8ce7ff;" >{{item.nickName}}:</a>
        <span style="font-size: 15px;color: white">评论:{{item.content}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "@/public/bus";
export default {
  name: "ai-report-comment",
  data(){
    return{
      items: [],
      maxLength: 50000,
    }
  },
  created() {
    bus.$on('show-comment', this.enq)
  },
  beforeDestroy() {
    bus.$off('show-comment')
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
        const comment = this.$refs.comment;
        comment[comment.length-1].scrollIntoView({
          block:"start",
          behavior:"smooth"
        })
      });
    },
  }
}
</script>

<style scoped>
.ai-report-comment{

}
.ai-report-comment-info{
  margin: 2px;
  border-radius: 5px;
  overflow-y: auto;
  width: 40vh;
  height: 58vh;
  background-color: #24252d;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  /*color: white;*/
}
</style>
