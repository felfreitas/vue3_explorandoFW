<template>
  <main class="columns is-gapless is-multine">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter">
      <Formulario @infoFormulario="salvarTarefa"/>
      <div class="lista">
        <Tarefa />
        <Tarefa />
        <Tarefa />
        <Tarefa />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Formulario from "./components/Formulario.vue";
import Tarefa from "./components/Tarefa.vue";
import ITarefa from "./interfaces/ITarefa.ts";

export default defineComponent({
  name: "App",
  components: { BarraLateral, Formulario, Tarefa },
  data() {
    return {
      tarefas: [] as ITarefa[]
    }
  },
  methods:{
    salvarTarefa(dados:any) : void{
      console.log(dados);
      
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
