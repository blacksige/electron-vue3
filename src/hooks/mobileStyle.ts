import { ref, onMounted, onUnmounted, reactive } from 'vue'

export const HomeHooks = () => {
    const minSize = ref(false)
    const prizeSize = reactive<{ width: string, height: string }>({
        width: '',
        height: ''
    });

    const resizeEvent = () => {
        // 在窗口大小改变时执行的代码
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        console.log("窗口宽度：" + windowWidth);
        console.log("窗口高度：" + windowHeight);
        if (windowWidth <= 480) {
            minSize.value = true;
        }
        if (windowHeight < 600 || windowWidth < 800) {
            prizeSize.width = '120px';
            prizeSize.height = '120px';
        } else {
            prizeSize.width = '200px';
            prizeSize.height = '200px';
        }
    }
    onMounted(() => {
        window.addEventListener('resize', resizeEvent);
    })
    onUnmounted(() => {
        window.removeEventListener('resize', resizeEvent)
    })

    return { prizeSize, minSize }
}

