import React, { useContext } from 'react'
import productsContext from "../contexts/productsContext"

const Home: React.FunctionComponent<{}> = props => {

    const value = useContext(productsContext)

    value.updateData("text2")

    return (
        <div>
            HOME {value.data}
        </div>
    )
}

export default Home