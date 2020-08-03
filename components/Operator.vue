<template>
  <b-row>
    <b-col cols="3">
      <br />
      <br />
      <h3>
        {{ cell.element }}
        <small>(x:{{ cell.x }}, y:{{ cell.y }})</small>
      </h3>
      <ul>
        <li>Rotation: {{ cell.rotation }}°</li>
        <li>Polarization: {{ cell.polarization }}°</li>
        <li>Strength: {{ cell.strength }}</li>
        {{
        convertCellToOperator
        }}
      </ul>
    </b-col>
    <b-col>
      <div>
        <matrix-viewer :operator-raw="convertCellToOperator" :dark-mode="false" />
      </div>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import * as qt from 'quantum-tensors'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICell } from '@/engine/interfaces'
import { MatrixViewer } from 'bra-ket-vue'
@Component({
  components: { MatrixViewer },
})
export default class FrameComponent extends Vue {
  @Prop() readonly cell!: ICell

  get convertCellToOperator(): qt.Operator {
    return qt.Elements.generateOperator(this.cell).op
  }
}
</script>

<style scoped lang="scss"></style>
