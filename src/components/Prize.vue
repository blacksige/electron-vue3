<style lang="less" scoped>
.prize {
    width: 200px;
    height: 200px;
    background: url('~@assets/prize.png') no-repeat;
    background-size: 100% 100%;
}
</style>

<template>
    <div class="prize" :style="prizeSize">

    </div>
</template>

<script lang="ts" setup>
import { HomeHooks } from "@/hooks/mobileStyle";
const { prizeSize }  = HomeHooks();
</script>