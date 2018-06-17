import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetKeyStatsService {

	private url:string;
	constructor(private http:Http) { }

	getKeyStats(ticker:string){
		this.url = 'https://api.iextrading.com/1.0/stock/'+ticker+'/stats';
		return this.http.get(this.url);
	}
}
