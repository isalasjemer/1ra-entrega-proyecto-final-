import fs from 'fs'

export default class Api {
    constructor(rutaBD){
        this.rutaBD =__dirname + rutaBD
    }
    async findAll(){
        try {
            const productos = await fs.promises.readFile(this.rutaBD,'utf-8')
            return JSON.parse(productos)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async findById(id){
        try {
            const productos = await this.findAll()
            const resultado = productos.find(e => e.id==id)
            return resultado
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async create(obj){
        try {
            const productos = await this.findAll()
            let id
            let timestamp = Date.now()
            productos.length === 0 ? id = 1 : id = productos[productos.length-1].id + 1
            productos.push({...obj,id,timestamp})

            await fs.promises.writeFile(this.rutaBD,JSON.stringify(productos))
            return id
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async actualizarP(id,product){
        try {
            let producto = await this.findById(id)
            let prod = {...product,id}
            if (producto) {
                producto = prod
                const productos = await this.findAll()
                productos.push(producto)
                await fs.promises.writeFile(this.rutaBD,JSON.stringify(productos))
        }   else {
            console.log('Producto no encontrado')
        }    
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
        
    }

    async deleteP(id){
        try {
            const productos = await this.findAll()
            const products = productos.filter(p => p.id !== Number(id))
            console.log(productos)
            console.log(products)
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(products))
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
        
    }

}