const createHttpError = require("http-errors");
const { create } = require("../models/recipes.model");
const RecipesModel = require("../models/recipes.model");

module.exports = {
  load: async () => await RecipesModel.find({deleteDate: ""}),
  detail: async (uri) => {
    try {
      const result = await RecipesModel.find({ uri: uri });
      if (result.length === 0) throw createHttpError("Recipes not found"); //không có uri trong db
      return result;
    } catch (error) {
      throw createHttpError(error);
    }
  },
  add: async (data) => {
    try {
      await RecipesModel.create(data);
    } catch (error) {
      throw createHttpError(error);
    }
  },
  get: async (uri) => await RecipesModel.find({ uri: uri }),
  type: async (type) => {
    try {
      const result = await RecipesModel.find({ type: type });
      if (result.length === 0)
        throw createHttpError("This category has not been created yet."); //không có type trong db
      return result;
    } catch (error) {
      throw createHttpError(error);
    }
  },
  getByAuthor: async (author) => {
    try {
      const result = await RecipesModel.find({
        author: author,
        deleteDate: "",
      });
      return result;
    } catch (error) {
      throw createHttpError(error);
    }
  },
  getLatestDel: async (author) => {
    try {
      const result = await RecipesModel.find({
        author: author,
        deleteDate: { $ne: "" },
      }).sort({ deleteDate: -1 });
      console.log("result", result);
      return result[0];
    } catch (error) {
      throw createHttpError(error);
    }
  },
  update: async (filter, update) => {
    try {
      await RecipesModel.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
      console.log("error", error);
      throw createHttpError(error);
    }
  },
  searchByName: async (keyword) => {
    try {
      // const result = await RecipesModel.find({ $text: { $regex: keyword } });
      const result = await RecipesModel.find({ name: { $regex: /keyword/ } });
      return result;
    } catch (error) {
      console.log("error", error);
      throw createHttpError(error);
    }
  },
  searchByIngredients: async (keyword) => {
    const array = keyword.split(" ");
    var newArray = [];
    array.map((element) => {
      newArray.push(new RegExp(element));
    });
    console.log("newArray", newArray);

    try {
      // const result = await RecipesModel.find({
      //   ingredients: {
      //     $in: array,
      //   },
      // });

      // const result = await RecipesModel.find({
      //   ingredients: {
      //     $all: [/clove/, /1/, /teaspoon/, /coarse/, /salt/],
      //   },
      // });

      const result = await RecipesModel.find({
        ingredients: {
          $all: newArray,
        },
      });

      return result;
    } catch (error) {
      console.log("error", error);
      throw createHttpError(error);
    }
  },
};
