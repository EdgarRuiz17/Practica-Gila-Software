const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`
        SELECT p.product_id, p.product_name, ap.attribute_category, c.category_name, ap.attributes_id, p.product_cost, p.product_brand, p.product_sku
        FROM attributes ap
        INNER JOIN product p
        ON ap.fk_product = p.product_id
        INNER JOIN category c
        ON p.fk_category = c.category_id;`, (err, products) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).send(products);
    });
  });
};

controller.listCategories = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`
        SELECT category_id, category_name
        FROM category;`, (err, categories) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).send(categories);
    });
  });
};

controller.listProductsByCategories = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(`
        SELECT p.product_id, p.product_name, ap.attribute_category, c.category_name, ap.attributes_id,
         p.product_cost, p.product_brand, p.product_sku
        FROM attributes ap
        INNER JOIN product p
        ON ap.fk_product = p.product_id
        INNER JOIN category c
        ON p.fk_category = c.category_id
        WHERE p.fk_category = ?;`, [id], (err, categories) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).send(categories);
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO product set ?', data, (err, response) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json({
        message: "product created successfully.",
        id: response.insertId
      });
    });
  });
};

controller.saveAttributes = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const insertAttributes = connection.query('INSERT INTO attributes set ?', data, (err, response) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json({ message: "attributes added successfully." });
    });
  });
};

controller.listSKU = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(`
        SELECT *
        FROM product WHERE product_sku = ?`, [id], (err, rows) => {
      if (rows.length !== 0) {
        res.json(
          {
            message: "the product SKU it`s duplicated.",
            status: 500,
            response: false
          });
      }else{
        res.json(
          {
            message: "SKU correct.",
            status: 200,
            response: true
          });
        if (err) {
          res.status(500).json(err);
        }
      }
    });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM product WHERE product_id = ?', [id], (err, rows) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json({ message: "Deleted product" })
    });
  });
}

controller.deleteAttributes = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM attributes WHERE attributes_id = ?', [id], (err, rows) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json({ message: "Deleted attributes" })
    });
  });
}


module.exports = controller;