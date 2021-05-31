import {createContext, ReactNode, useState} from "react"
import products from "./products.json"

import GlobalData from "../interfaces/globalData"
import Product from "../interfaces/product"
import ShoppingCart from "../interfaces/shoppingCart"

let initialProducts: Product[] = []
let initialShoppingCart: ShoppingCart[] = []

let initialData: GlobalData = {  products: initialProducts , shoppingCart: initialShoppingCart}

const ProductsContext = createContext({data : initialData , updateProduct: (pos, product) => {}, updateShoppingCart: (pos, product, action="add") => {} })

export default ProductsContext

type Props = {
    children : ReactNode
}


export function ProductsContextProvider({children}: Props) {

    const [data, setData] = useState({products, shoppingCart: initialShoppingCart})


    function updateProduct (pos, product) {

        setData((data) => {

            const newData = {...data}

            data.products[pos] = product

            return newData

        })
       
    }

    function updateShoppingCart(pos, product, action="add") {

        if(action === "add") {

            setData((data) => {
    
                const newData = {...data}
                
                if(pos === null)
                    data.shoppingCart.push(product)
                else 
                    data.shoppingCart[pos] = product
    
                return newData
    
            })

        }
    }

    return (
        <ProductsContext.Provider value={{data, updateProduct, updateShoppingCart}}>
            
            {children}
        </ProductsContext.Provider>
    )

}