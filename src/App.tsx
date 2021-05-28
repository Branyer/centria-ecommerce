import React from 'react';
import {BrowserRouter as Router, Switch, Route, RouteComponentProps, BrowserRouter } from "react-router-dom"
import routes from "./config/routes"

const App: React.FunctionComponent<{}> = props => {

  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  )


}

export default App;
