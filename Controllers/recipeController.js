const { get } = require("mongoose");
const Recipe = require("../Models/recipeModel");

const getRecipes = async (req, res) => {
  try {
    const filter = {};

    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    const recipes = await Recipe.find(filter);
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const createRecipe = async (req, res) => {
  const userId = req.user.id;
  console.log(req.user);
  try {
    const recipe = new Recipe({
      ...req.body,
      user: userId,
    });
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getRecipeByUserId = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.params.id });
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeByUserId,
};
