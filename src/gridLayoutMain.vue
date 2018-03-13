<template lang="html">
  <div class="breakPointBar">
    <div id="tickBar" v-on:dblclick="createNewTick"   v-on:mousemove="handleTickMousemove" v-on:mouseup="handleTickMouseUp" >
      <div v-bind:id="index" :style="{left: xValue + 'px'}" v-on:mousedown="handleTickMousedown" v-for="(xValue, index) in this.$store.state.tickXValue"  class="tick">
      </div>
    </div>

  <div class="handleBar" :style="handleBarStyle" v-on:mousemove="HandleMouseMove" v-on:mouseup="HandleMouseUp">
  <div class="Window" v-bind:style="this.$store.state.gridStyle">
    <template v-for="(i, index) in getArea">
      <div v-bind:id="index" v-on:mouseup="DragStop" v-on:mousemove="DragMove" v-on:mousedown="DragStart" v-on:contextmenu="GridClick" class="box">{{i}}</div>
    </template>
    <div id="contextmenuId" v-bind:style="{top: contextmenuData.top + 'px', left: contextmenuData.left + 'px', visibility: contextmenuData.visible}">
        <div class="contextmenuElement" v-bind:id="i" v-on:click="contextmenuClick" v-for="i in this.$store.state.ElementIds">{{i}}</div>
    </div>
  </div>
  <div v-on:mousedown="rightHandleMouseDown" class="rightHangle"></div>
  <div v-on:mousedown="bottomHandleMouseDown" class="bottomHangle"></div>
  </div>
  </div>
</template>

<script>
import Vue from "vue"
export default {

  data () {
    return {
      addElementId: "",
      ElementIds: [],
      contextmenuData: {top: "", left: "", visible: "hidden"},
      activeXY: {x:"", y:""},
      gridAreas: "",
      dragState: {
        ids: [],
        on: "",
        ElementKind: ""
      },
      Valid: "",
      handleEvent:{
        RightOrBottom: "",
        active: false,
        prevX: 0,
        prevY: 0
      },
      handleTickEvent:{
        active: false,
        prevX: 0,
        left: 0,
        activeId: ""
      },
      tickXValue:[]
    }
  },
  computed: {
    getArea: function(){
      let newArr = [];
      for(var i = 0; i < this.$store.state.gridAreas.length; i++)
      {
          newArr = newArr.concat(this.$store.state.gridAreas[i])
      }
      return newArr
    },
    handleBarStyle: function(){
      let mainHeight = this.$store.state.gridStyle.height
      let mainWidth = this.$store.state.gridStyle.width

      let styleObj = {
        display: "grid",
        gridTemplateColumns: mainWidth + " 10px" ,
        gridTemplateRows: mainHeight + " 10px"
      }
      return styleObj
      }
  },
  methods: {
    createNewTick(e){
      console.log("double click")
      this.tickXValue.push(e.clientX)
      this.$store.commit("createNewTick", e.clientX)
    },
    handleTickMouseUp(e){
      this.handleTickEvent.active = false
    },
    handleTickMousedown(e){
      console.log("tick mouse down")
      this.handleTickEvent.prevX = e.clientX,
      this.handleTickEvent.active = true
      this.handleTickEvent.activeId = e.target.id
    },
    handleTickMousemove(e){
      if(this.handleTickEvent.active){
        console.log("tick mouse move")
        let diffX = e.clientX - this.handleTickEvent.prevX
        let obj = {
          id: this.handleTickEvent.activeId,
          diffX
        }
        // this.tickXValue[e.id] = this.tickXValue[e.id] + diffX
        this.$store.commit("moveTick", obj)
        // Vue.set(this.$store.state.tickXValue, this.handleTickEvent.activeId, this.$store.state.tickXValue[this.handleTickEvent.activeId] + diffX)

        this.handleTickEvent.prevX = e.clientX
      }
    },
    HandleMouseMove(e){
      if(this.handleEvent.active){
        console.log("right handle move")
        let currentX = e.clientX
        let currentY = e.clientY

        if (this.handleEvent.RightOrBottom == "Right"){

          let diffX = currentX - this.handleEvent.prevX
          // let diffY = currentY - this.handleEvent.prevY
          // this.$store.state.gridStyle.width = Number(this.$store.state.gridStyle.width.split("px")[0]) + diffX + "px"
          this.$store.commit("changeGridWidth",Number(this.$store.state.gridStyle.width.split("px")[0]) + diffX + "px")
          console.log(this.$store.state.gridStyle.width)
          this.handleEvent.prevX = currentX

        }else{
          let diffY = currentY - this.handleEvent.prevY
          console.log()
          // let diffY = currentY - this.handleEvent.prevY
          // this.$store.state.gridStyle.width = Number(this.$store.state.gridStyle.width.split("px")[0]) + diffX + "px"
          this.$store.commit("changeGridHeight",Number(this.$store.state.gridStyle.height.split("px")[0]) + diffY + "px")
          console.log(this.$store.state.gridStyle.height)
          this.handleEvent.prevY = currentY
        }
      }
    },
    rightHandleMouseDown(e){
      console.log("right handle down")
      this.handleEvent.active = true
      this.handleEvent.prevX = e.clientX
      this.handleEvent.RightOrBottom = "Right"
    },
    bottomHandleMouseDown(e){
      console.log("right handle down")
      this.handleEvent.active = true
      this.handleEvent.prevY = e.clientY
      this.handleEvent.RightOrBottom = "Bottom"
    },
    HandleMouseUp(e){
      console.log("right handle Up")
      this.handleEvent.active = false
    },
    gridMapCal(d){
        return d.map( (area) => "'" + area.join(' ') + "'" ).join(" ")
    },
    contextmenuClick(e){
      e.stopPropagation()
      this.contextmenuData.visible = "hidden"
      console.log(e.target.id)
      // this.gridAreas[this.activeXY.y][this.activeXY.x] = e.target.id
      // Vue.set(this.gridAreas, [this.activeXY.y, this.activeXY.x], e.target.id)
      this.selectCell(this.activeXY.y, this.activeXY.x, e.target.id)
      this.$store.commit("changeGridAreas", {row:this.activeXY.y, col: this.activeXY.x, newValue: e.target.id})
      // this.gridStyle.gridTemplateAreas = this.gridMapCal(this.$store.state.gridAreas)
      this.$store.commit("changeGridTemplateAreas", this.gridMapCal(this.$store.state.gridAreas))
    },
    difffind(arr){
      let diffList = []
      let prevValue = ""
      for(let i= 0; i<arr.length; i++){
        if(arr[i] != prevValue){
          diffList.push([i,arr[i]])
          prevValue = arr[i]
        }
      }
      return diffList
    },
    validateGridArea(){
      let Valid = true
      console.log("area")
      for (let i=0; i<this.$store.state.gridAreas.length-1; i++){
      let prevDiffList = this.difffind(this.$store.state.gridAreas[i])
      let DiffList = this.difffind(this.$store.state.gridAreas[i+1])
      for(let j=0; j<DiffList.length; j++){
      if (Valid){
        let startIdx = DiffList[j][0]
        let endIdx = null
        if (j+1 != DiffList.length){
          endIdx = DiffList[j+1][0]
        }else{
          endIdx = this.$store.state.gridAreas[i].length
        }
        let elementKind = DiffList[j][1]
        let containeSame = false
        let allSame = true
        if(elementKind != "."){
        for(let k=startIdx; k<endIdx; k++){
          if(this.$store.state.gridAreas[i][k] == elementKind){
            containeSame = true
          }else{
            allSame= false
          }
        }
        if (containeSame && !allSame){
          Valid = false
        }
        if (containeSame && allSame){
          if (this.$store.state.gridAreas[i][startIdx-1] != elementKind && this.$store.state.gridAreas[i][endIdx] != elementKind){
          }else{
            Valid = false
          }
        }
        }
      }
    }
    }
    this.Valid = Valid
    return Valid
    },
    DragStart(e){

      if(!e.ctrlKey){
      console.log("DragStart")
      this.dragState.on = true
      this.dragState.ElementKind = e.target.innerText
      }
    },
    DragMove(e){
      if(this.dragState.on){
        console.log("moving")
        if(!this.dragState.ids.includes(e.target.id)){
          this.dragState.ids.push(e.target.id)
        }
      }
    },
    DragStop(e){
      console.log("stop")
      let tmpState = this.$store.state.gridAreas.map(function(arr) {
    return arr.slice();})
      for(let i=0; i<this.dragState.ids.length; i++){
          let rowNum = Math.floor(this.dragState.ids[i]/this.$store.state.NumberOfColumn)
          let columnNum = this.dragState.ids[i] % this.$store.state.NumberOfColumn
          this.selectCell(rowNum, columnNum, this.dragState.ElementKind)
          this.$store.commit("changeGridAreas", {row: rowNum, col:columnNum, newValue: this.dragState.ElementKind})
      }
      this.$store.commit("changeGridTemplateAreas", this.gridMapCal(this.$store.state.gridAreas))
      this.dragState.ids = []
      this.dragState.on = false
      let valid = this.validateGridArea()
      if( !valid ){
        Vue.toast('InValid GridLayout', {horizontalPosition: 'center',
                  verticalPosition: 'center',
                  duration: 3000,})
        this.$store.state.gridAreas = tmpState
        this.$store.commit("changeAll", tmpState)
        this.$store.commit("changeGridTemplateAreas", this.gridMapCal(this.$store.state.gridAreas))
      }
    },
    GridClick(e){
      e.preventDefault();
      console.log("right click")
      this.contextmenuData.top = e.clientY
      this.contextmenuData.left = e.clientX
      this.contextmenuData.visible = "visible"
      let rowNum = Math.floor(e.target.id/this.$store.state.NumberOfColumn)
      let columnNum = e.target.id % this.$store.state.NumberOfColumn
      this.activeXY.x = columnNum
      this.activeXY.y = rowNum
    },
    selectCell(row, col, newValue) {
      const newRow = this.$store.state.gridAreas[row].slice(0)
      newRow[col] = newValue
      this.$set(this.$store.state.gridAreas, row, newRow)
    },
    gridStyleMethod(){
      return this.$store.state.gridStyle
    }
  }
}
</script>

<style lang="css">
.tick{
  position: absolute;
  width: 10px;
  height: 100%;
  background: green;
  top: 0px;
}
#tickBar{
  height: 20px;
  position: relative;
  border: 1px solid black;
}
.breakPointBar{
  position: relative;
  height: 100%;
  left: 50px;
  top: 50px;
}
.handleBar{
  height:100%
}
.rightHangle{
  background: green;
}
.bottomHangle{
  background: green;
}

</style>
