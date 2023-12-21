const express = require('express')
const router = express.Router()
const { getProductos, setProducto, updateProducto, deleteProducto } = require('../controllers/productosControllers')
const { protect, adminRoutes } = require('../middleware/authMiddleware')

router.get('/', protect, adminRoutes, getProductos)
router.post('/', protect, adminRoutes, setProducto)

router.put('/:id', protect, adminRoutes, updateProducto)
router.delete('/:id', protect, adminRoutes, deleteProducto)

module.exports = router