import { Router } from 'express';
import Api from '../apiClass'

const router = Router()
const api = new Api("/dataBase/productos.json")

const isAdmin = true

function adminOrClient(req,res,next){
    if(!isAdmin){
        res.send("No tienes acceso a esta ruta")
    } else {
        next()
    }
}

router.get('/', async (req,res) => {
    const products = await api.findAll()
    res.json(products)
})

router.get('/:id', async (req,res) => {
    const {id} = req.params
    const product = await api.findById(id)
    res.json(product)
})

router.post('/',adminOrClient, async (req,res) => {
    const obj = req.body
    const product = await api.create(obj)
    res.json(product)
})

router.put('/:id',adminOrClient, async (req,res) => {
    const producto = req.body
    const product = await api.actualizarP(producto)
    res.json(product)
})

router.delete('/:id',adminOrClient, async (req,res) => {
    const {id} = req.params
    const product = await api.deleteP(id)
    res.json(product)
})

export default router