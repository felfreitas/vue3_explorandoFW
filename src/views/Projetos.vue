<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>

        </form>
        <Box v-if="projetosVazio" class="cssStyle"> Você não possui Tarefas cadastradas <span class="has-text-weight-bold">:(</span>
        </Box>
        <table class="table is-fullwidth" v-if="!projetosVazio">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(projeto, index) in projetos" :key="index">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>

                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IProjeto from '../interfaces/IProjeto';
import Box from '@/components/Box.vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'Projetos-Nome',
    data() {
        return {
            nomeDoProjeto: '',
            projetos: [] as IProjeto[],
            cssStyle: {
                background: '#faf0ca',
            }
        };
    }, computed: {
        projetosVazio(): boolean {
            return this.projetos.length === 0;
        }
    },
    methods: {
        salvar() {
            // const projeto: IProjeto = {
            //     id: new Date().toISOString(),
            //     nome: this.nomeDoProjeto
            // };
            // console.log(projeto);
            // this.projetos.push(projeto);
            // this.nomeDoProjeto = '';
        }
    },
    setup(){
        const store = useStore();
        return {
            store
        }
    },
    components: { Box }
})
</script>


<style scoped>
.projetos {
    padding: 1.25rem;
}

.cssStyle{
    margin-top: 1.25rem;
}
</style>