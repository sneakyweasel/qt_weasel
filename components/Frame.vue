<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <h3>
          Frame {{ index }}
          <small>({{ frame.probability * 100 }}%)</small>
        </h3>
        {{ frame.vector }}
        <div v-if="frame.particles.length > 0">
          <h4>Photons</h4>
          <b-table striped hover :items="frame.particles"></b-table>
        </div>

        <div v-if="frame.absorptions.length > 0">
          <h4>Absorptions</h4>
          <b-table striped hover :items="frame.absorptions"></b-table>
        </div>
        <hr />
      </b-col>
    </b-row>
  </b-container>
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
}
</script>

<style scoped lang="scss"></style>
