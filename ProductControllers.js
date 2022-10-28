import data from './data.js';

export const getAll = (req, res) => {
  try {
    res.json(data.products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить товары' });
  }
};

export const getOne = (req, res) => {
  try {
    const product = data.products.find((x) => x._id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить товар' });
  }
};

export const create = (req, res) => {
  try {
    const newProduct = {
      _id: String(data.products.length + 1),
      name: req.body.name,
      status: req.body.status,
      text: req.body.text,
      imageUrls: req.body.imageUrls,
      price: req.body.price,
      cities: req.body.cities,
    };

    data.products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось создать товар' });
  }
};

export const update = (req, res) => {
  try {
    const index = data.products.findIndex((product) => product._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    const updatedProduct = {
      _id: req.params.id,
      name: req.body.name,
      status: req.body.status,
      text: req.body.text,
      imageUrls: req.body.imageUrls,
      price: req.body.price,
      cities: req.body.cities,
    };

    data.products[index] = updatedProduct;

    res.status(200).json({ message: 'Товар обновлен' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить товар',
    });
  }
};

export const remove = (req, res) => {
  try {
    const index = data.products.findIndex((product) => product._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    data.products.splice(index, 1);
    res.status(200).json({ products: data.products, message: 'Товар удален' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить товар',
    });
  }
};
