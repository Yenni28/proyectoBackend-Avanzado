const asyncHandler = require('express-async-handler')
const Pedido = require('../models/pedidosModel')

const getPedidos = asyncHandler(async (req, res) => {
    const pedidos = await Pedido.find({ user: req.user.id }, { product: req.user.id })

    res.status(200).json(pedidos)
})

const setPedido = asyncHandler(async (req, res) => {
    if (!req.body.quantity) {
        res.status(400)
        throw new Error('Por favor teclea una cantidad')
    }

    const pedido = await Pedido.create({
        quantity: req.body.quantity,
        product: req.body.productId,
        user: req.user.id
    })
    res.status(201).json(pedido)
})

const updatePedido = asyncHandler(async (req, res) => {
    const pedido = await Pedido.findById(req.params.id)

    if (!pedido) {
        res.status(404)
        throw new Error('El pedido no fué encontrado')
    }

    //verificar que la pedido pertenezca al usuario logeado
    if (pedido.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    } else {
        const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedPedido)
    }
})

const deletePedido = asyncHandler(async (req, res) => {
    const pedido = await Pedido.findById(req.params.id)

    if (!pedido) {
        res.status(404)
        throw new Error('El pedido no fué encontrado')
    }

    if (pedido.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    } else {
        pedido.deleteOne()
        //const deletedPedido = await Pedido.findByIdAndDelete(req.params.id)
        res.status(200).json({ id: pedido._id })
    }
})

module.exports = {
    getPedidos,
    setPedido,
    updatePedido,
    deletePedido
}