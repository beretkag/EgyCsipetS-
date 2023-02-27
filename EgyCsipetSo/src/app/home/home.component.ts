import { Component, Pipe, PipeTransform } from '@angular/core';
import { HttpService } from '../http.service';


@Pipe({
  name: 'Filter',
  pure: false
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
      if (items.length == 0 || !filter || filter == "") {
          return items;
      }
      return items.filter(item => item.nev.toLowerCase().replace(' ', '').includes(filter.toLowerCase()) || this.OsszetevoKereses(item, filter));
  }

  OsszetevoKereses(item: any, filter: string){
    for (let i = 0; i < item.osszetevok.length; i++) {
      if (item.osszetevok[i].osszetevo.toLowerCase().replace(' ', '').includes(filter.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  recipes: any;
  filter = "";
  nev="";

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getRecipes().subscribe(
    (response) => { 
      this.recipes = response;
      for (let i = 0; i < this.recipes.length; i++) {
        this.recipes[i].Textediting = false;
        this.recipes[i].Ingredientsediting = false;
        this.recipes[i].osszetevok = [];
        if (this.recipes.osszetevok.length!=0) {
          for (let j = 0; j < this.recipes[i].hozzavalok.split(',').length; j++) {
            this.recipes[i].osszetevok.push({
              osszetevo: this.recipes[i].hozzavalok.split(',')[j],
              mennyiseg: this.recipes[i].mennyisegek.split(',')[j],
              szerkesztes: false
            })
          }  
        }
        
      }
     },
    (error) => { console.log(error); });

  }

  AddIngredient(etel: any){
    etel.osszetevok.push({
      szerkesztes: true,
      osszetevo: "",
      mennyiseg: ""
    })
  }

  EditIngredients(etel: any){
    for (let i = 0; i < etel.osszetevok.length; i++) {
      etel.osszetevok[i].szerkesztes = false;
    }
    etel.Ingredientsediting = !etel.Ingredientsediting;
  }

  SaveEditIngredients(etel: any){
    this.httpService.UpdateRecipes(etel).subscribe(
      (response)=>{
        this.EditIngredients(etel);
      },
      (error) => { console.log(error); });

  }

  EditIngredient(etel:any, osszetevo: any, idx:number){
    if (osszetevo.osszetevo == "" && osszetevo.mennyiseg == "") {
      etel.osszetevok.splice(idx, 1)
    }else{
      osszetevo.szerkesztes = !osszetevo.szerkesztes;
    }
  }

  EditText(ID: number){
    this.recipes.find((x:any) => x.ID == ID).Textediting = !this.recipes.find((x:any) => x.ID == ID).Textediting;
  }

  SaveEditText(ID: number){
    this.httpService.UpdateRecipes( this.recipes.find((x:any) => x.ID == ID)).subscribe(
      (response)=>{
        this.EditText(ID);
      },
      (error) => { console.log(error); });
  }

  DeleteRecipe(ID: number){
    this.httpService.DeleteRecipe(ID).subscribe(
    (response) => {
      this.recipes.splice(this.recipes.findIndex((x:any) => x.ID == ID), 1);
    },
    (error) => { console.log(error); });
  }

  AddNewRecipe(nev:string){
    let recipe={
      nev:nev,
      elkeszites:"",
      osszetevok:[]
    }
    this.httpService.InsertRecipe(recipe).subscribe(
      (response) => {
        this.ngOnInit()
        this.nev=""
      },
      (error) => { console.log(error); });
  }

}
