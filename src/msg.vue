<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  render({ msg }) {
    return <div>{msg}</div>
  }
})
</script>
