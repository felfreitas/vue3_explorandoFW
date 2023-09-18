<template>
    <Formulario @infoTarefa="salvarTarefa" />
    <div class="lista">
        <!-- <Box v-if="tarefas.length === 0"> Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
        </Box> -->
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />


        <Modal :mostrar="tarefaSelecionada != null">

            <template v-slot:cabecalho>
                <p class="modal-card-title">Editando uma tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModal"></button>
            </template>
            <template v-slot:corpo >
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição da tarefa
                    </label>
                    <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                </div>
            </template>
            <template v-slot:rodape>
                <button class="button is-success" @click="editandoTarefa">Salvar alterações</button>
                <button class="button" @click="fecharModal">Cancelar</button>
            </template>
        </Modal>


    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { notificacaoMixin } from "@/mixins/notificar";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import Modal from "@/components/Modal.vue";

export default defineComponent({
    name: "App",
    components: {
        Formulario, 
        Tarefa,
        Modal
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



        const filtro = ref("");

        //se existir algum filtro vamos aplicar
        // const tarefas = computed(() => store.state.tarefa.tarefas.filter((t) => !filtro.value || t.descricao.includes(filtro.value)))


        // metodos
        const selecionarTarefa = (tarefa: ITarefa) => {
            tarefaSelecionada.value = tarefa;
        }

        const fecharModal = () => {
            tarefaSelecionada.value = null;
        }

        const editandoTarefa = () => {
            store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
                .then(() => fecharModal())
        }

        watchEffect(() => {
            //fazer um dispatch para buscar na api para filtrar o que foi digitado
            store.dispatch(OBTER_TAREFAS, filtro.value)
            console.log(filtro.value);

        });
        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            tarefaSelecionada,
            selecionarTarefa,
            fecharModal,
            editandoTarefa,
            filtro
        };
    }
});
</script>
  
