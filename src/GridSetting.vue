<template lang="html">
  <div class="editorSetting">
      <div class="">
      Number of Columns
      </div>
      <input  v-model="NumberOfColumn">
      <div class="">
      Number of rows
      </div>
      <input v-on:change="EventNumberRows" v-model="NumberOfRow">
      <div>
      Height of Window
      </div>
      <input  v-model="height">
      <div>
      Width of Window
      </div>
      <input  v-model="width">
      <div>
      ADD Element
      </div>
      <input v-on:change="" v-model="addElementId">
      <button class="addElement" v-on:click="addElement">add</button>
      <div>
        Added  Element
        <ul>
          <li v-for="el in this.$store.state.ElementIds">{{el}}</li>
        </ul>
      </div>


      <!-- <p>{{this.$store.state.gridStyle.width.split("px")[0]}}</p> -->
      <div class="">
        BreakPoint Groups
      </div>
      <div v-for="(tick, index) in tickXValues" >
        <div v-on:click="decideGroup" class="breakpointGroup">
          {{index}}
        </div>
        {{tick}}
      </div>
      <div v-on:click="decideGroup" class="breakpointGroup">
        {{tickXValues.length}}
      </div>
      <div class="">
        this Grid belong to group {{displayGroup}}
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      addElementId: "",
      minValue: "",
      maxValue: ""

    }
  },
  computed:{
    displayGroup: function(){
      if (this.$store.state.gridLayout[this.$store.state.activeLayout]){
      return this.$store.state.gridLayout[this.$store.state.activeLayout].group
    }else{
      return "No"
    }
    },
    tickXValues: function(){
      return this.$store.state.tickXValue.sort((a, b)=>  a - b)
    },
    NumberOfColumn:{
     get: function(){
       if (typeof this.$store.state.gridLayout[this.$store.state.activeLayout] != "undefined"){
        return this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfColumn
       }
     },
     set: function(v){
       this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfColumn = v

       this.$store.commit("changeGridTemplateColumns", this.NumFr( v ) )
       this.initArea()

     }
    },
    NumberOfRow:{
     get: function(){
       if (typeof this.$store.state.gridLayout[this.$store.state.activeLayout] != "undefined"){
         return this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfRow
      }
     },
     set: function(v){
       this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfRow = v

       this.$store.commit("changeGridTemplateRows", this.NumFr( v ) )
       this.initArea()
     }
    },
    width:{
    get: function(){
      if (typeof this.$store.state.gridLayout[this.$store.state.activeLayout] != "undefined"){
        return this.$store.state.gridLayout[this.$store.state.activeLayout].gridStyle.width
      }
    },
    set: function(v){
      // this.$store.state.gridStyle.width = v
      this.$store.state.gridLayout[this.$store.state.activeLayout].gridStyle.width = v
    }
  },
    height:{
    get: function(){
      if (typeof this.$store.state.gridLayout[this.$store.state.activeLayout] != "undefined"){
        return this.$store.state.gridLayout[this.$store.state.activeLayout].gridStyle.height
      }
    },
    set: function(v){
      // this.$store.state.gridStyle.height = v
      this.$store.state.gridLayout[this.$store.state.activeLayout].gridStyle.height = v
    }
  }
  },
  methods:{
    decideGroup(e){
      console.log("click group")
      this.$store.commit("decideGroup", e.target.innerText)
      this.maxValue = this.tickXValues[e.target.innerText]
      this.minValue = this.tickXValues[e.target.innerText - 1]
      this.$store.state.gridLayout[this.$store.state.activeLayout].minX = this.minValue
      this.$store.state.gridLayout[this.$store.state.activeLayout].maxX = this.maxValue

      if (typeof this.maxValue != "undefined" && typeof this.minValue != "undefined"){
        this.$store.state.gridLayout[this.$store.state.activeLayout].gridStyle.width = (this.maxValue + this.minValue)/2 + "px"
      }
      if (typeof this.maxValue != "undefined" && typeof this.minValue == "undefined"){
        this.$store.state.gridLayout[this.$store.state.activeLayout].gridStyle.width = this.maxValue + "px"
      }
      if (typeof this.maxValue == "undefined" && typeof this.minValue != "undefined"){
        this.$store.state.gridLayout[this.$store.state.activeLayout].gridStyle.width = this.minValue + "px"
      }
    },
    gridMapCal(d){
        return d.map( (area) => "'" + area.join(' ') + "'" ).join(" ")
    },
    CreateAreaWithId(row, column){
      this.$store.state.gridLayout[this.$store.state.activeLayout].gridAreas = Array(row).fill().map(() => Array(column).fill("."))
      this.$store.commit("changeGridTemplateAreas", this.gridMapCal(this.$store.state.gridLayout[this.$store.state.activeLayout].gridAreas))
    },
    NumFr(n){
      let styleStr = ""
      for (let i=0; i<n; i++){
        styleStr += "1fr "
      }
      return styleStr
    },
    addElement(e){
       this.$store.commit("addElement", this.addElementId)
       this.addElementId = ""
     },
    EventNumberColumns(){

      this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfColumn = this.NumberOfColumn
      this.$store.commit("changeGridTemplateColumns", this.NumFr( this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfColumn ) )
      this.initArea()
    },
    EventNumberRows(){

      this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfRow = this.NumberOfRow
      this.$store.commit("changeGridTemplateRows", this.NumFr( this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfRow ) )
      this.initArea()
    },
    initArea(){
      let row = this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfRow
      let column = this.$store.state.gridLayout[this.$store.state.activeLayout].NumberOfColumn
      if (row != "" && column != ""){

        this.CreateAreaWithId(Number(row), Number(column))
        this.$store.commit("initGridAreas", {row: Number(row), column: Number(column)})
      }
    }
  }
}
</script>

<style lang="css">
.breakpointGroup:hover{
  background: orange;
}


input{
  margin-top: 10px;
}

.addElement{
  margin-top: 10px;
  padding: 10px;
  border: 1px solid black;
  font-size: 20px;
}

</style>
