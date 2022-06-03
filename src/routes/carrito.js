import { Router } from "express";
import ApiC from '../apiClassCarrito'
import Api from '../apiClass'

const router = Router()
const apiP = new Api("/dataBase/productos.json")
const api = new ApiC("/dataBase/carritos.json")

const isAdmin = true

function adminOrClient(req,res,next){
    if(!isAdmin){
        res.send("No tienes acceso a esta ruta")
    } else {
        next()
    }
}

router.get('/:id/productos', async (req,res) => {
    const {id} = req.params
    const product = await api.findById(id)
    res.json(product)
})

router.post('/',adminOrClient, async (req,res) => {
    const product = await api.create()
    res.json(product)
})

router.post('/:id/productos/:id_prod',adminOrClient, async (req,res) => {
    const {id} = req.params
    const {id_prod} = req.params
    const product = await apiP.findById(id_prod)
    const produc = await api.createCarritoProds(id,product)
    res.json(produc)
})

router.delete('/:id',adminOrClient, async (req,res) => {
    const {id} = req.params
    const carritos = await api.deleteC(id)
    res.json(carritos)
})


router.delete('/:id/productos/:id_prod',adminOrClient, async (req,res) => {
    const {id} = req.params
    const {id_prod} = req.params
    const produc = await api.deleteP(id,id_prod)
    res.json(produc)
})



export default router