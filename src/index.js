import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'
import App from './js/App'
import People from './js/People'
import Projects from './js/Projects'
import ProjectsAll from './js/ProjectsAll'
import ProjectsOne from './js/ProjectsOne'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='people' />
      <Route path='people' component={People} />
      <Route path='projects' component={Projects}>
        <IndexRoute component={ProjectsAll} />
        <Route path='user/:id' component={ProjectsOne} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
)
