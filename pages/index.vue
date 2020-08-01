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
          <small>({{ sim.grid.cols }}x{{ sim.grid.rows }})</small>
        </h1>
        <p class="lead">Load IGrid object in JSON</p>
        <b-table striped hover :items="sim.grid.cells"></b-table>
        <hr />

        <h1 id="operators">
          Operators
          <small>({{ sim.operators.length }})</small>
        </h1>
        <p class="lead">Convert cells into operators</p>
        <b-table striped hover :items="sim.operators"></b-table>
        <hr />

        <h1 id="global-operator">
          Global Operator
          <small>({{ sim.globalOperator.entries.length }})</small>
        </h1>
        <p class="lead">Merge operators into a global operator</p>
        {{ sim.globalOperator.entries.length }} entries
        <br />
        {{ sim.globalOperator.entries[0] }}
        <hr />

        <h1 id="lasers">Fire laz0rs!</h1>
        <p class="lead">Convert laser cell to an IIndicator and generate first frame.</p>
        <b-table striped hover :items="[laserIndicator]"></b-table>
        <hr />

        <h1 id="simulation">
          Simulation
          <small>({{ sim.frames.length }})</small>
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
import levels from '@/assets/levels.json'
import { IGrid } from 'quantum-tensors/dist/interfaces'

@Component({
  components: { FrameComponent },
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
    return levels[id - 1].grid
  }

  loadLevel(id: number): void {
    const grid = this.convertLevel(id)
    this.sim = new qt.Simulation(grid)
    this.laserIndicator = this.sim.generateLaserIndicator()
    this.initFrame = this.sim.initializeFromIndicator(this.laserIndicator)
    this.sim.generateFrames()
    this.absorptions = this.sim.totalAbsorptionPerTile
  }
}
</script>

<style scoped lang="scss"></style>
