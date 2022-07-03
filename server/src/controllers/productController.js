const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`
        SELECT p.product_id, p.product_name, ap.attribute_category, c.category_name
        FROM attributes ap
        INNER JOIN product p
        ON ap.fk_product = p.product_id
        INNER JOIN category c
        ON p.fk_category = c.category_id;`, (err, products) => {
     if (err) {
      res.json(err);
     }
     console.log(products)
     res.send(products);
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO product set ?', data, (err, product) => {
      if (err) {
        res.json(err);
      }
      res.json(
              {
                message: "product created successfully.",
                status: 200,
                id: product.insertId
              }
            );
          }
        )
    })
};

controller.saveAttributes = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
      const insertAttributes = connection.query('INSERT INTO attributes set ?', data , (err, attribute) => {
      if (err) {
          res.json(err);
      }
      res.json(
              {
                message: "attributes added successfully.",
                status: 200,
              }
            );
          }
        )
    })
}

controller.listSKU = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(`
        SELECT *
        FROM product WHERE product_sku = ?`,[id], (err, products) => {
     if (err) {
      res.json(err);
     }
     if(products.length !== 0){
            res.json(
              {
                message: "the product SKU it`s duplicated.",
                status: 404,
                response: false
              }
            );
     }else{
      res.json(
        {
          message: "SKU correct.",
          status: 200,
          response: true
        }
      );
     }
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM products WHERE id = ?", [id], (err, rows) => {
      res.send(rows[0]);
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newproduct = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE product set ? where id = ?', [newproduct, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM product WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}


module.exports = controller;