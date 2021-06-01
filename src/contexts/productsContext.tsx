import {createContext, ReactNode, useState} from "react"
import products from "./products.json"

import GlobalData from "../interfaces/globalData"
import Product from "../interfaces/product"
import ShoppingCart from "../interfaces/shoppingCart"
import ShoppingRecord from "../interfaces/shoppingRecord"


let initialProducts: Product[] = []
let initialShoppingCart: ShoppingCart[] = []
let initialShoppingRecord: ShoppingRecord[] = []

let initialData: GlobalData = {  products: initialProducts , shoppingCart: initialShoppingCart, shoppingRecord: initialShoppingRecord}

const ProductsContext = createContext({
    data : initialData , 
    updateProduct: (pos, product) => {}, 
    updateShoppingCart: (pos, product, action="add") => {},
    addShoppingRecord: (record) => {}
    })

export default ProductsContext

type Props = {
    children : ReactNode
}


export function ProductsContextProvider({children}: Props) {

    const [data, setData] = useState({products, shoppingCart: initialShoppingCart, shoppingRecord:initialShoppingRecord })


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
                newData.shoppingCart.push(product)
                else 
                newData.shoppingCart[pos] = product
    
                return newData
    
            })

        } else if(action === "remove"){


            setData((data) => {
    
                const newData = {...data}
                newData.shoppingCart.splice(pos, 1 );
    
                return newData
    
            })
        } 
    }

    function addShoppingRecord(record) {

        setData((data) => {
    
            const newData = {...data}
            newData.shoppingRecord.push(record)

            for(let i = 0; i< newData.products.length; i++) {

                for(let k =0 ; k < newData.shoppingCart.length; k++) {

                    if(newData.shoppingCart[k].productId === newData.products[i].id) {

                        newData.products[i].stock -= newData.shoppingCart[k].count
                        break;

                    }
                }
            }
            newData.shoppingCart = []
            return newData

        })


    }

    return (
        <ProductsContext.Provider value={{data, updateProduct, updateShoppingCart, addShoppingRecord}}>
            {children}
        </ProductsContext.Provider>
    )

}