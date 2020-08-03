<template>
  <div>
    <div>
      <b-form inline>
        <label class="mr-sm-2" for="inline-form-custom-select-pref">Element</label>
        <b-form-select
          id="inline-form-custom-select-pref"
          v-model="selectedElement"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="elementOptions"
          value="Mirror"
        ></b-form-select>

        <b-form-select
          id="inline-form-custom-select-pref"
          v-model="selectedRotation"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="rotationOptions"
        ></b-form-select>

        <b-form-select
          id="inline-form-custom-select-pref"
          v-model="selectedPolarization"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="polarizationOptions"
        ></b-form-select>

        <b-form-select
          id="inline-form-custom-select-pref"
          v-model="selectedStrength"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="strengthOptions"
        ></b-form-select>

        <b-button variant="primary" @click="generateOperator">Generate</b-button>
      </b-form>
    </div>
    {{ operator }}
  </div>
</template>

<script lang="ts">
import * as qt from 'quantum-tensors'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class OperatorComponent extends Vue {
  elementOptions = [
    { value: 'Void', text: 'Void' },
    { value: 'Wall', text: 'Wall' },
    { value: 'Gate', text: 'Gate' },
    { value: 'Laser', text: 'Laser' },
    { value: 'NonLinearCrystal', text: 'NonLinearCrystal' },
    { value: 'Mirror', text: 'Mirror' },
    { value: 'BeamSplitter', text: 'BeamSplitter' },
    { value: 'PolarizingBeamSplitter', text: 'PolarizingBeamSplitter' },
    { value: 'CoatedBeamSplitter', text: 'CoatedBeamSplitter' },
    { value: 'CornerCube', text: 'CornerCube' },
    { value: 'Detector', text: 'Detector' },
    { value: 'Rock', text: 'Rock' },
    { value: 'Mine', text: 'Mine' },
    { value: 'Absorber', text: 'Absorber' },
    { value: 'DetectorFour', text: 'DetectorFour' },
    { value: 'Polarizer', text: 'Polarizer' },
    { value: 'QuarterWavePlate', text: 'QuarterWavePlate' },
    { value: 'HalfWavePlate', text: 'HalfWavePlate' },
    { value: 'SugarSolution', text: 'SugarSolution' },
    { value: 'FaradayRotator', text: 'FaradayRotator' },
    { value: 'Glass', text: 'Glass' },
    { value: 'VacuumJar', text: 'VacuumJar' },
  ]

  rotationOptions = [
    { value: 0, text: '0°' },
    { value: 45, text: '45°' },
    { value: 90, text: '90°' },
    { value: 135, text: '135°' },
    { value: 180, text: '180°' },
    { value: 225, text: '225°' },
    { value: 270, text: '270°' },
    { value: 315, text: '315°' },
  ]

  polarizationOptions = [
    { value: 0, text: '0°' },
    { value: 45, text: '45°' },
    { value: 90, text: '90°' },
    { value: 135, text: '135°' },
    { value: 180, text: '180°' },
    { value: 225, text: '225°' },
    { value: 270, text: '270°' },
    { value: 315, text: '315°' },
  ]

  strengthOptions = [
    { value: 0, text: '0%' },
    { value: 25, text: '25%' },
    { value: 50, text: '50%' },
    { value: 75, text: '75%' },
    { value: 100, text: '100%' },
  ]

  selectedElement = 'Mirror'
  selectedRotation = 0
  selectedPolarization = 0
  selectedStrength = 100
  operator: string = ''

  generateOperator(): void {
    this.operator = qt.Elements.generateOperator({
      x: 0,
      y: 0,
      element: this.selectedElement,
      rotation: this.selectedRotation,
      polarization: this.selectedPolarization,
      // strength: this.selectedStrength,
    }).op.toString()
  }

  formatPercentage(value: number): string {
    return (value * 100).toFixed(2).toString() + '%'
  }
}
</script>

<style scoped lang="scss"></style>
