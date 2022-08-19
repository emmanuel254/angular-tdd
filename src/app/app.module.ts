import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {PageNotFoundComponent} from "./page-not-found-component/page-not-found-component.component";
import {SkeletonDirective} from "./shared/skeleton-loader/skeleton-directive";
import {SkeletonRectComponent} from "./shared/skeleton-loader/skeleton-rect";
import { CounterComponent } from './components/counter/counter.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    PageNotFoundComponent,
    SkeletonDirective,
    SkeletonRectComponent,
    CounterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
