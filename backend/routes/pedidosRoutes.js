const express = require('express')
const router = express.Router()
const { getPedidos, setPedido, updatePedido, deletePedido } = require('../controllers/pedidosControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getPedidos)
router.post('/', protect, setPedido)

router.put('/:id', protect, updatePedido)
router.delete('/:id', protect, deletePedido)

module.exports = router