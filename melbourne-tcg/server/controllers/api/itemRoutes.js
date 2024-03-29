const router = require('express').Router();
const { Item, Category } = require('../../models');

//Endpoint '/api/items'

//Get all Items
router.get('/', async (req, res) => {
    try {
        const itemData = await Item.findAll();
        res.status(200).json(itemData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Get Item by id
router.get("/:id", async (req, res) => {
  try {
    const itemData = await Item.findOne({
        where: {
            id: req.params.id,
        },
        //shows the Category for the Item
        include: [{ model: Category }],
    });

    if (!itemData) {
      res.status(404).json({ message: "No item with this id!" });
      return;
    }
    res.status(200).json(itemData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create Item
router.post('/', async (req, res) => {
    try {
        const newItem = await Item.create({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            category_id: req.body.category_id,
            
        });
        res.status(200).json(newItem);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Update Item by id
router.put("/:id", async (req, res) => {
  try {
    const itemData = await Item.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!itemData[0]) {
      res.status(404).json({ message: "No item with this id!" });
      return;
    }
    res.status(200).json(itemData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete Item by id
router.delete("/:id", async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;