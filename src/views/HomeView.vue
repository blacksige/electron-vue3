<template>
  <div class="home">
    <div class="content">
      <Prize />
      <div class="result">
        <ElButton plain v-if="isShowBtn && name">{{ name }}</ElButton>
      </div>
      <ElButton class="button" v-if="isShowBtn" @click="start" :disabled="!!name">start</ElButton>
    </div>
    <ButtonGroup @event="eventEmit" />
  </div>
  <DataDialog ref="dataDialog" @getValue="getNames" />
  <ResultDialog ref="resultDialog" />
</template>

<script lang="ts" setup>
import { Options, Vue } from 'vue-class-component';
import ButtonGroup from "@/components/ButtonGroup";
import Prize from "@/components/Prize.vue";
import DataDialog from "@/components/DataDialog.vue";
import ResultDialog from "@/components/ResultDialog.vue";
import { ref, watch } from 'vue';
import { ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus'

const isShowBtn = ref(false);
const name = ref('');
const dataDialog = ref();
const resultDialog = ref();
const textList = ref([]);

const eventEmit = (num) => {
  if (num === '1') {
    dataDialog.value.showDialog();
  } else if (num === '2') {
    resultDialog.value.showDialog();
  } else if (num === '3') {
    isShowBtn.value = false;
    name.value = ''
  }
}
const getNames = (text) => {
  console.log(text);
  textList.value = text;
  if (textList.value.length > 0) {
    isShowBtn.value = true;
  } else {
    isShowBtn.value = false;
  }
}
const start = () => {
  let randomIndex: number = 0;
  let time = Math.floor(Math.random() * (20 - 10) + 10);
  let timer = setInterval(() => {
    if (time === 0) {
      clearInterval(timer);
      showResult();
    } else {
      randomIndex = Math.floor(Math.random() * textList.value.length);
      name.value = textList.value[randomIndex];
      time--;
    }
  }, 200);
}
const showResult = () => {
  ElMessageBox.alert(name.value, '恭喜！', {
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      const resultNames: string[] = JSON.parse(sessionStorage.getItem('resultNames')) || [];
      resultNames.push(name.value);
      sessionStorage.setItem('resultNames', JSON.stringify(resultNames))
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