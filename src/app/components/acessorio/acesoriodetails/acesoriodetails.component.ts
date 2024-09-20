import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessorioService } from '../../../services/acessorio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acesoriodetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acesoriodetails.component.html',
  styleUrl: './acesoriodetails.component.scss'
})
export class AcesoriodetailsComponent {
  @Input("acessorio") acessorio: Acessorio = new Acessorio();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  routerGeneric = inject(Router);
  AcessorioService = inject(AcessorioService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.AcessorioService.findById(id).subscribe({
      next: retorno => {
        this.acessorio = retorno;
      },error: err =>{
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "error"
        });
      }
    });
  }

  save() {
    if (this.acessorio.id > 0) {

      this.AcessorioService.update(this.acessorio, this.acessorio.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success"
          });
          this.routerGeneric.navigate(["admin/acessorio"], { state: { acessorioEditado: this.acessorio } });
          this.retorno.emit(this.acessorio);
        },error: err =>{
          Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
        }
      });
      
    } else {

      this.AcessorioService.save(this.acessorio).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: "success"
          });
          this.routerGeneric.navigate(["admin/acessorio"], { state: { acessorioNovo: this.acessorio } });
          this.retorno.emit(this.acessorio);
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
