import React, {useState, useContext, useEffect} from 'react'
import { InputText } from 'primereact/inputtext';
import styled from 'styled-components';
import { RadioButton } from 'primereact/radiobutton';
import productsContext from "../contexts/productsContext"

const Form = styled.form`
display: flex;
align-items:center;
flex-direction:column;
font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;

input {
    margin: 5px;
}

input[type="submit"] {
    cursor: pointer;
    border:none;
    outline:none;
    background: #48c748;
    color: white;
    padding: 20px;
    font-weight: bold;
    border-radius: 10px;
}

.radio-button {
    display: flex;
    align-items:center;
    justify-content:space-between;
    margin: 15px 0px;
}

.radio-button p {
    margin-left: 20px;
}

.product-name {
    color: blue;
    font-weight: bold;
}
`

interface FormData {
    name: string,
    lastname: string,
    email: string,
    paymentMethod: string
}

interface ProductShoppingCart {
    product: { name: string, precio: number},
    count: number
}



const PaymentForm: React.FunctionComponent<{}> = props => {

    const [formData, setFormData] = useState<FormData>({name: "", lastname: "", email: "", paymentMethod: ""})

    const {data, updateShoppingCart} = useContext(productsContext)

    const {products, shoppingCart} = data

    const [shopProducts, setShopProducts] = useState<ProductShoppingCart[]>([])
    const [total, setTotal] = useState<number>(0);

    useEffect(()=> {

        let newShopProducts: ProductShoppingCart[] = []
        let totalCount = 0

        for(let i=0; i< shoppingCart.length; i++) {

            let product = products.filter((p) => p.id === shoppingCart[i].productId )[0]

            newShopProducts.push({product, count: shoppingCart[i].count})

            totalCount += product.precio * shoppingCart[i].count

        }
        setTotal(totalCount)
        setShopProducts(newShopProducts)

    }, [data])

    return (
        <div className="content-section">
            <div className="card">
                       
                <Form 
                onSubmit={(e) => {
                    e.preventDefault(); 
                    
                }}
                >
                    <h1>FORMULARIO DE PAGO</h1>
                  
                     <span className="p-float-label">
                        <InputText id="name" onChange={(e) => setFormData((d) => ({...d, name: e.target.value}))} required/>
                        <label htmlFor="name">Nombre</label>
                     </span>
                     <span className="p-float-label">
                        <InputText id="lastname" onChange={(e) => setFormData((d) => ({...d, name: e.target.value}))} required />
                        <label htmlFor="lastname">Apellidos</label>
                     </span>
                     <span className="p-float-label">
                        <InputText id="email" onChange={(e) => setFormData((d) => ({...d, name: e.target.value}))} required type="email"/>
                        <label htmlFor="email">Email</label>
                     </span>
                     <div>
                         <h3>Metodo de pago</h3>
                         <div className="radio-button">
                            <RadioButton value="paypal" name="paymentMethod" onChange={(e) => setFormData(d => ({...d, paymentMethod: e.value}))} checked={formData.paymentMethod === 'paypal'} />
                             <div>
                                <i className="pi pi-paypal"></i> Paypal
                             </div>
                         </div>
                         <div className="radio-button">
                             <RadioButton value="zelle" name="paymentMethod" onChange={(e) => setFormData(d => ({...d, paymentMethod: e.value}))} checked={formData.paymentMethod === 'zelle'} />
                              <div>
                                <i className="pi pi-wallet"></i> Zelle
                              </div>
                         </div>
                     </div>
                    
                        
                        {shopProducts.map((data, i) => {

                            return (
                                <p key={i}>
                                    <span className="product-name">{data.product.name} </span> x {data.count} = ${data.product.precio*data.count}
                                </p>
                            )


                        })}
                        <h3>TOTAL: ${total}</h3>
                     
                     <input type="submit" value="REALIZAR PAGO" />
                </Form>
                   
            </div>
        </div>
    )
}

export default PaymentForm
