<template>
    <Formulario @infoTarefa="salvarTarefa" />
    <div class="lista">
        <!-- <Box v-if="tarefas.length === 0"> Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
        </Box> -->
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />


        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma tarefa</p>
                    <button class="delete" aria-label="close" @click="fecharModal"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição da tarefa
                        </label>
                        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="editandoTarefa">Salvar alterações</button>
                    <button class="button" @click="fecharModal">Cancelar</button>
                </footer>
            </div>
        </div>



    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin } from "@/mixins/notificar";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from "@/store/tipo-acoes";

export default defineComponent({
    name: "App",
    components: { Formulario, Tarefa
     
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
           this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        }

    },
    setup() {
        const store = useStore();
        const tarefaSelecionada = ref(null as ITarefa | null);
        
        store.dispatch(OBTER_PROJETOS)
        store.dispatch(OBTER_TAREFAS)

        // metodos
        
        
      const selecionarTarefa = (tarefa: ITarefa) => {
            tarefaSelecionada.value = tarefa;
        }
        
        const fecharModal= () => {
            tarefaSelecionada.value = null;
        }
        
       const  editandoTarefa = ()=>{
            store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
                .then(()=>fecharModal())
        }

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            tarefaSelecionada,
            selecionarTarefa,
            fecharModal,
            editandoTarefa
        }
    }
});
</script>
  
