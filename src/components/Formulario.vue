<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulario para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
      </div>

      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "Formulario-Nome",
  emits: ["infoTarefa"],

  components: {
    Temporizador,
  },
  data() {
    return {
      descricao: ""
      // dataInicial: new Date(),
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit("infoTarefa", {
        duracaoEmSegundo: tempoDecorrido,
        descricao: this.descricao,
      });
      this.descricao = "";
    },
  },
  setup() {
    //setup serve para buscar os dados da Store. Passando uma key e retornando computed!
    const store = useStore(key)
    return {
      projetos: computed(() => store.state.projetos)
    }
  }
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
