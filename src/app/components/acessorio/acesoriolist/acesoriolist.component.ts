import { AcesoriodetailsComponent } from "../acesoriodetails/acesoriodetails.component";
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Acessorio } from "../../../models/acessorio";
import { AcessorioService } from "../../../services/acessorio.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-acesoriolist',
  standalone: true,
  imports: [AcesoriodetailsComponent,RouterLink, MdbModalModule, AcesoriolistComponent],
  templateUrl: './acesoriolist.component.html',
  styleUrl: './acesoriolist.component.scss'
})
export class AcesoriolistComponent {
  lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio();

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  //elementos modal
  modalService = inject(MdbModalService); //abrir a modal
  @ViewChild('modalAcessorioDetalhe') modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!:MdbModalRef<any>;

  acessorioService = inject(AcessorioService);

  constructor() {
    this.findAll();
  }

  findAll(){
    this.acessorioService.findAll().subscribe({
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

  deleteById(acessorio: Acessorio) {
    Swal.fire({
      title: "Tem certeza que deseja deletar esse registro?",
      icon: "warning",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {

        this.acessorioService.delete(acessorio.id).subscribe({
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
    this.acessorioEdit = new Acessorio();
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  edit(acessorio: Acessorio){
    this.acessorioEdit = Object.assign({}, acessorio); //clonando para evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio){
    this.findAll();
    this.modalRef.close();
  }

  select(acessorio: Acessorio){
    this.retorno.emit(acessorio);
  }
}
