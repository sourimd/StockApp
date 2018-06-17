// Angular core utilities
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';

// Services
import { GetNewsService } from './Services/GetNewsServices/get-news-service.service';
import { GetKeyStatsService } from './Services/GetKeyStatsService/get-key-stats-service.service';
import { GetCurrentStockPriceService } from './Services/GetCurrentStockPrice/get-current-stock-price.service';

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
    GetNewsService,
    GetKeyStatsService,
    GetCurrentStockPriceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
