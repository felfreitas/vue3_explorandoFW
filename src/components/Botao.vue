<template>
<button class="button" >
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>{{ acao }}</span>
    </button>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:'Botao-n',
    props:{
        acao:{
            type: String,
            default:'Nome'

        }
    }
});
</script>

<style>
</style>