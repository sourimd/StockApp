import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
