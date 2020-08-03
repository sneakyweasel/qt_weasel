<template>
  <b-card>
    <b-card-title>
      Frame {{ index }}
      <small>({{ formatPercentage(frame.probability) }})</small>
    </b-card-title>
    <!-- {{ frame.vector }} -->
    <!-- {{ frame.vector.entries }} -->
    <div v-if="frame.particles.length > 0">
      <b-table striped hover :items="frame.particles"></b-table>
    </div>

    <div v-if="frame.absorptions.length > 0">
      <h4>Absorptions</h4>
      <b-table striped hover :items="frame.absorptions"></b-table>
    </div>
  </b-card>
</template>

<script lang="ts">
import * as qt from 'quantum-tensors'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class FrameComponent extends Vue {
  @Prop() readonly frame!: qt.Frame
  @Prop() readonly index!: number

  test = this.frame.vector.entries
  formatPercentage(value: number): string {
    return (value * 100).toFixed(2).toString() + '%'
  }
}
</script>

<style scoped lang="scss"></style>
