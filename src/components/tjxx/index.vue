<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-press-escape="false"
    width="96vw"
    height="90vh"
    append-to-body
    title="统计信息"
    @close="$emit('update:showDialog', false)"
  >
    <div class="contentbox">
      <div class="content justify-between">
        <div class="text flex-col align-center">
          <div class="title">项目见识征地移民概况</div>
          <span>
            数据显示，1月以来，全国累计新增本土确诊病例2016例。本周后半段，全国现有本土确诊病例和无症状感染者数量已经开始下降，前期发生聚集性疫情的地区防控效果开始显现，正在推进分区分级防控措施，全国疫情总体风险可控。
          </span>
          <img
            src="http://henan.china.com.cn/pic/2021-01/31/50eddfe5-b9ae-4f6a-9111-806405f39d29.jpg"
            alt=""
            srcset=""
          />
          <span
            >国务院联防联控机制强调，我国在总结前一阶段经验教训的基础上，依法制定春运期间的疫情防控政策，也是为了尽可能降低疫情扩散的风险，绝不是要给春节团聚设置超出防控需要的障碍。层层加码和“一刀切”既是一种懒政。</span
          >
        </div>
        <div class="flex-col align-center">
          <div class="title">主要实物指标</div>
          <div class="chart flex-wrap justify-between">
            <chart id="chart1" :options="opt1" />
            <chart id="chart2" :options="opt2" />
            <chart id="chart3" :options="opt3" />
            <chart id="chart4" :options="opt4" />
          </div>
        </div>
        <div class="flex-col align-center">
          <div class="title">补偿投资</div>
          <div class="chart2">
            <chart id="chart5" :options="opt1" />
            <chart id="chart6" :options="opt2" />
          </div>
        </div>
      </div>
      <div class="map">
        <chart id="chart7" :options="opt7" width="92vw" height="80vh" />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import chart from "@/components/chart";
import mock from "./mock";
import mapmock from "./mapmock";

export default {
  name: "Tjxx",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      opt1: mock[0],
      opt2: mock[1],
      opt3: mock[2],
      opt4: mock[3],
      opt7: mapmock,
    };
  },
  watch: {
    showDialog: {
      handler(newVal) {
        this.visible = newVal;
      },
      immediate: true,
    },
  },
  components: {
    chart,
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.contentbox{
  width: 94vw;
  height: 80vh;
  overflow: scroll;
}
.content {
  margin: 0;
  width: 92vw;
  .text {
    width: 22vw;
    line-height: 2em;
    font-size: 20px;
    img {
      width: 400px;
    }
  }
  .chart {
    width: calc(40vw + 10px);
    > div {
      margin-bottom: 10px;
    }
  }
  .chart2 {
    width: 22vw;
    > div {
      margin-bottom: 10px;
    }
  }
  .title {
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 30px;
  }
}
.map {
  margin: 0;
  width: 92vw;
}
</style>
