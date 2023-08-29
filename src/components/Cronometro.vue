<template>
  <section>
    <strong>
      {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Cronometro-Nome",
  props: {
    //tudo que vamos reeceber do pai
    tempoEmSegundos: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    //serve p uma informação dinamica: monitora uma informação
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().slice(11, 19);
    },
  },
});
</script>

<style></style>
