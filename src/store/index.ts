import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
// import { Md5 } from 'ts-md5';
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR, DEFINIR_PROJETO } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO,REMOVER_PROJETO } from "./tipo-acoes";

import http from "@/http";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}


// chave de acesso para store InjectionKey e uma injeção Store do tipo Estado
//sempre que o componente pedi acesso a store ele deverá passar a chave
export const key: InjectionKey<Store<Estado>> = Symbol()

//constante para pegar
export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        //as mutações não podem ser assíncrona!!!
        //o mutations que controla o estado
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto

            } as IProjeto;

            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            //recebe todos os projetos menos o que possui o id para deletar
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
            //recebe todos os projetos menos o que possui o id para deletar
            state.projetos = projetos;
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
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETO, resposta.data))
        }
        ,
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('projetos/', {
                nome: nomeDoProjeto
            })

        }
        ,
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`projetos/${projeto.id}`, projeto)

        }
        ,
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http.delete(`projetos/${id}`)
                    .then(()=> commit(EXCLUIR_PROJETO,id))

        }
    }
})


export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}