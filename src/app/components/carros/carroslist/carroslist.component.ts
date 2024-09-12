import { Component, inject, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {
  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, "");

  //elementos modal
  modalService = inject(MdbModalService); //abrir a modal
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>;
  modalRef!:MdbModalRef<any>;

  constructor() {
    this.lista.push(new Carro(1, "Fiesta"))
    this.lista.push(new Carro(2, "Monza"))
    this.lista.push(new Carro(3, "Sonic"))

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;
    if (carroNovo) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }

    if (carroEditado) {
      let indice = this.lista.findIndex(x => { return x.id == carroEditado.id });
      this.lista[indice] = carroEditado;
    }
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
        let indice = this.lista.findIndex(x => { return x.id == carro.id });
        this.lista.splice(indice, 1);

        Swal.fire({
          title: "Deletado com sucesso!",
          icon: "success"
        });
      }
    }); 
  }
  new(){
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro){
    this.carroEdit = Object.assign({}, carro); //clonando para evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){

    if(carro.id > 0){
      let indice = this.lista.findIndex(x => {return x.id == carro.id});
      this.lista[indice] = carro;
    }else{
      carro.id = 55;
      this.lista.push(carro);
    }

    this.modalRef.close();
  }
}