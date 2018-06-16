import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { GetNewsService } from './Services/GetNewsServices/get-news-service.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    StockChartComponent

  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    GetNewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
