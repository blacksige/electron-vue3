<template>
  <div class="home">
    <div class="content">
      <Prize />
      <ElButton class="button" v-if="isShowBtn" @click="start">再来一次</ElButton>
      <Lottery v-if="isShowLottery" :textList="textList" @showResult="showResult"/>
    </div>
    <ButtonGroup @event="eventEmit" />
  </div>
  <DataDialog ref="dataDialog" @getValue="getNames" />
  <ResultDialog ref="resultDialog" />
</template>

<script lang="ts" setup>
import ButtonGroup from "@/components/ButtonGroup";
import Prize from "@/components/Prize.vue";
import Lottery from "@/components/Lottery.vue";
import DataDialog from "@/components/DataDialog.vue";
import ResultDialog from "@/components/ResultDialog.vue";
import history from "@/api/history.js";
import { ref, watch } from 'vue';
import { ElMessageBox, dayjs } from 'element-plus';
import type { Action } from 'element-plus'

const isShowLottery = ref(false);
const dataDialog = ref();
const resultDialog = ref();
const textList = ref([]);
const isShowBtn = ref(false)

const eventEmit = (num) => {
  if (num === '1') {
    dataDialog.value.showDialog();
  } else if (num === '2') {
    resultDialog.value.showDialog();
  } else if (num === '3') {
    isShowBtn.value = false;
    isShowLottery.value = false;
    dataDialog.value.showDialog();
  }
}

const getNames = (text) => {
  console.log(text);
  textList.value = text;
  if (textList.value.length > 0) {
    isShowLottery.value = true;
  } else {
    isShowLottery.value = false;
  }
}

const start = () => {
  if (textList.value.length > 0) {
    isShowLottery.value = true;
  }
}

const showResult = (name) => {
  isShowBtn.value = !!name;
  ElMessageBox.alert(name, '恭喜！', {
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      isShowLottery.value = false
      history.setHistory({
        name: name,
        day: dayjs().format("YYYY/MM/DD HH:mm")
      }).then(res => () => {
        console.log(res);
      })
    },
  })
}
</script>

<style lang="less" scoped>
.home {
  position: absolute;
  left: 10%;
  right: 10%;
  top: 15%;
  bottom: 15%;
  height: 70%;
  width: 80%;
  min-width: 500px;
  min-height: 400px;
  border-radius: 10px;
  background-color: rgb(127 103 103 / 20%);
  box-shadow: 0 0 10px 0px rgb(197 178 178 / 50%);
}

.content {
  display: flex;
  height: 95%;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

}

.content>.button {
  background: linear-gradient(to bottom, #794071, #D95167);
  border: 1px solid rgb(203, 129, 152);
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 600;
  padding: 16px 42px;
}
</style>