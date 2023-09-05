import ITarefa from "@/interfaces/ITarefa";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
// import { Md5 } from 'ts-md5';
import { InjectionKey } from "vue";
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONA_TAREFA,ALTERA_TAREFA } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { OBTER_TAREFAS,CADASTRAR_TAREFA,ALTERAR_TAREFA } from "./tipo-acoes";

import http from "@/http";
import { EstadoProjeto, projeto } from "./modulos/projetos";

export interface Estado {
    
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}


// chave de acesso para store InjectionKey e uma injeção Store do tipo Estado
//sempre que o componente pedi acesso a store ele deverá passar a chave
export const key: InjectionKey<Store<Estado>> = Symbol()

//constante para pegar
export const store = createStore<Estado>({
    state: {
    
        tarefas: [],
        notificacoes: [],
        projeto:{
            projetos:[]
        }
    },
    mutations: {
        //as mutações não podem ser assíncrona!!!
        //o mutations que controla o estado
       
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            //recebe todos os projetos menos o que possui o id para deletar
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
           
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(taref => taref.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)

        }

    },
    actions: {
       
        [OBTER_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        } ,
        [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa) {
            return http.post('tarefas/', tarefa)
                .then(resposta=>commit(ADICIONA_TAREFA, resposta.data))

        },
        [ALTERAR_TAREFA]({commit}, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA,tarefa))

        }
    },
    modules:{
        projeto
    }
})


export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}