import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {

    id!: number;
    nome!: string;
    marca!: Marca;
    acessorios: Acessorio[] = [];
    

    /*constructor(id: number, nome: string, marca: Marca){
        this.id = id;
        this.nome = nome;
        this.marca = marca;
    }*/
}
