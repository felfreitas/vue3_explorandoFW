<template>
    <Formulario @infoTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
    name: "App",
    components: { Formulario, Tarefa, Box },
    data() {
        return {
            tarefas: [] as ITarefa[]
        };
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        },
    },
    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            console.log(tarefa);
            if (tarefa?.projeto) {

                this.tarefas.push(tarefa);
            }
            else {
                this.store.commit(NOTIFICAR, {
                titulo: 'Atenção!',
                texto:'Ops :( ... É necessário escolher um projeto!',
                tipo: TipoNotificacao.ATENCAO
            })
                console.log("disparar msg");
            }

        }
    },
    setup() {
        const store = useStore();

        return {
            store
        }
    }
});
</script>
  