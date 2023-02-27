import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private serverUrl = 'http://localhost/Fekete Párducok/EgyCsipetSo-1/EgyCsipetSo/API/database.php';

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get(this.serverUrl+'?table=receptek');
  }

  UpdateRecipes(recipe:any){
    let data ={
      table: "receptek",
      field: "ID",
      value: recipe.ID,
      values: {
        nev: recipe.nev,
        elkeszites: recipe.elkeszites,
        hozzavalok: "",
        mennyisegek: ""
      }
    }

    for (let i = 0; i < recipe.osszetevok.length; i++) {
      data.values.hozzavalok += recipe.osszetevok[i].osszetevo + ","
      data.values.mennyisegek += recipe.osszetevok[i].mennyiseg + ","
    }
    data.values.hozzavalok = data.values.hozzavalok.substring(0, data.values.hozzavalok.length-1);
    data.values.mennyisegek = data.values.mennyisegek.substring(0, data.values.mennyisegek.length-1);

    return this.http.patch(this.serverUrl, data);
  }

  DeleteRecipe(id: number){
    let data = {  table: "receptek",
      id: id
    };

    return  this.http.delete(this.serverUrl, {body: data});
  }

  InsertRecipe(recipe: any){
    let data ={
      table: "receptek",
      values: {
        nev: recipe.nev,
        elkeszites: recipe.elkeszites,
        hozzavalok:"",
        mennyisegek: ""
      }
    }

    for (let i = 0; i < recipe.osszetevok.length; i++) {
      data.values.hozzavalok += recipe.osszetevok[i].osszetevo + ","
      data.values.mennyisegek += recipe.osszetevok[i].mennyiseg + ","
    }
    data.values.hozzavalok = data.values.hozzavalok.substring(0, data.values.hozzavalok.length-1);
    data.values.mennyisegek = data.values.mennyisegek.substring(0, data.values.mennyisegek.length-1);
//might do might not
    return this.http.post(this.serverUrl,data)
  }

}
