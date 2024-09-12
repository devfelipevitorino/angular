import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Carro } from '../../../models/carro';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  routerGeneric = inject(Router);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    let CarroRetornado: Carro = new Carro(id, "Fiesta");
    this.carro = CarroRetornado;
  }

  save() {
    if (this.carro.id > 0) {
      Swal.fire({
        title: "Editado com sucesso!",
        icon: "success"
      });
      this.routerGeneric.navigate(["admin/carros"], { state: { carroEditado: this.carro } });
    } else {
      Swal.fire({
        title: "Salvo com sucesso!",
        icon: "success"
      });
      this.routerGeneric.navigate(["admin/carros"], { state: { carroNovo: this.carro } });
    }
    this.retorno.emit(this.carro);
  }
}
