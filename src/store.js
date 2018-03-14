import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeLayout: 0,
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
              },
    gridLayout:[]
  },
  mutations: {
    changeActiveLayout(state, id){
      state.activeLayout = id
    },
    addGridLayout(state){
      state.gridLayout.push({minX: "",
                             maxX: "",
                             NumberOfColumn:"",
                             NumberOfRow: "",
                             gridAreas: "",
                             group: "",
                             gridStyle:{
                               gridTemplateColumns: "",
                               gridTemplateRows: "",
                               gridTemplateAreas: "",
                               height: "",
                               width: ""
                             }
      })
    },
    removeGridLayout(state, idx){
      state.gridLayout.splice(idx, 1);
    },
    changeGridAreas(state, obj) {
        let row = obj.row
        let col = obj.col
        let newValue = obj.newValue
        const newRow = state.gridLayout[state.activeLayout].gridAreas[row].slice(0)
        newRow[col] = newValue
        Vue.set(state.gridLayout[state.activeLayout].gridAreas, row, newRow)
      },
    initGridAreas(state, obj){
      let row = obj.row
      let column = obj.column
      state.gridLayout[state.activeLayout].gridAreas = Array(row).fill().map(() => Array(column).fill("."))
    },
    changeAll(state, gridArea){
      // state.gridAreas = gridArea
      state.gridLayout[state.activeLayout].gridAreas = gridArea
    },
    addElement(state, elementId){
      state.ElementIds.push(elementId)
    },
    changeGridTemplateAreas(state, gridarea){
      state.gridLayout[state.activeLayout].gridStyle.gridTemplateAreas = gridarea
    },
    changeGridTemplateColumns(state, gridcolumns){
      state.gridLayout[state.activeLayout].gridStyle.gridTemplateColumns = gridcolumns
    },
    changeGridTemplateRows(state, gridrows){
      state.gridLayout[state.activeLayout].gridStyle.gridTemplateRows = gridrows
    },
    changeGridWidth(state, width){
      state.gridLayout[state.activeLayout].gridStyle.width = width
    },
    changeGridHeight(state, height){
      state.gridLayout[state.activeLayout].gridStyle.height = height
    },
    createNewTick(state, Xvalue){
      state.tickXValue.push(Xvalue)
    },
    moveTick(state, obj){
      Vue.set(state.tickXValue, obj.id, state.tickXValue[obj.id] + obj.diffX)
    },
    decideGroup(state, group){
      state.gridLayout[state.activeLayout].group = group
    }
    }
  }
)

export default store
