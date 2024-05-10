<style lang="less" scoped>
.data-dialog {}
</style>

<template>
    <div class="data-dialog">
        <el-dialog v-model="dialogVisible" title="信息录入" width="500" :close-on-click-modal="false">
            <el-alert title="注意：每条数据以回车结束" type="warning" show-icon style="margin-bottom: 12px;" :closable="false" />
            <el-input v-model="textarea" style="width: 100%" placeholder="Please input" type="textarea"
                :autosize="{ minRows: 10, maxRows: 20 }" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="setValue('0')">暂存</el-button>
                    <el-button type="info" @click="setValue('1')">重置</el-button>
                    <el-button type="primary" @click="getValue">
                        确认
                    </el-button>
                     <el-button @click="closeDialog">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['getValue']);
const dialogVisible = ref(false);
const textarea = ref('')

const showDialog = () => {
    const nameItem = JSON.parse(localStorage.getItem('nameItem'));
    if (nameItem) {
        textarea.value = nameItem;
    }
    dialogVisible.value = true;
}
const closeDialog = () => {
    dialogVisible.value = false;
}
const getValue = () => {
    try {
        const regex = /^(.*?)(?:\n|$)/gm;
        let match;
        const result = [];

        while (textarea.value && (match = regex.exec(textarea.value)) !== null) {
            result.push(match[1]);
        }

        console.log(result);
        emit('getValue', result);
    } catch (error) {
        console.error(error);

    } finally {
        closeDialog();
    }
}
const setValue = (flag: string) => {
    if (flag === '0') {
        localStorage.setItem('nameItem', JSON.stringify(textarea.value))
    } else {
        localStorage.removeItem('nameItem');
        textarea.value = '';
    }
}

defineExpose({ showDialog })
</script>