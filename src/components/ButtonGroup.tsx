import { ElButton } from "element-plus";
import { defineComponent, defineEmits } from 'vue'

const ButtonGroup = defineComponent({
    emits: ['event'],
    setup(props, { emit }) {
        const buttonStyle = {
            position: "absolute",
            width: "100%",
            bottom: "20px",
        };
        const clickEvent = (num) => {
            console.log(num);
            emit('event', num)
        }
        return () => (
            <div style={buttonStyle} >
                <ElButton type="text" onClick={clickEvent.bind(this, '1')} >导入数据</ElButton>
                <ElButton type="text" onClick={clickEvent.bind(this, '2')} >中奖名单</ElButton>
                <ElButton type="text" onClick={clickEvent.bind(this, '3')} >重置</ElButton>
            </div >
        );
    }
})

export default ButtonGroup;