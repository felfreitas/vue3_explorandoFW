<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />

    <!-- <button class="button" @click="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button> -->
    <!-- <button class="button" @click="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button> -->

    <Botao
      @clicado="iniciar"
      icone="fas fa-play"
      acao="play"
      :desabilitado="cronometroRodando"
    />
    <Botao
      @clicado="pausar"
      icone="fas fa-pause"
      acao="pausa"
      :desabilitado="!cronometroRodando"
    />
    <Botao
      @clicado="finalizar"
      icone="fas fa-stop"
      acao="stop"
      :desabilitado="!cronometroRodando"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";

export default defineComponent({
  name: "Temporizador-Nome",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    Cronometro,
    Botao,
  },
  data() {
    // estado incial, na vdd um método que retorna um objeto
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      tempoPause: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciar() {
      //começar a contagem
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++;
      }, 1000);
    },
    pausar() {
      //quando pausar, preciso apenas parar o tempo. Ao apertar o play retomar do tempo que parou
      this.tempoPause = this.tempoEmSegundos;
      clearInterval(this.cronometro);
      this.tempoEmSegundos = this.tempoPause;
      this.cronometroRodando = false;
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);

      this.tempoEmSegundos = 0;
    },
  },
});
</script>

<style></style>
