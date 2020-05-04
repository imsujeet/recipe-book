import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.modal';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  url = 'https://recipe-book-c4004.firebaseio.com/recipes.json';

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url)
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(
        recipes => {
          this.recipeService.setRecipes(recipes);
        }
      )
    );
  }



}
