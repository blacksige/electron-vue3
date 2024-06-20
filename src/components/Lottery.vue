<script setup lang="ts">
import { computed, onMounted, toRaw } from "vue";
import LotteryList from "lattice-lottery-new/LotteryList";
// import { HomeHooks } from "@/hooks/mobileStyle";
// const { minSize } = HomeHooks();

const emit = defineEmits(["showResult"]);
const props = defineProps({
  textList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
const lotteryStyle = computed(() => {
  return {};
});

// 随机排序函数
// function shuffleArray(arr) {
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }

onMounted(() => {
  const list = props.textList.map((item) => {
    return {
      label: item
    };
  });
  const x = Math.floor(Math.random() * 4)
  const oLottery = new LotteryList({
    element: ".lottery",
    list,
    btnText: "开始",
    onend: (e) => {
      emit("showResult", e.label);
    },
    onsubmit: () => {
      oLottery.go(x);
    }
  });
});
</script>

<template>
  <div class="lottery" :style="lotteryStyle"></div>
</template>

<style lang="less">
.lottery {
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 999;
  background-color: #eee;
  padding: 15px;
  border-radius: 8px;
  & > .lottery__box--list {
    .lottery__list {
      .lattice__lottery__item {
        margin-bottom: 10px !important;
      }
    }
  }
}
</style>
