import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
	providedIn: 'root'
})
export class GetNewsService {

	private url:string;
	constructor( private http: Http) { }

	getNews(ticker:string){
		this.url = 'https://api.iextrading.com/1.0/stock/'+ ticker +'/news/last/50';
		return this.http.get(this.url);
	}
}
