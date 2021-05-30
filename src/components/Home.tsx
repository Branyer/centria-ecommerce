import React, { useContext } from 'react'
import productsContext from "../contexts/productsContext"

const Home: React.FunctionComponent<{}> = props => {

    const {data, updateData} = useContext(productsContext)

    // value.updateData("text2")

    return (
        <div>
            HOME {JSON.stringify(data[0], null, 2)}
        </div>
    )
}

export default Home