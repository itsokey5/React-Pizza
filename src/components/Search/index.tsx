import React  from 'react'

import styles from './Search.module.scss'
// import { SearchContext } from '../../App'
import debounce from "lodash.debounce"; 
import { setSearchValue } from '../../redux/slices/filterSlice';
import {  useDispatch, useSelector } from 'react-redux'



const Search: React.FC = () => {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dispatch = useDispatch();
  const reduxValue = useSelector((state: any ) => state.filter.searchValue );

  React.useEffect(() => {
    setValue(reduxValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCLickClear = () => {
    setValue('')
    dispatch(setSearchValue(''))
    inputRef.current?.focus()
  }

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const udateSearchValue = React.useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value))
    }, 300)
    , []
  )
 

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setValue(event.target.value)
    udateSearchValue(event.target.value)
  }

  

  return (
    <div className= {styles.root}>
       <svg  className= {styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g id="search"><path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/></g>
       </svg>
      <input
      ref = {inputRef} 
      className= {styles.input} 
      value = {value} 
      onChange = {(e) => setInputValue(e)} 
      placeholder='Поиск...' >
      </input>
      <button className= {styles.xbtn} onClick = {() => onCLickClear()} >x</button>
    </div>
    
  )
}

export default Search;
