import IProjeto from "./IProjeto";

export default interface ITarefa {
    id: number,
    duracaoEmSegundos: number,
    descricao: string,
    data: Date,
    projeto: IProjeto
}