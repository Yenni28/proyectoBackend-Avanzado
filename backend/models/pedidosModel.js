const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Producto'
    },
    quantity: {
        type: Number,
        required: [true, 'Por favor teclea la cantidad']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Pedido', pedidoSchema)
