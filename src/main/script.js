//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://api.spoonacular.com/recipes/findByIngredients";
let key = "af5f7845c84b4bab91d240a9186692b4";

searchBtn.addEventListener("click", () => {
    let userInp = document.getElementById("user-inp").value;
    if (userInp.length == 0) {
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    } else {
        fetch(url + '?apiKey=' + key + '&ingredients='+ encodeURIComponent(userInp))
            .then((response) => response.json())
            .then((data) => {
                let myMeal = data[0];
                console.log(myMeal);/*
                console.log(myMeal.strMealThumb);
                console.log(myMeal.strMeal);
                console.log(myMeal.strArea);
                console.log(myMeal.strInstructions);
                */
                let count = 1;
                let ingredients = [];

                myMeal.missedIngredients.forEach((i) => {
                    let ingredient = i.originalName;
                    let measure = i.amount + ' ' + i.unitLong;
                    ingredients.push(`${measure} ${ingredient}`);
                });
                console.log(ingredients);

                result.innerHTML = `
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
    `;
                let ingredientCon = document.getElementById("ingredient-con");
                let parent = document.createElement("ul");
                let recipe = document.getElementById("recipe");
                let hideRecipe = document.getElementById("hide-recipe");
                let showRecipe = document.getElementById("show-recipe");

                ingredients.forEach((i) => {
                    let child = document.createElement("li");
                    child.innerText = i;
                    parent.appendChild(child);
                    ingredientCon.appendChild(parent);
                });

                hideRecipe.addEventListener("click", () => {
                    recipe.style.display = "none";
                });
                showRecipe.addEventListener("click", () => {
                    recipe.style.display = "block";
                });
            })
            .catch((e) => {
                result.innerHTML = `<h3>Invalid Input</h3>`;
            });
    }

});