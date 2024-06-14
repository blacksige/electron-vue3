<style lang="less" scoped>
.result-dialog {
}
</style>

<template>
  <div class="result-dialog">
    <el-dialog
      v-model="dialogVisible"
      title="历史记录"
      :width="!minSize ? '90%' : '650'"
    >
      <el-table :data="gridData" :loading="tableLoading">
        <el-table-column property="index" label="Index" />
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
const tableLoading = ref(false);
let gridData = null;

const showDialog = () => {
  dialogVisible.value = true;
  tableLoading.value = false;
  history
    .queryHistory({})
    .then((res) => {
      gridData = reactive(initResultData(res.data));
      console.log(gridData);
    })
    .finally(() => {
      tableLoading.value = true;
    });
};

const closeDialog = () => {
  gridData = [];
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

const initResultData = (data: any) => {
  return data.map((item, index) => {
    return {
      index: index + 1,
      ...item
    };
  });
};

defineExpose({ showDialog });
</script>
