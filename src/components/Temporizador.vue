<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos" />

    <button class="button" @click="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>

    <Botao acao="play" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";

export default defineComponent({
  name: "Temporizador-n",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    Cronometro,
    Botao
},
  data() {
    // estado incial, na vdd um método que retorna um objeto
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },

  methods: {
    iniciar() {
      //começar a contagem
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++;
        // console.log(this.tempoEmSegundos);
      }, 1000);
      console.log("Iniciou");
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      console.log(this.tempoEmSegundos);

      this.tempoEmSegundos = 0;
    },
  },
});
</script>

<style></style>
