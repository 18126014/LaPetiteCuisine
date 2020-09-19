var express = require('express');
const createHttpError = require("http-errors");
var router = express.Router();

const RecipeController = require("../controllers/recipes.controller");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'La Petite Cuisine', js_file: "./../js/index.js", css_file: "./../css/index.css" });
});

/* GET all - recipe page */
router.get('/recipes', async (req, res) => {
  const _datas = await RecipeController.load();
  res.render('recipes', { title: "All Recipes - La Petite Cuisine", js_file: "./../js/recipes.js", css_file: "./../css/recipes.css", datas: _datas});
});

/*GET category page */
router.get('/recipes-:cat', async(req, res, next) => {
  const category = req.params.cat;
  const _datas = await RecipeController.type(category);
  res.render('recipes_cat', { title: category + " - La Petite Cuisine", page_name: category, js_file: "./../js/recipes.js", css_file: "./../css/recipes.css", datas: _datas});
});

/* GET recipe detail page */
router.get('/recipes/:uri', function(req, res, next) {
  const name_dish = req.params.uri;
  res.render('detail', { title: name_dish + " - La Petite Cuisine", js_file: "./../js/detail.js", css_file: "./../css/detail.css" });
});

module.exports = router;