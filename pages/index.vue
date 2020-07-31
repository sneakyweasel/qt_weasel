<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <b-jumbotron header="QT Weasel" lead="Slim simulation for quantum-tensors">
          <b-btn
            variant="primary"
            href="https://github.com/Quantum-Game/quantum-tensors/tree/gluecode/src"
          >See code</b-btn>
        </b-jumbotron>
      </b-col>
      <b-col>
        <img src="~/assets/peeking_weasel.svg" height="300px" />
      </b-col>
    </b-row>

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
        <h1>
          Operators
          <small>({{ sim.operators.length }})</small>
        </h1>
        <p>Convert cells into operators, display non one values.</p>
        <b-table striped hover :items="sim.operators"></b-table>
      </b-col>
    </b-row>

    <hr />
    <b-row>
      <b-col>
        <h1>
          Global Operators
          <small>({{ sim.globalOperator.entries.length }})</small>
        </h1>
        <p>Merge operators into a global operator</p>
        {{ sim.globalOperator.entries.length }} entries
        <br />
        {{ sim.globalOperator.entries[0] }}
      </b-col>
    </b-row>

    <hr />
    <b-row>
      <b-col>
        <h1>Fire laz0rs!</h1>
        <ul>
          <li>Convert laser cell to an IIndicator.</li>
        </ul>
        <b-table striped hover :items="[laserIndicator]"></b-table>
      </b-col>
    </b-row>

    <hr />
    <b-row>
      <b-col>
        <h1>
          Frames
          <small>({{ sim.frames.length }})</small>
        </h1>
        <div v-for="(frame, index) in sim.frames" :key="'frame' + index">
          <FrameComponent :frame="frame" :index="index" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import * as qt from 'quantum-tensors'
import { Component, Vue } from 'vue-property-decorator'
import FrameComponent from '@/components/Frame.vue'
@Component({
  components: { FrameComponent },
})
export default class SimulationPage extends Vue {
  grid1 = {
    cols: 15,
    rows: 15,
    cells: [
      {
        coord: {
          y: 1,
          x: 1,
        },
        element: 'Laser',
        rotation: 0,
        polarization: 0,
      },
      {
        coord: {
          y: 1,
          x: 3,
        },
        element: 'Mirror',
        rotation: 135,
        polarization: 0,
      },
      {
        coord: {
          y: 3,
          x: 3,
        },
        element: 'Detector',
        rotation: 180,
        polarization: 0,
      },
    ],
  }

  sim = new qt.Simulation(this.grid1)
  laserIndicator = this.sim.initializeFromLaser()
  initFrame = this.sim.lastFrame
  test = this.sim.generateFrames()
}
</script>

<style scoped lang="scss"></style>
