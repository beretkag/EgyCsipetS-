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
      return items.filter(item => item.nev.toLowerCase().replace(' ', '').includes(filter.toLowerCase()));
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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getRecipes().subscribe(
    (response) => { 
      this.recipes = response;
      for (let i = 0; i < this.recipes.length; i++) {
        this.recipes[i].osszetevok = this.recipes[i].hozzavalok.split(',');
        this.recipes[i].osszegek = this.recipes[i].mennyisegek.split(',');
        this.recipes[i].Textediting = false;
        this.recipes[i].Ingredientsediting = false;
      }
     },
    (error) => { console.log(error); });

  }

  EditText(ID: number){
    this.recipes.find((x:any) => x.ID == ID).Textediting = !this.recipes.find((x:any) => x.ID == ID).Textediting;
  }

  SaveEditText(ID: number){
    this.httpService.UpdateRecipes( this.recipes.find((x:any) => x.ID == ID)).subscribe(
      (response)=>{

      },
      (error) => { console.log(error); });
    this.EditText(ID);
  }

  DeleteRecipe(ID: number){
    this.httpService.DeleteRecipe(ID).subscribe(
    (response) => {
      this.recipes.splice(this.recipes.indexOf((x:any) => x.ID == ID), 1);
    },
    (error) => { console.log(error); });
  }

}
