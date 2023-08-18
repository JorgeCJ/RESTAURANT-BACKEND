const express = require("express");
const app = express();
app.use(express.json())

const customers = [
  {
    name: "John",
    order: "Pizza",
    price: "$45.00",
    document: "67485",
  },
]

app.get('/orderFood', function (req, res) {
  res.json(customers)
})

app.post('/orderFood', function (req, res) {
  const newCostumer = req.body
  customers.push(newCostumer)
  res.status(201).json(newCostumer)
})

app.put('/orderFood/:document', function (req, res) {
  const document = req.params.document;
  const index = customers.findIndex(customer => customer.document == document);

  if (index != -1) {
    const currentOrder = customers[index];
    const updatedOrder = { ...currentOrder, ...req.body };

    customers[index] = updatedOrder;

    res.json(updatedOrder);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

app.delete('/orderFood/:document', function (req, res) {
  const document = req.params.document;
  const index = customers.findIndex(customer => customer.document == document);

  if (index != -1) {
    const deletedOrder = customers.splice(index, 1);
    res.json({ message: 'Order deleted', order: deletedOrder });
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"))