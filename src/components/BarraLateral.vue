<template>
   <header>
    <h1>
        <img src="../assets/logo.png" alt="Logo do Vue: Ela é a letra V com dentro de um círculo">
    </h1>
   </header>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:'BarraLateral'
});
</script>

<style scoped>
/* fica todo o stilo do componente */
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
/* mobile */
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

</style>

