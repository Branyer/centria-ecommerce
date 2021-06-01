import React, { useContext, useEffect, useRef, useState } from 'react'
import {Link} from "react-router-dom"
import productsContext from "../contexts/productsContext"
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import { Toast } from 'primereact/toast';

const GridItem = styled.div`
    
    min-width: 300px;
    width: 500px;
    height: fit-content;
    padding: 30px;
    box-shadow: 0px 0px 5px grey;
    margin: 10px;
    border-radius: 5px;

`;

const DataViewContainer = styled.div`
   .p-grid.p-nogutter  {
      display:flex;
      flex-wrap: wrap;
      justify-content:space-around;
      align-items:center;
   }
`

const ShoppingRecord: React.FunctionComponent<{}> = props => {

    const {data, updateShoppingCart} = useContext(productsContext)

    const {products, shoppingCart, shoppingRecord} = data

    const [recordData, setRecordData] = useState<object[]>([])

    useEffect(()=> {

        let newRecordData: object[] = []

        for(let i=0; i<shoppingRecord.length; i++) {

            console.log(shoppingRecord[i])


            let newShopProducts: object[] = []

            for(let j=0; j< shoppingRecord[i].shoppingCart.length; j++) {

                let product = products.filter((p) => p.id === shoppingRecord[i].shoppingCart[j].productId )[0]
                console.log(product)
                newShopProducts.push({product, count:shoppingRecord[i].shoppingCart[j].count})

            }

            newRecordData.push({...shoppingRecord[i], shoppingCart: newShopProducts })


        }

        setRecordData(newRecordData);

    }, [data])


    function renderGridItem(data) {

        let {shoppingCart} = data

        return (
            <GridItem>
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <p><b>Nombre: </b>{data.name}</p>
                        <p><b>Apellido: </b>  {data.lastname}</p>
                        <p><b>Email: </b> {data.email}</p>
                        <p><b>Metodo de Pago: </b> {data.paymentMethod}</p>
                    </div>
                    <div className="product-grid-item-content">
                        {
                            shoppingCart.map((d, i) => {

                                return (
                                    <p key={i}> {d.product.name} x  {d.count} = ${d.product.precio * d.count}  </p>
                                )


                            })
                        }
                        
                        
                    </div>
                    <div className="product-grid-item-bottom">
                        {/* <span className="product-price">${product.precio * data.count}</span> */}
                       
                    </div>
                </div>
            </GridItem>
        );
    }

    function itemTemplate(product, layout) {
        if (!product) {
            return;
        }

        return renderGridItem(product);
    }



    return (
        <div className="content-section">
         
            <div className="card">
                <DataViewContainer>
                    <DataView 
                        header={
                        <h1> 
                            Registro de Compras
                        </h1>
                        } 
                        value={recordData} 
                        layout={"grid"} 
                        itemTemplate={itemTemplate} 
                        paginator 
                        rows={5}
                    />
                </DataViewContainer>
            </div>
        </div>
    )
}

export default ShoppingRecord