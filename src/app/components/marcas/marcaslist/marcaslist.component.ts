import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import { MarcasdetailsComponent } from "../marcasdetails/marcasdetails.component";

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MarcaslistComponent, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {
  lista: Marca[] = [];
  marcaEdit: Marca = new Marca();

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  //elementos modal
  modalService = inject(MdbModalService); //abrir a modal
  @ViewChild('modalMarcaDetalhe') modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!:MdbModalRef<any>;

  marcaService = inject(MarcaService);

  constructor() {
    this.findAll();
  }

  findAll(){
    this.marcaService.findAll().subscribe({
      next: lista => { //quando é o retorno esperado
        this.lista = lista;
      },error: err => { //quando da qualquer erro
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "error"
        });
      }
    });
  }

  deleteById(marca: Marca) {
    Swal.fire({
      title: "Tem certeza que deseja deletar esse registro?",
      icon: "warning",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {

        this.marcaService.delete(marca.id).subscribe({
          next: mensagem => { //quando é o retorno esperado
            Swal.fire({
              title: mensagem,
              icon: "success"
            });
            this.findAll();
          },error: err => { //quando da qualquer erro
            Swal.fire({
              title: "Ocorreu um erro!",
              icon: "error"
            });
          }
        });
      }
    }); 
  }
  new(){
    this.marcaEdit = new Marca();
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca){
    this.marcaEdit = Object.assign({}, marca); //clonando para evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca){
    this.findAll();
    this.modalRef.close();
  }

  select(marca: Marca){
    this.retorno.emit(marca);
  }
}