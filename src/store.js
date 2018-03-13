import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    NumberOfColumn:"",
    NumberOfRow:"",
    ElementIds: [],
    tickXValue:[],
    gridAreas: "",
    gridStyle:{ gridTemplateColumns: "",
                gridTemplateRows: "",
                gridTemplateAreas: "",
                height: "",
                width: ""
              }
  },
  mutations: {
    changeGridAreas(state, obj) {
        let row = obj.row
        let col = obj.col
        let newValue = obj.newValue

        const newRow = state.gridAreas[row].slice(0)
        newRow[col] = newValue
        Vue.set(state.gridAreas, row, newRow)
        // state.gridAreas[row][col] = newValue
      },
    initGridAreas(state, obj){
      let row = obj.row
      let column = obj.column
      state.gridAreas = Array(row).fill().map(() => Array(column).fill("."))
      // state.gridStyle.gridTemplateAreas = this.gridMapCal(this.gridAreas);
    },
    changeAll(state, gridArea){
      state.gridAreas = gridArea
    },
    addElement(state, elementId){
      state.ElementIds.push(elementId)
    },
    changeGridTemplateAreas(state, gridarea){
      state.gridStyle.gridTemplateAreas = gridarea
    },
    changeGridTemplateColumns(state, gridcolumns){
      state.gridStyle.gridTemplateColumns = gridcolumns
    },
    changeGridTemplateRows(state, gridrows){
      state.gridStyle.gridTemplateRows = gridrows
    },
    changeGridWidth(state, width){
      state.gridStyle.width = width
    },
    changeGridHeight(state, height){
      state.gridStyle.height = height
    },
    createNewTick(state, Xvalue){
      state.tickXValue.push(Xvalue)
    },
    moveTick(state, obj){
      Vue.set(state.tickXValue, obj.id, state.tickXValue[obj.id] + obj.diffX)
    }
    }
  }
)

export default store
