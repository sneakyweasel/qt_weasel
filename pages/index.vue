<template>
  <b-container class="bv-example-row">
    <b-jumbotron header="QT Weasel" lead="Slim simulation for quantum-tensors">
      <p></p>
      <b-btn
        variant="primary"
        href="https://github.com/Quantum-Game/quantum-tensors/tree/gluecode/src"
      >See code</b-btn>
    </b-jumbotron>

    <b-row>
      <b-col>
        <h1>
          Grid
          <small>(X: {{ sim.grid.cols }} - Y: {{ sim.grid.rows }})</small>
        </h1>
        <p>Load IGrid object in JSON</p>
        <b-table striped hover :items="sim.grid.cells"></b-table>
      </b-col>
    </b-row>

    <hr />
    <b-row>
      <b-col>
        <h1>Operators</h1>
        <p>Convert cells into operators</p>
        <b-table striped hover :items="sim.operators"></b-table>
      </b-col>
    </b-row>

    <hr />
    <b-row>
      <b-col>
        <h1>Global Operators</h1>
        <p>Merge operators into a global operator</p>
        {{ sim.globalOperator }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import * as qt from 'quantum-tensors'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class SimulationPage extends Vue {
  grid1 = {
    cols: 13,
    rows: 10,
    cells: [
      {
        coord: {
          y: 2,
          x: 3,
        },
        element: 'Laser',
        rotation: 0,
        polarization: 0,
      },
      {
        coord: {
          y: 2,
          x: 9,
        },
        element: 'Detector',
        rotation: 180,
        polarization: 0,
      },
    ],
  }

  sim = new qt.Simulation(this.grid1)

  operators = this.sim.operators
}
</script>

<style scoped lang="scss"></style>
