<template>
    <div class="projetos">
        <h1 class="title">Projetos</h1>
        <RouterView></RouterView>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name:'Projetos-Nome'

})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>