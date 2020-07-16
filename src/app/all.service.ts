import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AllService {
  url : string = "https://www.coinimp.com/api/v2/";
  constructor(private http :HttpClient ) { }



}
