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
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin } from "@/mixins/notificar";

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
    mixins: [notificacaoMixin],

    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            // console.log(tarefa);
            if (!tarefa?.projeto) {
                //chamando um mixin
                this.notificar(TipoNotificacao.ATENCAO, 'Ops... :(', 'É necessário escolher um projeto!');
                return;
            }
            this.tarefas.push(tarefa);
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
  
