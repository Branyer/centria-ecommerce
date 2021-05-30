import {createContext, ReactNode, useState} from "react"

import products from "./products.json"

const ProductsContext = createContext({data : {}, updateData: (newData) => {} })

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