import { lazy } from 'react'
import ROUTE_PATHS from './utils/routePaths'

const Home = lazy(() => import('./pages/Home/Home'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

const routes = [
  { path: ROUTE_PATHS.HOME, component: Home, exact: true },
  { path: ROUTE_PATHS.ABOUT, component: About },
  { path: ROUTE_PATHS.NOT_FOUND, component: NotFound },
]

export default routes
