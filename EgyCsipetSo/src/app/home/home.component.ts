import { Component } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  recipes: any;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getRecipes().subscribe(
    (response) => { this.recipes = response; },
    (error) => { console.log(error); });
  }

  etelek = [ "pizza", "leves", "tészta"]
  osszetevok= ["sajt", "vaj", "tojás"];
}
