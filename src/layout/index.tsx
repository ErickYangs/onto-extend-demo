import { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeLay from '../views/Home'
import OntLay from "./Ont";
import EthLay from "./Eth";

const Layout: FC = () => {
  return (
    <div className={'layout-gird'}>
      <Router>
        <Switch>
          <Route path="/ont">
              <OntLay />
          </Route>
          <Route path="/eth">
              <EthLay />
          </Route>
          <Route path="/">
            <HomeLay />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default Layout
