<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col cols="8">
        <b-jumbotron header="QT Weasel" lead="Slim simulation for quantum-tensors">
          <b-row>
            <b-col cols="6">
              <b-form-select
                v-model="selectedLevel"
                :options="generateLevelOptions()"
                @change="loadLevel(selectedLevel)"
              ></b-form-select>
            </b-col>
            <b-col>
              <b-btn
                variant="outline-secondary"
                href="https://github.com/Quantum-Game/quantum-tensors/tree/gluecode/src"
              >
                <b-icon-code-slash></b-icon-code-slash>
              </b-btn>
              <b-btn variant="outline-secondary" href="https://github.com/sneakyweasel/qt_weasel">
                <b-icon-code-slash></b-icon-code-slash>
              </b-btn>
            </b-col>
          </b-row>
        </b-jumbotron>
      </b-col>
      <b-col>
        <img src="~/assets/peeking_weasel.svg" height="300px" />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-breadcrumb>
          <b-breadcrumb-item href="#grid">
            <b-icon icon="grid"></b-icon>
          </b-breadcrumb-item>
          <b-breadcrumb-item href="#grid">Grid</b-breadcrumb-item>
          <b-breadcrumb-item href="#operators">Operators</b-breadcrumb-item>
          <b-breadcrumb-item href="#global-operator">Global operator</b-breadcrumb-item>
          <b-breadcrumb-item href="#lasers">Laser indicator</b-breadcrumb-item>
          <b-breadcrumb-item href="#simulation">Simulation</b-breadcrumb-item>
          <b-breadcrumb-item href="#absorptions">Absorptions</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h1 id="grid">
          Grid
          <small>
            <span class="badge badge-pill badge-secondary">{{ sim.grid.cols }}x{{ sim.grid.rows }}</span>
          </small>
        </h1>
        <p class="lead">Load grid JSON</p>
        <b-table striped hover :items="sim.grid.cells"></b-table>
        <hr />

        <h1 id="operators">
          Operators
          <small>
            <span class="badge badge-pill badge-secondary">{{ sim.operators.length }}</span>
          </small>
        </h1>
        <p class="lead">Convert grid cells into operators</p>
        <!-- <b-table striped hover :items="sim.operators"></b-table> -->
        <div v-for="(cell, index) in sim.grid.cells" :key="'operator' + index">
          <operator :cell="cell" :dark-mode="false" />
        </div>
        <hr />

        <h1 id="global-operator">
          Global Operator
          <small>
            <span class="badge badge-pill badge-secondary">{{ sim.globalOperator.entries.length }}</span>
          </small>
        </h1>
        <p class="lead">Merge operators into a global operator</p>
        {{ sim.globalOperator.entries.length }} entries
        <br />
        {{ sim.globalOperator.entries[0] }}
        <div>
          <!-- <matrix-viewer :operator-raw="sim.globalOperator" :dark-mode="false" /> -->
        </div>
        <hr />

        <h1 id="lasers">
          Photon indicator
          <small>
            <span class="badge badge-pill badge-secondary">{{ 1 }}</span>
          </small>
        </h1>
        <p class="lead">Convert laser cell to an IIndicator and generate first frame.</p>
        <b-table striped hover :items="[laserIndicator]"></b-table>
        <hr />

        <h1 id="simulation">
          Simulation
          <small>
            <span class="badge badge-pill badge-secondary">{{ sim.frames.length }}</span>
          </small>
        </h1>
        <div v-for="(frame, index) in sim.frames" :key="'frame' + index">
          <FrameComponent :frame="frame" :index="index" />
        </div>
        <hr />

        <h1 id="absorptions">
          Absorptions
          <small>({{ absorptions.length }})</small>
        </h1>
        <b-table striped hover :items="absorptions"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import * as qt from 'quantum-tensors'
import { Component, Vue } from 'vue-property-decorator'
import FrameComponent from '@/components/Frame.vue'
import Operator from '@/components/Operator.vue'
import OperatorComponent from '@/components/OperatorComponent.vue'
import levels from '@/assets/levels.json'
import { MatrixViewer } from 'bra-ket-vue'
// import { IGrid } from 'quantum-tensors/dist/interfaces'

export interface IGrid {
  cols: number
  rows: number
  cells: ICell[]
}

export interface ICell {
  x: number
  y: number
  element: string
  rotation: number
  polarization: number
  strength?: number
}

@Component({
  components: { FrameComponent, Operator, OperatorComponent, MatrixViewer },
})
export default class SimulationPage extends Vue {
  selectedLevel = 1
  grid = this.convertLevel(this.selectedLevel)
  sim = new qt.Simulation(this.grid)
  laserIndicator = this.sim.generateLaserIndicator()
  initFrame = this.sim.initializeFromIndicator(this.laserIndicator)
  test = this.sim.generateFrames()
  absorptions = this.sim.totalAbsorptionPerTile

  generateLevelOptions() {
    return levels.map((level: any) => {
      return { value: level.id, text: `${level.name} (${level.id})` }
    })
  }

  convertLevel(id: number): IGrid {
    id -= 1
    return levels[id].grid
  }

  loadLevel(id: number): void {
    this.grid = this.convertLevel(id)
    this.sim = new qt.Simulation(this.grid)
    this.laserIndicator = this.sim.generateLaserIndicator()
    this.initFrame = this.sim.initializeFromIndicator(this.laserIndicator)
    this.sim.generateFrames()
    this.absorptions = this.sim.totalAbsorptionPerTile
  }
}
</script>

<style scoped>
h3 {
  text-transform: uppercase;
  padding-top: 50px;
}
a {
  color: #424ab9;
}
</style>
