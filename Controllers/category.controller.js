const CategoryModel = require("../Models/category.model.js");

class CategoryController {
  constructor() {
    console.log("Instance call of Category controller");
  }

  list = async (req, res) => {
    const result = await CategoryModel.findAll();
    res.json(result);
  };

  get = async (req, res) => {
    const result = await CategoryModel.findOne({
      where: { id: req.params.id },
    });
    res.json(result);
  };

  getId = async (req, res) => {
    console.log(req.body.title);
    const result = await CategoryModel.findOne({
      attributes: ["id"],
      where: { title: req.body.title },
    });
    res.json(result);
  };
  //
  create = async (req, res) => {
    const { title } = req.body;

    if (title) {
      const model = await CategoryModel.create(req.body);
      return res.json({ newId: model.id });
    } else {
      res.send(418);
    }
  };

  update = async (req, res) => {
    const { title } = req.body;

    if (title) {
      const model = await CategoryModel.update(req.body, {
        where: { id: req.body.id },
        individualHooks: true,
      });
      return res.json({ status: true });
    } else {
      res.send(418);
    }
  };

  delete = async (req, res) => {
    try {
      await CategoryModel.destroy({
        where: {
          id: req.body.id,
        },
      });

      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  };
}

module.exports = { CategoryController };
