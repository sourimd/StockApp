import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class GetCurrentStockPriceService {

	private url;
	constructor(private http: Http) { }

	getStockPrice(ticker:string){
      	this.url = 'https://api.iextrading.com/1.0/stock/' + ticker + '/price';

      	return this.http.get(this.url);
	}
}
