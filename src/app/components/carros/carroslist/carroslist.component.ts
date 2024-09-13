import { Component, inject, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {
  lista: Carro[] = [];
  carroEdit: Carro = new Carro();

  //elementos modal
  modalService = inject(MdbModalService); //abrir a modal
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>;
  modalRef!:MdbModalRef<any>;

  carroService = inject(CarroService);

  constructor() {
    this.findAll();
  }

  findAll(){
    this.carroService.findAll().subscribe({
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

  deleteById(carro: Carro) {
    Swal.fire({
      title: "Tem certeza que deseja deletar esse registro?",
      icon: "warning",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {

        this.carroService.delete(carro.id).subscribe({
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
    this.carroEdit = new Carro();
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro){
    this.carroEdit = Object.assign({}, carro); //clonando para evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){
    this.findAll();
    this.modalRef.close();
  }
}