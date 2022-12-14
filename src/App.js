import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Account from './components/Account'
import Search from './components/Search'
import Popular from './components/Popular'
import MovieDetailsView from './components/MovieDetailsView'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailsView} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
