import { Recipe } from './recipe.modal';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modal';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe('Khichdi', 'Tasty simple and healthy recipe',
    //     'https://www.cookwithmanali.com/wp-content/uploads/2019/02/Instant-Pot-Quinoa-Khichdi.jpg',
    //     [
    //         new Ingredient('rice', 1),
    //         new Ingredient('pulses', 1)

    //     ]),
    //     new Recipe('Chicken Curry', 'A super tasty chicken curry recipe',
    //     'https://www.theflavorbender.com/wp-content/uploads/2018/02/Sri-Lankan-Chicken-Curry-The-Flavor-Bender-Featured-Image-SQ-2.jpg',
    //     [
    //         new Ingredient('chicken', 1),
    //         new Ingredient('onions', 10)
    //     ])
    // ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipe: Recipe[]) {
      this.recipes = recipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);

    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}

