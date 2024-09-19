import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {
  @Input("marca") marca: Marca = new Marca();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  routerGeneric = inject(Router);
  marcaService = inject(MarcaService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.marcaService.findById(id).subscribe({
      next: retorno => {
        this.marca = retorno;
      },error: err =>{
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "error"
        });
      }
    });
  }

  save() {
    if (this.marca.id > 0) {

      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success"
          });
          this.routerGeneric.navigate(["admin/marcas"], { state: { marcaEditada: this.marca } });
          this.retorno.emit(this.marca);
        },error: err =>{
          Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
        }
      });
      
    } else {

      this.marcaService.save(this.marca).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success"
          });
          this.routerGeneric.navigate(["admin/marca"], { state: { marcaNova: this.marca } });
          this.retorno.emit(this.marca);
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
