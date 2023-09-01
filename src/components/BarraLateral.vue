<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo do Vue: Ela é a letra V com dentro de um círculo">
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">
        {{ textoBotao }}
      </button>

    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
          <router-link to="/projetos">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>

    </nav>
  </header>
</template>


<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'BarraLateral',
  emits: ['transformaTema'],
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return 'Destivar modo escuro'
      }
      return 'Ativar modo escuro'
    }
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit('transformaTema', this.modoEscuroAtivo)
    }
  }
});
</script>

<style scoped>
/* fica todo o stilo do componente */
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

/* mobile */
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #FAF0CA;
}

.link.router-link-active {
  color: #FAF0CA;
}
</style>

