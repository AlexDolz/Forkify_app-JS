import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import icons from '../img/icons.svg'; //Parcel 1
import 'core-js/stable'; // polyfilling everything else
import 'regenerator-runtime'; // polyfilling asyn await for old browsers

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controllRecipes)
);

// The same
// window.addEventListener('hashchange', controllRecipes);
// window.addEventListener('load', controllRecipes);
