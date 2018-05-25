import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TechService } from './services/tech/tech.service';
import { TechDetailComponent } from './tech-detail/tech-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TechDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        TechService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
