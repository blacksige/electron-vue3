<style lang="less" scoped>
.result-dialog {}
</style>

<template>
    <div class="result-dialog">
        <el-dialog v-model="dialogVisible" title="历史记录" width="650">
            <el-table :data="gridData">
                <el-table-column property="index" label="Index" width="120" />
                <el-table-column property="name" label="Name" width="300" />
                <el-table-column property="day" label="Day" width="180" />
            </el-table>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="resetDate">
                        重置
                    </el-button>
                    <el-button type="primary" @click="closeDialog">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';

const emit = defineEmits(['getValue']);
const dialogVisible = ref(false);

const showDialog = () => {
    dialogVisible.value = true;
    gridData = reactive(initResultName());
}
const closeDialog = () => {
    dialogVisible.value = false;
}
const initResultName = () => {
    const resultNames = JSON.parse(sessionStorage.getItem('resultNames')) || [];
    return resultNames.map((item, index) => {
        return {
            index: index + 1,
            name: item,
            day: dayjs().format('YYYY/MM/DD')
        }
    });
}
let gridData = reactive(initResultName());
const resetDate = () => {
    sessionStorage.removeItem('resultNames');
    gridData = [];
    closeDialog();
}
defineExpose({ showDialog })
</script>