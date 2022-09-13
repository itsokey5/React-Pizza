import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import {addItem, CartItem} from '../../redux/slices/cartSlice'


type PizzaTypes = {
  price: number,
  title: string,
  sizes: number[],
  imageUrl: string,
  id: string,
  types: number[]
}

const Pizza: React.FC<PizzaTypes> = ({price = 0, title = 'PizzaName', sizes,  imageUrl, id, types} ) => {
  const [sizeValue, setSizeValue] = React.useState(0)
  const [typeValue, setSizeIndex] = React.useState(0);

  const cartItem = useSelector((state: any) => state.cart.items.find(item => item.id === id) );



 const addedCount = cartItem ? cartItem.count : 0;
  


  const dispatch = useDispatch()


  const onClickAdd = () => {
    const item: CartItem = {
      id,
      imageUrl,
      title,
      price,
      type: typeNames[typeValue],
      size: sizeValue,
      count: 0
    }
    dispatch(addItem(item))
  }


  const typeNames = ['тонкое',
  'традиционное']
    
 

  const onAdd = () => {
    onClickAdd()
    
  }


  return(
    
    <div className="pizza_block-wrapper" >
      <div className="pizza-block">
      <Link to = {`/pizza/${id}`} >
      <img
    className="pizza-block__image"
    src= {imageUrl}
    alt= {title}
  />
      </Link>
  
  <h4 className="pizza-block__title">{title}</h4>
  <div className="pizza-block__selector">
    <ul>
    {types.map((typeId, i) => (
        <li
        key={i}
        onClick={() => setSizeIndex(i)}
        className = {i === typeValue ? 'active' : ''}
        >{typeNames[typeId]}</li>
      ))}
    </ul>
    <ul>
      {sizes.map((elem, i) => (
        <li
        key={i}
        onClick={() => setSizeValue(i)}
        className = {i === sizeValue ? 'active' : ''}
        >{elem} см.</li>
      ))}
    </ul>
  </div>
  <div className="pizza-block__bottom">
    <div className="pizza-block__price">от {price} ₴</div>
    <button onClick={() => onAdd()} className="button button--outline button--add">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
          fill="white"
        />
      </svg>
      <span >Добавить</span>
      <i>{addedCount}</i>
    </button>
  </div>
</div>
    </div>
  )
}

export default Pizza;