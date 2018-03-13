<template lang="html">
  <div class="editorSetting">
      Number of Columns
      <input v-on:change="EventNumberColumns" v-model="NumberOfColumn">
      Number of rows
      <input v-on:change="EventNumberRows" v-model="NumberOfRow">
      Height of Window
      <input v-on:change="EventHeightWindow" v-model="height">
      Width of Window
      <input v-on:change="EventWidthWindow" v-model="width">
      ADD Element
      <input v-on:change="" v-model="addElementId">
      <button v-on:click="addElement">add</button>
      <p>{{this.$store.state.gridStyle.width.split("px")[0]}}</p>
      <div v-for="(tick, index) in tickXValues" >
        <div v-on:click="decideGroup" class="breakpointGroup">
          {{index}}
        </div>
        {{tick}}
      </div>
      <div v-on:click="decideGroup" class="breakpointGroup">
        {{tickXValues.length}}
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      NumberOfColumn: "",
      NumberOfRow: "",
      HeightOfWindow: "",
      WidthOfWindow: "",
      addElementId: "",
    }
  },
  computed:{
    tickXValues: function(){
      return this.$store.state.tickXValue.sort((a, b)=>  a - b)
    },
    width:{
    get: function(){
      return this.$store.state.gridStyle.width
    },
    set: function(v){
      this.$store.state.gridStyle.width = v
    }
  },
    height:{
    get: function(){
      return this.$store.state.gridStyle.height
    },
    set: function(v){
      this.$store.state.gridStyle.height = v
    }
  }
  },
  methods:{
    decideGroup(e){
      console.log("click group")
    },
    gridMapCal(d){
        return d.map( (area) => "'" + area.join(' ') + "'" ).join(" ")
    },
    CreateArea(row, column){
      this.$store.state.gridAreas = Array(row).fill().map(() => Array(column).fill("."))
      this.$store.commit("changeGridTemplateAreas", this.gridMapCal(this.$store.state.gridAreas))
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
      this.$store.state.NumberOfColumn = this.NumberOfColumn
      this.$store.commit("changeGridTemplateColumns", this.NumFr(this.$store.state.NumberOfColumn))
      this.initArea()
    },
    EventNumberRows(){
      this.$store.state.NumberOfRow = this.NumberOfRow
      this.$store.commit("changeGridTemplateRows", this.NumFr(this.$store.state.NumberOfRow))
      this.initArea()
    },
    EventHeightWindow(){
      // this.$store.state.gridStyle.height = this.HeightOfWindow + 'px'
      // this.initArea()
    },
    EventWidthWindow(){
      // this.$store.state.gridStyle.width = this.WidthOfWindow + 'px'
      // this.initArea()

    },
    initArea(){
      if (this.NumberOfRow != "" && this.NumberOfColumn != ""){
        this.CreateArea(Number(this.$store.state.NumberOfRow), Number(this.$store.state.NumberOfColumn))
        this.$store.commit("initGridAreas", {row: Number(this.NumberOfRow), column: Number(this.NumberOfColumn)})
      }
    }
  }
}
</script>

<style lang="css">
.breakpointGroup:hover{
  background: orange;
}

</style>
