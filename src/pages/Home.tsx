import React, {useEffect} from 'react'
import '../scss/app.scss';
import qs from 'qs'
import {useNavigate} from 'react-router-dom'
import {sorts} from '../components/sorts/sort';
// import { useWhyDidYouUpdate } from "ahooks";

//ReactComponenets
import Categories from '../components/categories/categories';
import Sort from '../components/sorts/sort';
import Pizza from '../components/pizza/pizza';
import { Skeleton } from '../components/pizza/skeleton';
import Pagination from '../Pigination';



//redux
import { useSelector} from 'react-redux'
import { setCategoryId, setPage, setFilters } from "../redux/slices/filterSlice";
import {  fetchPizzas, setLoading } from "../redux/slices/pizzasSlice";
import { searchSelector } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
// import { loadItems } from '../redux/slices/cartSlice';




//HomeComponent
  const Home: React.FC = () => {

  const navigate = useNavigate();
//useSelectorConsts  
 const categoryId = useSelector((state: any) => state.filter.categoryId );
 const sortType = useSelector((state: any) => state.filter.sortType );
 const page = useSelector((state: any) => state.filter.page );
 const pizzaData = useSelector((state: any) => state.pizzas.items );
 const loading = useSelector((state: any) => state.pizzas.loadingStatus );
 const searchValue = useSelector(searchSelector)
//  const items =  useSelector((state: any) => state.cart.items );

//States
  
  // const [loading, setLoading] = useState(true);
  const isMounted = React.useRef(false)
  
  
  
  //dispatch
  const dispatch = useAppDispatch();

 

  //functions
  const onClickCategory = React.useCallback( (i: number) => {
    dispatch(setCategoryId(i));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
  const setActivePage = (i: number) => {
    dispatch(setPage(i));
  }  
   
  

//useEffect
useEffect(() => {
  if (window.location.search){
    const params = qs.parse(window.location.search.substring(1));
  
  const sortType = sorts.find(elem => elem.type  || elem.sortProperty === params.type || params.sortProperty);
  const res = {...params, sortType}
    dispatch(setFilters(res))
  
  }
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
useEffect(() => {
  if(isMounted.current) {
    const link = qs.stringify({
      categoryId,
      searchValue,
      page,
      
      type: sortType.type,
      sortProperty: sortType.sortProperty
    })
    
    navigate(`?${link}`)
  }

  isMounted.current = true
  

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [categoryId, sortType, searchValue, page])
useEffect(() => {
  
  loadContent()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [categoryId, sortType, searchValue, page])




const loadContent = async () => {
  dispatch(setLoading(true));
        
        
      try{
       await
      
        dispatch(fetchPizzas({
          searchValue,
          categoryId,
          sortType,
          page
        }));
        dispatch(setLoading(false));
      }catch{
        
      }   
} 


  return (
    <div className="container">
    <div className="content__top">
            <Categories 
              value={categoryId}
              onClickCategory = {onClickCategory}
              />
            <Sort />
             
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
         {loading === 'loading' ?
         <>
         {[...new Array(4)].map((_, i) => <Skeleton key={i} /> )  }
         </>
         : 
         
         pizzaData.map((elem) => (
          <Pizza
          {...elem}
          key = {elem.id}
          />
          
        ))
      
         }   
          </div>
          
          <Pagination pageActive = {page} setActivePage = {setActivePage} />
          </div>
          
  )
  
}

export default Home;