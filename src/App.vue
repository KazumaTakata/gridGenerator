<template>
  <div id="app">
    <div id="navbar">
      <router-link to="/gridEdit">Go to main</router-link>
      <router-link to="/elementEdit">Go to Bar</router-link>
    </div>
    <div  class="editorContainer">
      <div class="gridMaineditor">
          <div class="">
              <button v-on:click="addGridLayout" id="addgrid" type="button" name="button">NEW GRID</button>
              <ul>
                  <li v-for="index in Array.from(Array(gridLayoutNum).keys())">{{index}}<button class="closeButton" :id="index" v-on:click="closeAction" type="button" name="button">X</button></li>
              </ul>
          </div>
            <router-view></router-view>
      </div>
            <GridSetting></GridSetting>
    </div>

      <div id="contextmenuId" v-bind:style="{top: contextmenuData.top + 'px', left: contextmenuData.left + 'px', visibility: contextmenuData.visible}">
          <div class="contextmenuElement" v-bind:id="i" v-on:click="contextmenuClick" v-for="i in this.$store.state.ElementIds">{{i}}</div>
      </div>
  </div>

</template>

<script>
import Vue from "vue"
import GridMain from "./gridLayoutMain.vue"
import GridSetting from "./GridSetting.vue"

// ofje

export default {
  name: 'app',
  components:{
    GridMain,
    GridSetting
  },
  data () {
    return {
      NumberOfColumn: "",
      HeightOfRow: "",
      NumberOfRow: "",
      addElementId: "",
      contextmenuData: {top: "", left: "", visible: "hidden"},
      activeXY: {x:"", y:""},
      gridLayoutNum: 0
    }
  },
  methods:{
  closeAction(e){
    this.gridLayoutNum -= 1
  },
  addGridLayout(e){
    console.log(this.gridLayoutNum)
    this.gridLayoutNum += 1
  },
  contextmenuClick(e){
      e.stopPropagation()
      this.contextmenuData.visible = "hidden"
      console.log(e.target.id)
      this.selectCell(this.activeXY.y, this.activeXY.x, e.target.id)
      this.$store.commit("changeGridAreas", {row:this.activeXY.y, col: this.activeXY.x, newValue: e.target.id})
      this.$store.commit("changeGridTemplateAreas", this.gridMapCal(this.$store.state.gridAreas))
    }
  }
}
</script>

<style>
.closeButton{
  padding: 5px;
  background: transparent;
  border: none;
  font-size: 12px;
}

.closeButton:hover{
  color: white;
}

li{
  display: inline-block;
  padding: 10px;
}
li:hover{
  background: orange;
  color: white;
}
ul{
  padding: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#addgrid{
  padding: 30px;
  border-radius: 4px;
}

#contextmenuId{
  position: absolute;
  border: 1px solid black;
  padding: 10px;
}

.contextmenuElement{

}

.Window{

  display: grid;
}

.box{
  background: transparent;
  border: 1px solid black;
}

.gridMaineditor{
  border: 1px solid black;
  width: 80%;
  height: 100vh;
  overflow: scroll;
}

.editorContainer{
  display: flex;
}

.editorSetting{
  width: 20%;
  border: 1px solid black;
}


</style>
