import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/api.service';
import { AlertComponent } from './alert/alert.component';
import { ViewApplicationFormDialogComponent } from './view-application-form-dialog/view-application-form-dialog.component';
import { LoginDeniedComponent } from './login-denied/login-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ViewApplicationFormDialogComponent,
    LoginDeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
