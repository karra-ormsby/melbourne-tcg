const router = require('express').Router();
const { Category } = require('../../models');

//Endpoint '/api/categories'

//Get all Catergories
router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll();
        res.status(200).json(categoryData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Create Category
router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create({
            category_name: req.body.category_name,
        });
        res.status(200).json(newCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Update Category by id
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: "No item with this id!" });
      return;
    }
    res.status(200).json(categoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete Category by id
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;