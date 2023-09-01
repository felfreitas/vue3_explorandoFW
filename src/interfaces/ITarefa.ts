import IProjeto from "./IProjeto";

export default interface ITarefa {
    duracaoEmSegundos: number,
    descricao: string,
    data: Date,
    projeto: IProjeto
}