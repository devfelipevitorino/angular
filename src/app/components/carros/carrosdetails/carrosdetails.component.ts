import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carro.service';
import { MarcaslistComponent } from "../../marcas/marcaslist/marcaslist.component";
import { Marca } from '../../../models/marca';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcesoriolistComponent } from "../../acessorio/acesoriolist/acesoriolist.component";
import { Acessorio } from '../../../models/acessorio';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent, AcesoriolistComponent],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  routerGeneric = inject(Router);
  carroService = inject(CarroService);

  modalService = inject(MdbModalService); //abrir a modal
  @ViewChild('modalMarcas') modalMarcas!: TemplateRef<any>;
  @ViewChild('modalAcessorio') modalAcessorio!: TemplateRef<any>;
  modalRef!:MdbModalRef<any>;
  
  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.carroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;
      },error: err =>{
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "error"
        });
      }
    });
  }

  save() {
    if (this.carro.id > 0) {

      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success"
          });
          this.routerGeneric.navigate(["admin/carros"], { state: { carroEditado: this.carro } });
          this.retorno.emit(this.carro);
        },error: err =>{
          Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
        }
      });
      
    } else {

      this.carroService.save(this.carro).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success"
          });
          this.routerGeneric.navigate(["admin/carros"], { state: { carroNovo: this.carro } });
          this.retorno.emit(this.carro);
        },error: err =>{
          Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
        }
      }); 
    }
  }

  buscarAcessorio(){
    this.modalRef = this.modalService.open(this.modalAcessorio, {modalClass: "modal-lg"});
  }

  buscarMarca(){
    this.modalRef = this.modalService.open(this.modalMarcas, {modalClass: "modal-lg"});
  }

  retornoMarca(marca: Marca){
    this.carro.marca = marca;
    this.modalRef.close();
  }

  trocarMarca(){
  }

  retornoAcessorio(acessorio: Acessorio){
    if(this.carro.acessorios == null){
      this.carro.acessorios = [];
    }
    this.carro.acessorios.push(acessorio);
    this.modalRef.close();
  }

  desvincularAcessorioCarro(acessorio: Acessorio){
    let posicao = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
    this.carro.acessorios.splice(posicao, 1);
  }
}
