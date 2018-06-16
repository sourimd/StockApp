import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GetNewsService } from '../Services/GetNewsServices/get-news-service.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit {

  	stockQuotes: any[];
	  news: any[];
    keyStats: {} = {"marketcap" : 0, "cash" : 0,"debt" : 0,"day200MovingAvg" : 0,"day50MovingAvg" : 0,"week52high" : 0, "week52low" : 0};
    currentPrice: number = 0;
    dateAndStock: any[];
    tradeVolume: any[];
    largestTrades: any[];
    private selectedTicker:string;
    apiKey:string = 'I3BBLARXL8KMV9PR';
  	constructor( private http: Http, private getNewsService:GetNewsService){
  		
  	}

  	ngOnInit() {
        // this.getNewsService.getNews('aapl');
  	}

  	onTickerClick($event,tickr:string){
  		document.getElementById('chartContainer').innerHTML = '<div class="loader"></div>';;
      	$event.stopPropagation();
      	this.selectedTicker = tickr;
  		let oneYearStockPriceUrl = 'https://api.iextrading.com/1.0/stock/'+tickr+'/chart/1y';
  		let movingAvgUrl = 'https://www.alphavantage.co/query?function=SMA&symbol='+ tickr +'&interval=daily&time_period=200&series_type=close&apikey='+this.apiKey;
      	this.dateAndStock = [];
      	this.tradeVolume = [];
      	this.stockQuotes = [];
      	this.largestTrades = [];
      	let movingAvgData = [];
      	let tempMovingAvgData = [];
      	let len:number;
      	let minVal = 999999;
  		this.http.get( oneYearStockPriceUrl )
  			.subscribe( response => {
  				this.stockQuotes = response.json();
  				len = this.stockQuotes.length
          		for( let i=0; i<len; i++){
            		this.dateAndStock.push({
            			y: this.stockQuotes[i].close,
            			label: this.stockQuotes[i].date
            		});
            		this.tradeVolume.push({
            			y: this.stockQuotes[i].volume,
            			label: this.stockQuotes[i].date
            		});
            		if( minVal > this.stockQuotes[i].close){
            			minVal = this.stockQuotes[i].close;
            		}
          		}
          		this.http.get( movingAvgUrl)
          			.subscribe( response =>{
          				let dat = response.json()["Technical Analysis: SMA"];
          				for (var property in dat ) {
						    if (dat.hasOwnProperty(property)) {
						        tempMovingAvgData.push( { "label" : property.split(' ')[0] , y : parseInt(dat[property]["SMA"]) } )
						    }
						}
          				for( let i=0;i<len; i++){
          					movingAvgData[i] = tempMovingAvgData[i];
          				}
          				movingAvgData.reverse();
          				let chart = new CanvasJS.Chart("chartContainer", {
							animationEnabled: true,
							exportEnabled: true,
							title: {
								text: this.selectedTicker.toUpperCase()
							},
							axisY:{
								minimum: 0.7 * minVal
							},
							data: [
								{
									type: "line",
									showInLegend: true,
									legendText: "Stock Price",
									name: "Stock Price",
									dataPoints: this.dateAndStock
								},
								{
									type: "line",
									showInLegend: true,
									legendText: "200 day SMA",
									name: "200 day SMA",
									dataPoints: movingAvgData
								}
							]
						});
							
						chart.render();
          			});

          		let tradeVolumeChart = new CanvasJS.Chart("tradeVolumeContainer", {
					animationEnabled: true,
					exportEnabled: true,
					title: {
						text: this.selectedTicker.toUpperCase()
					},
					axisY:{
						minimum: 0.9 * minVal,
						valueFormatString: "#M,,.",
					},
					data: [
						{
							type: "line",
							showInLegend: true,
							legendText: "Trade Volume",
							name: "Trade Volume",
							dataPoints: this.tradeVolume
						}
					]
				});
					
				tradeVolumeChart.render();
  			});
      	this.getNews();
      	this.getKeyStats();
      	this.getCurrentStockPrice();
      	this.getLargestTrades();
  	}

    onRangeClick($event, range:string){
    	document.getElementById('chartContainer').innerHTML = '<div class="loader"></div>';
      	if( !this.selectedTicker){
        	return;
      	}
      	$event.stopPropagation();
      	let url = 'https://api.iextrading.com/1.0/stock/'+this.selectedTicker+'/chart/'+ range;
      	let movingAvgUrl = 'https://www.alphavantage.co/query?function=SMA&symbol='+ this.selectedTicker +'&interval=daily&time_period=200&series_type=close&apikey='+this.apiKey;
      	this.stockQuotes = [];
      	this.dateAndStock = [];
      	this.tradeVolume = [];
      	let movingAvgData = [];
      	let tempMovingAvgData = [];
      	let minVal = 999999;
      	let stockQuoteLength: number;
      	this.http.get(url)
            .subscribe( response =>{
            	this.stockQuotes = response.json();
            	stockQuoteLength = this.stockQuotes.length;
              	for( let i=0; i<stockQuoteLength; i++){
                	this.dateAndStock.push({
                		y: this.stockQuotes[i].close,
                		label: this.stockQuotes[i].date
                	});

                	this.tradeVolume.push({
            			y: this.stockQuotes[i].volume,
            			label: this.stockQuotes[i].date
            		});

                	if( minVal > this.stockQuotes[i].close){
            			minVal = this.stockQuotes[i].close;
            		}
              	}
              	this.http.get( movingAvgUrl)
          			.subscribe( response =>{
          				let dat = response.json()["Technical Analysis: SMA"];
          				for (var property in dat ) {
						    if (dat.hasOwnProperty(property)) {
						        tempMovingAvgData.push( { "label" : property.split(' ')[0] , y : parseInt(dat[property]["SMA"]) } )
						    }
						}
          				for( let i=0;i<stockQuoteLength; i++){
          					movingAvgData[i] = tempMovingAvgData[i];
          				}
          				for( let i=0;i<stockQuoteLength; i++){
          					if( minVal > movingAvgData[i].y){
		            			minVal = movingAvgData[i].y;
		            		}
          				}
          				movingAvgData.reverse();
          				let chart = new CanvasJS.Chart("chartContainer", {
							animationEnabled: true,
							exportEnabled: true,
							title: {
								text: this.selectedTicker.toUpperCase()
							},
							axisY:{
								minimum: 0.9 * minVal
							},
							data: [
								{
									type: "line",
									showInLegend: true,
									legendText: "Stock Price",
									name: "Stock Price",
									dataPoints: this.dateAndStock
								},
								{
									type: "line",
									showInLegend: true,
									legendText: "200 day MA",
									name: "200 day MA",
									dataPoints: movingAvgData
								}
							]
						});
							
						chart.render();
          			});
              	
              	let tradeVolumeChart = new CanvasJS.Chart("tradeVolumeContainer", {
					animationEnabled: true,
					exportEnabled: true,
					title: {
						text: this.selectedTicker.toUpperCase()
					},
					axisY:{
						minimum: 0.9 * minVal,
						valueFormatString: "#M,,.",
					},
					data: [
						{
							type: "line",
							showInLegend: true,
							legendText: "Trade Volume",
							name: "Trade Volume",
							dataPoints: this.tradeVolume
						}
					]
				});
					
				tradeVolumeChart.render();
            });
    }

    getNews(){
      	// let url = 'https://api.iextrading.com/1.0/stock/'+this.selectedTicker+'/news/last/50';
      	this.getNewsService.getNews(this.selectedTicker)
            .subscribe( response =>{
              this.news = response.json();
            });

    }

    getKeyStats(){
      	let url = 'https://api.iextrading.com/1.0/stock/'+this.selectedTicker+'/stats';
      	this.http.get(url)
                .subscribe( response =>{
                  this.keyStats = response.json();
                });
    }

    getCurrentStockPrice(){
      	let url = 'https://api.iextrading.com/1.0/stock/' + this.selectedTicker + '/price';
      	this.http.get(url)
          .subscribe( response =>{
            this.currentPrice = response.json();
          })
    }

    getLargestTrades(){
      	let url = 'https://api.iextrading.com/1.0/stock/'+this.selectedTicker+'/largest-trades';
      	this.http.get(url)
        	.subscribe( response =>{
          	this.largestTrades = response.json();
        });
    }
}
