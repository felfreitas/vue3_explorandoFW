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
    mixins:[notificacaoMixin],

    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            // console.log(tarefa);
            if (!tarefa?.projeto) {
                //chamando um mixin
                 this.notificar(TipoNotificacao.ATENCAO, 'Ops... :(','É necessário escolher um projeto!') ;
                
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
  


{
    // restante do código omitido...
    methods: {
        salvarTarefa(tempoEmSegundos: number): void {
            const projeto = this.projetos.find((p) => p.id == this.idProjeto); // primeiro, buscamos pelo projeto
            if(!projeto) { // se o projeto não existe...
                this.store.commit(NOTIFICAR, {
                    titulo: 'Ops!',
                    texto: "Selecione um projeto antes de finalizar a tarefa!",
                    tipo: TipoNotificacao.ERRO,
                }); // notificamos o usuário
                return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
            }
            // se o projeto existe, seguimos normalmente...
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoEmSegundos,
                descricao: this.descricao,
                projeto: projeto
            })
            this.descricao = ''
        }
    },
    // restante do código omitido...
}