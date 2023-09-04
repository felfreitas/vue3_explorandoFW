<template>
    <section>

        <router-link to="/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>

        <Box v-if="projetosVazio" class="cssStyle"> Você não possui Tarefas cadastradas <span
                class="has-text-weight-bold">:(</span>
        </Box>
        <table class="table is-fullwidth" v-if="!projetosVazio">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas  fa-trash"></i>
                            </span>
                        </button>
                    </td>

                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Box from '@/components/Box.vue';
import { useStore } from '@/store';
import { EXCLUIR_PROJETO } from '@/store/tipo-mutacoes'
import { OBTER_PROJETOS,REMOVER_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'ListaProjetos-Nome',
    data() {
        return {
            cssStyle: {
                background: '#faf0ca',
            }
        };
    },
    computed: {
        projetosVazio(): boolean {
            return this.projetos.length === 0;
        }
    },
    methods: {
        excluir(id: string) {
            this.store.dispatch(REMOVER_PROJETO, id);
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_PROJETOS);
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    },
    components: { Box }
})
</script>


<style scoped>
.cssStyle {
    margin-top: 1.25rem;
}
</style>