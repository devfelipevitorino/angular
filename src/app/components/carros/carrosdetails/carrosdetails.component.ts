import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Carro } from '../../../models/carro';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  routerGeneric = inject(Router);
  carroService = inject(CarroService);

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
}
