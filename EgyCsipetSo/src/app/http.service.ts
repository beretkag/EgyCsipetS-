import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import * as path from 'path';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private serverUrl = 'http://localhost/2-14 SZFT 2022-2023/Projektek/EgyCsipetSo/EgyCsipetSo/API/database.php';

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get(this.serverUrl+'?table=receptek');
  }

}
