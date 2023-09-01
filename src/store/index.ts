import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { Md5 } from 'ts-md5';
import { InjectionKey } from "vue";

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
        'ADCIONA_PROJETO'(state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto

            } as IProjeto;

            state.projetos.push(projeto);
        },
        'REMOVE_PROJETO'(state, idDoProjeto: any){
            return 0;
        }

    }
})


export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}