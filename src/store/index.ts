import { createStore, Store, useStore as vuexUseStore } from "vuex";
// import { Md5 } from 'ts-md5';
import { InjectionKey } from "vue";
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

import { EstadoProjeto, projeto } from "./modulos/projetos";
import { EstadoTarefa, tarefa } from "./modulos/tarefas";

export interface Estado {
    
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}


// chave de acesso para store InjectionKey e uma injeção Store do tipo Estado
//sempre que o componente pedi acesso a store ele deverá passar a chave
export const key: InjectionKey<Store<Estado>> = Symbol()

//constante para pegar
export const store = createStore<Estado>({
    state: {
    
        notificacoes: [],
        projeto:{
            projetos:[]
        },
        tarefa:{
            tarefas:[]
        }
    },
    mutations: {
        //as mutações não podem ser assíncrona!!!
        //o mutations que controla o estado
           
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)

        }

    },
    actions: {
       
      
    },
    modules:{
        projeto,
        tarefa

    }
})


export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}