import express from 'express'
import morgan from 'morgan'
import productosRoutes from './routes/productos.js'
import carritoRoutes from './routes/carrito.js'
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/productos',productosRoutes)
app.use('/carrito',carritoRoutes)


const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})