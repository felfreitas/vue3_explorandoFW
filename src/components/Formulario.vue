<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulario para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
     
      </div>

      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario-n",
  components: {
    Temporizador,
  },
  data(){
    return{
        descricao: '',
        dataInicial: new Date()
    }
  },
  methods:{
    finalizarTarefa(tempoDecorrido: number) : void{
        console.log("tempo foi: " + tempoDecorrido + " Descrição da tarefa: "+this.descricao + " Data inicial: "+ this.dataInicial);
        this.descricao='';

        
    }
  }
});
</script>

<style>


</style>
