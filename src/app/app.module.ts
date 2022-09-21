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
import { ServiceCounterComponent } from './components/service-counter/service-counter.component';
import { SignupComponent } from './signup/signup.component';
import { ControlErrorsComponent } from './components/control-errors/control-errors.component';
import { ErrorMessageDirective } from './shared/directives/error-message.directive';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    PageNotFoundComponent,
    SkeletonDirective,
    SkeletonRectComponent,
    CounterComponent,
    HomeComponent,
    ServiceCounterComponent,
    SignupComponent,
    ControlErrorsComponent,
    ErrorMessageDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
