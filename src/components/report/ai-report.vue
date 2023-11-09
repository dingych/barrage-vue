<template>
  <div class="ai-report">
    <div style="display: flex;justify-content: center;flex-direction: column">
      <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
        <span style="color: black;font-size: 30px;color: #4ed54e">房间动态</span>
        <div style="width: 100%;height: 62vh;margin-top:10px;background-color: white;">
          <div>
            <div>
              <ai-report-room></ai-report-room>
            </div>
            <div class="home-item-line"></div>
          </div>
          <div class="home-item-live">
            <div>
              <ai-report-entrance></ai-report-entrance>
              <ai-report-nice></ai-report-nice>
            </div>
            <ai-report-comment></ai-report-comment>
            <ai-report-gift></ai-report-gift>
            <ai-report-focus></ai-report-focus>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AiReportComment from "@/components/report/ai-report-comment";
import AiReportEntrance from "@/components/report/ai-report-entrance";
import AiReportNice from "@/components/report/ai-report-nice";
import AiReportGift from "@/components/report/ai-report-gift";
import AiReportFocus from "@/components/report/ai-report-focus";
import AiReportRoom from "@/components/report/ai-report-room";
export default {
  name: 'ai-report',
  components: {AiReportRoom, AiReportFocus, AiReportGift, AiReportNice, AiReportEntrance, AiReportComment},
  data() {
    return {
      roomInfo:{
        roomName:'小声点',
        roomId:'1',
        online:9999
      },
      totalInfo: {},
      maxLength: 100,
    }
  },

  mounted() {

  },
  methods:{

  }
}
</script>

<style scoped>
.ai-report{
  display: flex;
  justify-content: center;
  margin: 10px;
}
.home-item-line{
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
</style>
