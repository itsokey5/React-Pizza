import React from 'react'
import styles from './NotFoundBlock.module.scss'

 const NotFoundBlock: React.FC = () => {
  return (
    
    <div className= {styles.root}>
      <h1>
      <span>😔</span>
      <br/>
      <h1>Ничего не найдено</h1>
    </h1>
    <p className= {styles.description} >Данной станицы не существует</p>
    </div>
    
  )
}

export default NotFoundBlock;
