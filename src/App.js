import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import './App.css'
import Home from './components/Home.page'
import RQSuperHeroes from './components/RQSuperHeroes.page'
import SuperHeroes from './components/SuperHeroes.page'
import RQSuperHeroPage from './components/RQSuperHero.page'
import ParallelQueries from './components/ParallelQueries.page'
import DynamicaParallel from './components/DynamicaParallel.page'
import DependentQueries from './components/DependentQueries.page'
import PaginatedQueries from './components/PaginatedQueries.page'
import InfiniteQueries from './components/InfiniteQueries.page'

const queryClient = new QueryClient()

function App() {
  return (
   <QueryClientProvider client={queryClient}>
     <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path='/rq-infinite' element={<InfiniteQueries/>}/>
          <Route path='/rq-paginated' element={<PaginatedQueries/>}/>
        <Route path="/rq-dependent" element={<DependentQueries email='rajuraj@gmail.com'/>}/>
         <Route path="/rq-dynamic-parallel" element={<DynamicaParallel heroIds={[1,2]}/>}/>
          <Route path="/rq-parallel" element={<ParallelQueries/>}/>
          <Route path="/rq-super-hero/:heroId" element={<RQSuperHeroPage/>}/>
          <Route path='/super-heroes' element={<SuperHeroes/>}/>
          <Route path='/rq-super-heroes' element={<RQSuperHeroes/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
   </QueryClientProvider>
  )
}

export default App