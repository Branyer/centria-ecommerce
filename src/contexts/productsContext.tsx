import {createContext, ReactNode, useState} from "react"

import products from "./products.json"

import Product from "../interfaces/product"

let initialData: Product[] = []

const ProductsContext = createContext({data : initialData , updateData: (newData) => {} })

export default ProductsContext

type Props = {
    children : ReactNode
}


export function ProductsContextProvider({children}: Props) {

    const [data, setData] = useState(products)

    function updateData (newData) {

        setData(newData)
        return
    }

    return (
        <ProductsContext.Provider value={{data, updateData}}>
            {children}
        </ProductsContext.Provider>
    )

}