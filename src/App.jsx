import { defineComponent, ref } from 'vue'
import Msg from '@/msg.vue'
export default defineComponent({
  name: 'App',
  setup() {
    const a = ref(1)
    const b = ref(43)
    return function() {
      return <div onClick={() =>  a.value++}>
        <div>{a.value}</div>
        <div>{b.value}</div>
        <Msg msg="hello" />
      </div>
    }
  }
})

