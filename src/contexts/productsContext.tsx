import {createContext, ReactNode, useState} from "react"


const ProductsContext = createContext({data : {}, updateData: (newData) => {} })

export default ProductsContext

type Props = {
    children : ReactNode
}


export function ProductsContextProvider({children}: Props) {

    const [data, setData] = useState("text")

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