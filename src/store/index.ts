import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
// import { Md5 } from 'ts-md5';
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipo-mutacoes";

interface Estado {
    projetos: IProjeto[]
}


// chave de acesso para store InjectionKey e uma injeção Store do tipo Estado
//sempre que o componente pedi acesso a store ele deverá passar a chave
export const key: InjectionKey<Store<Estado>> = Symbol()

//constante para pegar
export const store = createStore<Estado>({
    state: {
        projetos: []
    },
    mutations: {
        //o mutations que controla o estado
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto

            } as IProjeto;

            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj=> proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string){
            //recebe todos os projetos menos o que possui o id para deletar
            state.projetos = state.projetos.filter(proj => proj.id != id);
        }

    }
})


export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}