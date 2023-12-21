const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea el nombre']
    },
    description: {
        type: String,
        required: [true, 'Por favor teclea la descripción']
    },
    quantity: {
        type: Number,
        required: [true, 'Por favor teclea la cantidad']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Producto', productoSchema)
