<template lang="html">
  <div class="Window" v-bind:style="gridStyleMethod">
    <div class="element"  v-bind:style="{gridArea: i}" v-for="(i, index) in this.$store.state.ElementIds">
        {{i}}
    </div>
  </div>
</template>

<script>
export default {


  computed:{
    gridStyleMethod: function(){
      return this.$store.state.gridStyle
    }
  }
}
</script>

<style lang="css">
.element:hover{
  background: pink;
}
</style>
