const asyncHandler = require('express-async-handler')
const Producto = require('../models/productosModel')

const getProductos = asyncHandler(async (req, res) => {
    const productos = await Producto.findAll()

    res.status(200).json(productos)
})

const setProducto = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Por favor teclea un producto')
    }

    if (!req.body.description) {
        res.status(400)
        throw new Error('Por favor teclea una descripcion')
    }

    if (!req.body.quantity) {
        res.status(400)
        throw new Error('Por favor teclea una cantidad')
    }

    const producto = await Producto.create({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity
    })

    res.status(201).json(producto)
})

const updateProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(404)
        throw new Error('El producto no fué encontrado')
    } else {
        const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedProducto)
    }
})

const deleteProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(404)
        throw new Error('El producto no fué encontrado')
    } else {
        producto.deleteOne()
        //const deletedProducto = await Producto.findByIdAndDelete(req.params.id)

        res.status(200).json({ id: producto._id })
    }

})

module.exports = {
    getProductos,
    setProducto,
    updateProducto,
    deleteProducto
}