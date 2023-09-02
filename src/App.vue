<template>
  <!-- utlizamos os dois pontos paara ir codigo JS, primeiro colocamos a classe que desejamos adicionar e depois o boleano -->
  <main class="columns is-gapless is-multine" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @transformaTema="mudaTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <!-- Aaui vai a view correspondente -->
      <RouterView></RouterView>

    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Notificacoes from "./components/Notificacoes.vue";
export default defineComponent({
  name: "App",
  components: { BarraLateral, Notificacoes },
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    

    mudaTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
