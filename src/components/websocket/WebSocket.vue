<template>
  <div class="ai-report">
    <div style="display: flex;justify-content: center;flex-direction: column">
      <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
        <ai-search @search="initWebSocket"></ai-search>
        <div style="width: 100%;height: 62vh;margin-top:30px;background-color: white;">
          <div>
            <div>
              <ai-report-room ref="roomInfo"></ai-report-room>
            </div>
            <div class="home-item-line"></div>
          </div>
          <div class="home-item-live">
            <div>
              <ai-report-entrance ref="entrance"></ai-report-entrance>
              <ai-report-nice ref="nice"></ai-report-nice>
            </div>
            <ai-report-comment ref="comment"></ai-report-comment>
            <ai-report-gift ref="gift"></ai-report-gift>
            <ai-report-focus ref="focus"></ai-report-focus>
          </div>
          <div style="display: flex;justify-content: center;padding-top: 50px">
            更多开源项目:<a href="https://github.com/wanyushu" target="_blank">https://github.com/wanyushu</a>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>


<script>
import pako from 'pako';
import protobuf from '../../proto/proto.js'
import config from "../../config/config";
import AiReportRoom from "@/components/report/ai-report-room";
import AiReportFocus from "@/components/report/ai-report-focus";
import AiReportGift from "@/components/report/ai-report-gift";
import AiReportNice from "@/components/report/ai-report-nice";
import AiReportEntrance from "@/components/report/ai-report-entrance";
import AiReportComment from "@/components/report/ai-report-comment";
import AiSearch from "@/components/report/ai-search";
export default {
  name: 'WebSocket',
  components: {AiSearch, AiReportRoom, AiReportFocus, AiReportGift, AiReportNice, AiReportEntrance, AiReportComment},
  data() {
    return {
      websocket: null,
      openHeart:null,
      closeHeart:null,
    }
  },
  created() {
  },
  destroyed() {
    this.websocket.close()
  },
  methods: {
    initWebSocket(wsUrl) {
      this.websocket = new WebSocket(wsUrl);
      this.websocket.binaryType = config.wsBinaryType;
      this.websocket.onmessage = this.webSocketMessage;
      this.websocket.onopen = this.webSocketOpen;
      this.websocket.onerror = this.webSocketError;
      this.websocket.onclose = this.webSocketClose;
    },

    webSocketOpen: function () {
      console.log("---------------WebSocket连接成功--------------")
      this.socketSendHeart();
      if(this.closeHeart){
        clearTimeout(this.closeHeart);
      }
    },

    webSocketError() {

    },
    webSocketMessage: function (event) {
      let barrage = protobuf.lookup("framework.PushFrame");
      const barrageDecode = barrage.decode(new Uint8Array(event.data))
      const  decompressed = pako.ungzip(barrageDecode.payload)
      const  response = protobuf.lookup("framework.Response");
      var message = response.decode(new Uint8Array(decompressed));
      var res = response.toObject(message,{});
      if(res.needAck){
        this.socketSendAck(decompressed.logId,'ack');
      }
      if(res.messagesList&&res.messagesList.length>0){
        for(let i = 0;i<res.messagesList.length;i++){
          this.dealMessage(res.messagesList[i]);
        }
      }
    },
      socketSendHeart  :function  () {
        let heart = {
          PayloadType:"bh"
        }
          this.dyClientSend("framework.PushFrame",heart)
    },

    socketSendAck:function(logId,internalExt) {
      let ackPack = {
        LogId:logId,
        payload_type:internalExt
      }
      this.dyClientSend("framework.PushFrame",ackPack)
    },
    dyClientSend: function (lookupType, barrageData) {
      let baseLookupType = protobuf.lookup(lookupType);
      let data = baseLookupType.create(barrageData);
      let sendData = baseLookupType.encode(data).finish();
      this.webSocketSend(sendData);
    },
    //处理消息
    dealMessage(Message){
      switch (Message.method) {
        case "WebcastChatMessage":
          //处理评论消息
          var chatMessage = protobuf.lookup("framework.ChatMessage");
          var res
          try{
            res = chatMessage.decode(new Uint8Array(Message.payload));
          }catch (e) {
            // console.log("发送异常")
          }
          if(res){
            var chatMsg = {
              shortId:  res.user.shortId,
              content:  res.content,
              nickName: res.user.nickName,
              gender:   res.user.gender,
              msgId:    res.common.msgId,
              avatar:   res.user.AvatarThumb.urlListList[0],
            }
            this.$refs.comment.enq(chatMsg)

          }
          break
        case "WebcastGiftMessage":
          var giftMessage = protobuf.lookup("framework.GiftMessage");
          var giftD = giftMessage.decode(new Uint8Array(Message.payload));
          if(giftD) {
            var giftMsg = {
              shortId: giftD.user.shortId,
              content: giftD.gift.name,
              nickName: giftD.user.nickName,
              gender: giftD.user.gender,
              msgId: giftD.common.msgId,
              giftCount: giftD.totalCount,
              avatar: giftD.user.AvatarThumb.urlListList[0],
              describe:  giftD.gift.describe,
              imgUrl:giftD.gift.image.uri,
            }
            this.$refs.gift.enq(giftMsg)
          }
          break
        case "WebcastLikeMessage":
          var likeMessage = protobuf.lookup("framework.LikeMessage");
          var like = likeMessage.decode(new Uint8Array(Message.payload));
          if(like) {
            var likeMsg = {
              shortId: like.user.shortId,
              content: "点赞",
              nickName: like.user.nickName,
              gender: like.user.gender,
              msgId: like.common.msgId,
              count: like.count,
              avatar: like.user.AvatarThumb.urlListList[0],
            }
            this.$refs.nice.enq(likeMsg)
          }
          break
        case "WebcastMemberMessage":
          var memberMessage = protobuf.lookup("framework.MemberMessage");
          var member = memberMessage.decode(new Uint8Array(Message.payload));
            if(member){
              var memberMsg = {
                shortId:  member.user.shortId,
                content:  "入场",
                nickName: member.user.nickName,
                gender:   member.user.gender,
                msgId:    member.common.msgId,
                avatar:   member.user.AvatarThumb.urlListList[0],
              }
              this.$refs.entrance.enq(memberMsg)
            }
          break
        //新光
        case "WebcastRoomUserSeqMessage": //必须订阅
          var roomUser = protobuf.lookup("framework.RoomUserSeqMessage");
          var countUser = roomUser.decode(new Uint8Array(Message.payload));
          if(countUser) {
            var countMsg = {
              count:     countUser.total,
              totalUser: countUser.totalUser,
              msgId:     countUser.common.msgId,
              rankScore: countUser.totalPvForAnchor,
              roomId:    countUser.common.roomId,
            }
            this.$refs.roomInfo.enq(countMsg)
          }
          break
        case "WebcastSocialMessage":
          var socialMessage = protobuf.lookup("framework.SocialMessage");
          var social = socialMessage.decode(new Uint8Array(Message.payload));
          if(social){
            var socialMsg = {
              shortId:  social.user.shortId,
              content:  "关注",
              nickName: social.user.nickName,
              msgId:    social.common.msgId,
              roomId:   social.common.roomId,
              avatar:   social.user.AvatarThumb.urlListList[0],
            }
            this.$refs.focus.enq(socialMsg)
          }
          break
        default:
          break
      }
    },

    webSocketSend: function (Data) {
      if (this.websocket.readyState === 1) {
        this.websocket.send(Data);
      }
    },

    webSocketClose(e) {
      console.log(e)
      console.log("---------------开始进行断网重连--------------")
      this.coloseHeart =  setTimeout(this.initWebSocket, 5000);
    },

    heartBeatSend: function () {
      const data = {
        payloadType: "bh",
      }
      this.socketSendHeart("framework.PushFrame", data );
      this.openHeart = setTimeout(this.heartBeatSend, 10000);
    },

  },
}
</script>
<style scoped>
.ai-report{
  display: flex;
  justify-content: center;
  margin: 10px;
}
.home-item-line {
  width: 100%;
  border: 1px solid #4ed54e;
}
.home-item-live{
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin: 3px;
  border-radius: 10px;
  align-items: flex-start;
}
.input{
  line-height: 30px;
  border-radius: 5px;
  width: 30vh;
  border-block-color: green;
}
</style>