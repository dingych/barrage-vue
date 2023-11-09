<template>
  <div style="display: flex;justify-content: space-around">
    <a href="http://www.softworld.vip" target="_blank">
      <img :src="logo" width="40px" height="40px">
    </a>
    <input v-model="roomUrl" placeholder="请输入您的直播间链接" style="line-height: 28px;width: 6vh;font-weight: bold; border-radius: 5px; width: 35vh;
           border-block-color: green;padding-left: 20px"/>
    <button  style="line-height: 30px;border-radius: 5px;padding-left: 5px;background-color: #4ed54e;width: 7vh" @click="dealUrl">查询</button>
    <button v-show="!liveLock"  style="line-height: 30px;border-radius: 5px;margin-left:10px;background-color: rgb(201 62 165);width: 7vh" @click="continueUrl">继续</button>
  </div>
</template>

<script>
import logo from "@/asserts/logo.png"
import {getWssUrl} from "@/api/wssUrl";
import {getRoomUrl, setRoomUrl} from "@/utils/storage";
export default {
name: "ai-search",
  data(){
    return {
      logo:logo,
      roomUrl:"",
      liveLock:false
    }
  },
  methods:{
    dealUrl(){
      if (!this.roomUrl){
        alert("请输入您的直播间链接")
        return
      }
      let param = {
        roomUrl:this.roomUrl
      }
      getWssUrl(param).then((res)=>{
        if(res.data.code===0){
          this.$emit("search",res.data.data)
          let room=  {roomUrl:this.roomUrl,wssUrl:res.data.data}
          setRoomUrl(room)
          this.roomUrl=""
        }else{
          alert("系统异常:"+res.data.msg)
        }
      })
    },

    continueUrl(){
      let res = getRoomUrl()
      console.log("res:"+JSON.stringify(res))
      if (res){
        this.$emit("search",res.wssUrl)
        this.liveLock=true
      }
    },
  }
}
</script>

<style scoped>

</style>