const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`
        SELECT p.product_id, p.product_name, a.attribute_name, ap.value, a.attribute_units 
        FROM attributes_product ap
        INNER JOIN product p
        ON ap.fk_product = p.product_id
        INNER JOIN attributes a
        ON ap.fk_attributes = a.attributes_id;`, (err, products) => {
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
    const query = connection.query('INSERT INTO products set ?', data, (err, product) => {
      console.log(product)
      res.redirect('/');
    })
  })
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