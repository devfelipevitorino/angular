import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { MarcaslistComponent } from './components/marcas/marcaslist/marcaslist.component';
import { MarcasdetailsComponent } from './components/marcas/marcasdetails/marcasdetails.component';
import { AcesoriolistComponent } from './components/acessorio/acesoriolist/acesoriolist.component';
import { AcesoriodetailsComponent } from './components/acessorio/acesoriodetails/acesoriodetails.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "login", component: LoginComponent },
    {
        path: "admin", component: PrincipalComponent, children: [
            { path: "carros", component: CarroslistComponent },
            { path: "carros/new", component: CarrosdetailsComponent },
            { path: "carros/edit/:id", component: CarrosdetailsComponent },
            { path: "marcas", component: MarcaslistComponent },
            { path: "marcas/new", component: MarcasdetailsComponent },
            { path: "marcas/edit/:id", component: MarcaslistComponent },
            { path: "acessorio", component: AcesoriolistComponent },
            { path: "acessorio/new", component: AcesoriodetailsComponent },
            { path: "acessorio/edit/:id", component: AcesoriolistComponent },
        ]
    }
];
