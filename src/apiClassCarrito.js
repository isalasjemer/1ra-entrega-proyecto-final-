import fs from 'fs'

export default class ApiC {
    constructor(rutaBD){
        this.rutaBD =__dirname + rutaBD
    }
    async findAll(){
        try {
            const carritos = await fs.promises.readFile(this.rutaBD,'utf-8')
            return JSON.parse(carritos)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async findById(id){
        try {
            const carritos = await this.findAll()
            const resultado = carritos.find(e => e.id==id)
            return resultado
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async create(){
        try {
            const carritos = await this.findAll()
            let id
            let productos = {}
            let timestamp = Date.now()
            carritos.length === 0 ? id = 1 : id = carritos[carritos.length-1].id + 1
            carritos.push({id,productos,timestamp})
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(carritos))
            return id
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async createCarritoProds(id,product){
        try {
            const carritos = await this.findAll()
            const carrito = await this.findById(id)
            const carritoProd = Object.assign(carrito.productos,product)
            carrito.productos=carritoProd
            carritos.map(e=>{
                if (e.id == Number(id)){
                    e.productos = carrito.productos
                }    
            })
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(carritos))
            return product
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async deleteC(id){
        try {
            const carritos = await this.findAll()
            const carritosD = carritos.filter(p => p.id !== Number(id))
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(carritosD))
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
        
    }

    async deleteP(id,id_prod){
        try {
            const carrito = await this.findById(id)
            const products = carrito[1].filter(p => p.id !== Number(id_prod))
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(products))
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }    
    }

}