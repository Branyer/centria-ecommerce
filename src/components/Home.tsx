import React, { useContext, useEffect, useRef } from 'react'
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

const Home: React.FunctionComponent<{}> = props => {

    const {data:{products, shoppingCart}, updateShoppingCart} = useContext(productsContext)
    const myToast = useRef<Toast|null>(null);
    function handleAddToShoppingCart(id:string) {

        let pos:number|null = null
        let count = 1
        
        for(let i = 0; i<shoppingCart.length; i++) {

            if(shoppingCart[i].productId === id) {
                count = shoppingCart[i].count + 1
                pos = i
            }

        }


        updateShoppingCart(pos, {productId: id, count})
        myToast.current?.show({severity: 'success', summary: 'Se ha complatado la accion', detail: 'Se ha añadido un producto al carrito.'});   
        
    }



    function renderGridItem(data) {
        return (
            <GridItem>
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <span className={`product-badge`}>Stock: {data.stock}</span>
                    </div>
                    <div className="product-grid-item-content">
                        <img className="product-image" src={"images/" + data.srcImages[0]} alt={data.name} />
                        <h2 className="product-name">{data.name}</h2>
                        <p className="product-description">{data.description}</p>
                        
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">${data.precio}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.stock === 0} onClick={()=> handleAddToShoppingCart(data.id)}></Button>
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
            <Toast ref={myToast} position="bottom-center"/> 
            <div className="card">
                <DataViewContainer>
                    <DataView 
                        header={<h1> Productos </h1>} 
                        value={products} 
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

export default Home