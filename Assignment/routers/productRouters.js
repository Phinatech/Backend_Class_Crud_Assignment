
import express from 'express';
import {
  createProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  getByqueryParams,
} from '../controllers/produts/productsController.js';

import authMiddleware from '../middleware/authmiddles.js';

const productRouter = express.Router();

productRouter
  .post('/product/create', authMiddleware, createProduct)
  .get('/products', getAllProducts)
  .get('/usersByquery', authMiddleware, getByqueryParams)
  .put('/product/update/:id', authMiddleware, editProduct)
  .delete('/product/delete/:id', authMiddleware, deleteProduct);

export default productRouter;
