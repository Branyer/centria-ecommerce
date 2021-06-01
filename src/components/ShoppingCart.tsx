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

    .product-grid-item-top {
        display:flex;
        justify-content: flex-end;
    }

    .product-grid-item-bottom {
        display:flex;
        align-items: center;
        justify-content: space-around;
        margin: 10px 0;
    }

    .product-image {
        max-width: 100%;
        margin-top:10px;

    }

    .product-badge {
        background-color: black;
        color: white;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
    }

    .product-name {
        color: #673ab7;
    }

    .product-price {
        font-weight: bold;
        font-size: 37px;
    }

`;

const DataViewContainer = styled.div`
   .p-grid.p-nogutter  {
      display:flex;
      flex-wrap: wrap;
      justify-content:space-around;
      align-items:center;
   }
`

const ShoppingCart: React.FunctionComponent<{}> = props => {

    const {data, updateShoppingCart} = useContext(productsContext)

    const {products, shoppingCart} = data

    const [shopProducts, setShopProducts] = useState<object[]>([])

    useEffect(()=> {

        let newShopProducts: object[] = []

        for(let i=0; i< shoppingCart.length; i++) {

            let product = products.filter((p) => p.id === shoppingCart[i].productId )[0]

            newShopProducts.push({product, count: shoppingCart[i].count})

        }

        setShopProducts(newShopProducts)

    }, [data])


    const myToast = useRef<Toast|null>(null);

    function handleRemoveToShoppingCart(id:string) {

        let pos:number|null = null
        let count = 1
        
        for(let i = 0; i<shoppingCart.length; i++) {

            if(shoppingCart[i].productId === id) {
                count = shoppingCart[i].count - 1
                pos = i
            }

        }

        if(count === 0) {

            updateShoppingCart(pos, {productId: id, count}, "remove")

        } else {

            updateShoppingCart(pos, {productId: id, count})
        }

        myToast.current?.show({severity: 'success', summary: 'Se ha completado la accion', detail: 'Se ha eliminado un producto del carrito.'});   
        
    }



    function renderGridItem(data) {

        let {product} = data


        return (
            <GridItem>
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <span className={`product-badge`}>Cantidad: {data.count}</span>
                    </div>
                    <div className="product-grid-item-content">
                        <img className="product-image" src={"images/" + product.srcImages[0]} alt={product.name} />
                        <h2 className="product-name">{product.name}</h2>
                        
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">${product.precio * data.count}</span>
                        <Button icon="pi pi-shopping-cart" label="Remove product" disabled={data.count === 0} onClick={()=> handleRemoveToShoppingCart(product.id)}></Button>
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

    if(shopProducts === []) return null


    return (
        <div className="content-section">
            <Toast ref={myToast} position="bottom-center"/> 
            <div className="card">
                <DataViewContainer>
                    <DataView 
                        header={
                        <h1> 
                            Carrito - 
                            {
                                shopProducts.length > 0 && 
                                <Link to="/paymentForm">
                                    <Button label=" PASAR POR CAJA"></Button> 
                                </Link>
                            }
                        </h1>
                        } 
                        value={shopProducts} 
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

export default ShoppingCart