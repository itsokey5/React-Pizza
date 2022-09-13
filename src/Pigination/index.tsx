import React from 'react'

import styles from './pages.module.scss'

type PagesType = {
  
    pageActive:number,
    setActivePage: (page: number) => void
   
}

 const Pagination: React.FC<PagesType> = ({pageActive, setActivePage}) => {
 
  const pages = [
    1, 2, 3, 4, 5
  ]

  return (
    <div className= {styles.root} >
      <ul className= {styles.pages} >
     { pages.map((page, i) => {
      return <li 
      key={i}
      className= { pageActive === page ? styles.page_active : styles.page}
      onClick = {() => setActivePage(page)} >{page}</li>
     })}
      </ul>
    </div>
  )
}

export default Pagination;