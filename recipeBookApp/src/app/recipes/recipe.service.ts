import { Recipe } from './recipe.modal';
import { EventEmitter } from '@angular/core';

export class RecipeService{
    recipeSelected=new EventEmitter<Recipe>();
    private recipes: Recipe[]=[
        new Recipe('A Test Recipe','Simply a Test Recipe',
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg'),
        new Recipe('A Test Recipe2','Simply a Second Test Recipe',
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg')
    ];

    getRecipes(){
        return this.recipes.slice();
    }
}