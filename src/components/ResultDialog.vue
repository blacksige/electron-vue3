<style lang="less" scoped>
.result-dialog {
}
</style>

<template>
  <div class="result-dialog">
    <el-dialog
      v-model="dialogVisible"
      title="历史记录"
      :width="minSize ? '100%' : '650'"
      align-center
      :fullscreen="minSize"
      stripe
    >
      <el-table
        :data="gridData"
        v-if="!isLoaded"
      >
        <el-table-column property="index" width="80" label="Index" />
        <el-table-column property="name" label="Name" />
        <el-table-column property="day" label="Day" />
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="info" @click="resetData"> 重置 </el-button>
          <el-button type="primary" @click="closeDialog"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { HomeHooks } from "@/hooks/mobileStyle";
import history from "@/api/history.js";

const { minSize } = HomeHooks();
const emit = defineEmits(["getValue"]);
const dialogVisible = ref(false);
const isLoaded = ref(true);
let gridData = null;
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const showDialog = () => {
  dialogVisible.value = true;
  isLoaded.value = true;
  history
    .queryHistory({})
    .then((res) => {
      initResultData(res.data);
    })
    .finally(() => {
      isLoaded.value = false;
    });
};

const closeDialog = () => {
  gridData.length = 0;
  dialogVisible.value = false;
};

const resetData = () => {
  closeDialog();
  history.deleteHistoryData({}).then((res) => {
    if (res.code === 200) {
      console.log(res.msg);
    }
  });
};

const initResultData = (data: any = []) => {
  gridData = reactive(
    data.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    })
  );
};

defineExpose({ showDialog });
</script>
