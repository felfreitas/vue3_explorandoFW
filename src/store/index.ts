import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store } from "vuex";
import {Md5} from 'ts-md5';
import {InjectionKey} from "vue";

interface Estado {
    projetos: IProjeto[]
}


// chave de acesso para store InjectionKey e uma injeção Store do tipo Estado
//sempre que o componente pedi acesso a store ele deverá passar a chave
export const key: InjectionKey<Store<Estado>> = Symbol()

//constante para pegar
export const store = createStore<Estado>({
    state: {
        projetos: [
            {
                id:  Md5.hashAsciiStr('1') ,
                nome: 'Javinha'
            },
            {
                id:  Md5.hashAsciiStr('2') ,
                nome: 'TypeScript'
            },
            {
                id:  Md5.hashAsciiStr('3') ,
                nome: 'Csharpe'
            }
        ]
    }
})