import React, {  useContext } from 'react';
import {BrowserRouter as Router, Switch, Route, RouteComponentProps, Link} from "react-router-dom"
import routes from "./config/routes"
import "primereact/resources/themes/md-light-deeppurple/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "./styles.css"
import { Menubar } from 'primereact/menubar';
import items from "./config/menu_items";
import styled from 'styled-components';
import productsContext from "./contexts/productsContext"
import Logo from "./images/ecommerce-logo.png"
import {ProductsContextProvider} from "./contexts/productsContext"

const ContainerMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid grey;
  border-radius: 10px;
  padding: 5px;
  transition: all ease 0.2s;
  min-width: 120px;
  margin: 0px 10px;
  color: black;

  &:hover {
    transform: scale(0.98)
  }
`;


const ShoppingCartMenu: React.FunctionComponent<{}> = props => {

  const {data:{shoppingCart}} = useContext(productsContext)

  return (
    <>
        <Link to="/shoppingCart" style={{textDecoration:"none", margin: "0"}}>
            <ContainerMenuItem>
                <i className="pi pi-shopping-cart" style={{'fontSize': '2em'}}></i>
                <p style={{marginLeft: "10px"}}>Carrito ({shoppingCart?.length})</p> 
            </ContainerMenuItem>
          </Link>
    </>
  )

}

const LogoMenu: React.FunctionComponent<{}> = props => {

  return (
    <Link to="/" style={{textDecoration:"none"}}>
      <img src={Logo} alt="logo" style={{width:"120px"}}/>
    </Link>
  )


 }

 const ShoppingRecord: React.FunctionComponent<{}> = props => {

    return (
      <Link to="/shoppingRecord" style={{textDecoration:"none"}}>
          <ContainerMenuItem>
             <i className="pi pi-fw pi-book"></i> 
             <p>Registro de Compras</p>
          </ContainerMenuItem>
      </Link>
    )


 }


const App: React.FunctionComponent<{}> = props => {


  return (
    <div>
      <ProductsContextProvider>
        <Router>
          <Menubar 
            model={[]} 
            start={<LogoMenu />} 
            end={
            <>
            <div style={{display:"flex", alignItems:"center", color: "black"}}>
              <ShoppingRecord/>
              <ShoppingCartMenu  />
            </div>
            </>
            }
          />
          <Switch>
            {routes.map((route, index) => 
                <Route 
                  key={`${route.path}-${index}`} 
                  path={route.path} 
                  exact={route.exact} 
                  render={(props: RouteComponentProps<any>) => 
                    <route.component 
                        {...props}
                        {...route?.props}
                    />
                  }
                />
            )}
          </Switch>
        </Router>
      </ProductsContextProvider>
    </div>
  )


}

export default App;
