const SchoolModel = require("../Models/school.model.js");

class SchoolController {
  constructor() {
    console.log("Instance call of School controller");
  }

  list = async (req, res) => {
    const result = await SchoolModel.findAll();
    res.json(result);
  };

  get = async (req, res) => {
    const result = await SchoolModel.findOne({
      where: { id: req.params.id },
    });
    res.json(result);
  };

  create = async (req, res) => {
    const { name, address, zip, city, telefon, email, description, lat, lng } =
      req.body;

    if (
      (name && address && zip && city,
      telefon,
      email && description && lat && lng)
    ) {
      const model = await SchoolModel.create(req.body);
      return res.json({ newId: model.id });
    } else {
      res.send(418);
    }
  };

  update = async (req, res) => {
    const {
      name,
      address,
      zip,
      city,
      telefon,
      email,
      description,
      category_id,
    } = req.body;

    if (
      name &&
      address &&
      zip &&
      city &&
      telefon &&
      email &&
      description &&
      category_id
    ) {
      const model = await SchoolModel.update(req.body, {
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
      await SchoolModel.destroy({
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

module.exports = { SchoolController };
