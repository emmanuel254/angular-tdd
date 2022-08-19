import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found-component/page-not-found-component.component";
import {ContactComponent} from "./contact/contact.component";
import {CounterComponent} from "./components/counter/counter.component";

const routes: Routes = [
  {path: '', component: CounterComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
