<template>
  <div id="app">
    <div id="navbar">
      <router-link to="/gridEdit">EDIT</router-link>
      <router-link to="/elementEdit">PREVIEW</router-link>
    </div>
    <div class="editorContainer">
      <div class="gridMaineditor">
          <div id="gridlistContainer">
              <button v-on:click="addGridLayout" id="addgrid" type="button" name="button">NEW GRID <i class="fas fa-plus"></i></button>
              <ul>
                  <li :id="index" v-on:click="layoutSelect" v-for="index in Array.from(Array(gridLayoutNum).keys())">{{index}}<button class="closeButton" :id="index" v-on:click="closeAction" type="button" name="button">X</button></li>
              </ul>
          </div>
            <router-view></router-view>
      </div>
            <GridSetting></GridSetting>
    </div>

      <div id="contextmenuId" v-bind:style="{top: contextmenuData.top + 'px', left: contextmenuData.left + 'px', visibility: contextmenuData.visible}">
          <div class="contextmenuElement" v-bind:id="i" v-on:click="contextmenuClick" v-for="i in this.$store.state.ElementIds">{{i}}</div>
      </div>
      <div id="closeComfirm" :style="{visibility: closeComfirmVisibility}">
        <div class="comfirmExplanation">
          DELETE grid {{closeLayout}} ?
        </div>
        <button v-on:click="DeleteGrid" class="closeComfirmButtonDelete" type="button" name="button">DELETE</button>
        <button v-on:click="CancelDelete" class="closeComfirmButtonCancel" type="button" name="button">CANCEL</button>
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
      gridLayoutNum: 0,
      activeLayout: 0,
      closeLayout: 0,
      closeComfirmVisibility: "hidden"
    }
  },
  methods:{
  DeleteGrid(e){
    this.gridLayoutNum -= 1
    this.$store.commit("removeGridLayout", this.closeLayout)
    this.closeComfirmVisibility = "hidden"
  },
  CancelDelete(e){
    this.closeComfirmVisibility = "hidden"
  },
  layoutSelect(e){
    console.log(e.target.id)
    this.activeLayout = e.target.id
    this.$store.commit("changeActiveLayout", e.target.id)
  },
  closeAction(e){

    this.closeComfirmVisibility = "visible"
    this.closeLayout = e.target.id

  },
  addGridLayout(e){
    console.log(this.gridLayoutNum)
    this.$store.commit("addGridLayout")
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

.comfirmExplanation{
  padding: 60px 0px;
  font-size: 20px;
  color: white;
}

.closeComfirmButtonDelete{
  position: absolute;
  font-size: 20px;
  bottom: 10px;
  left: 10px;
  background: transparent;
  border: 1px solid white;
  color: white;
}

.closeComfirmButtonCancel{
  position: absolute;
  font-size: 20px;
  bottom: 10px;
  background: transparent;
  border: 1px solid white;
  color: white;
}

#closeComfirm{
  height: 200px;
  width: 200px;
  background: green;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

body{
  margin: 0px;
}

#gridlistContainer{
  display: flex;
  justify-content: center;
}

#navbar{
  background: green;
}

a{
  text-decoration: none;
  color: white;
  padding: 0px 20px;
}

.closeButton{
  padding: 5px;
  background: transparent;
  border: none;
  font-size: 10px;
  margin-left: 10px;
  outline: none;
}

.closeButton:hover{
  color: white;
}

li{
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
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
  padding: 0px;
  font-size: 20px;
  border: none;
  margin-right: 20px;
  outline: none;
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
  width: 200px;
  border: 1px solid black;
}


</style>
