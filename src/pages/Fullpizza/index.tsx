import React, {useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

import styles from './fullpizza.module.scss';
import { useDispatch, useSelector } from 'react-redux';
// import { addItem } from '../../redux/slices/cartSlice';




const FullPizza: React.FC = () => {

  // const dispatch = useDispatch()

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    imageUrl: string;
    title: string;
    price: string;
    sizes: []
  }>();
  
  

  const items = useSelector((state: any) => state.cart.items );

  const {id} = useParams();
  
  const count = items.find(item => item.id === id)
  
  if(count){
    console.log(count.id)
  }

  React.useEffect(() => {
    setLoading(true);
    axios.get(`https://6301ea7cc6dda4f287af2c08.mockapi.io/pizzas/${id}`)
  .then((res) => res.data
  ).then(res => {
    setData(res)
    setLoading(false)
  })
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



 
  if(loading){
    return <>loading...</>
  }
  

  return (
    <>
    {loading ? null : 
    <div className='container'>
    <div className= {styles.wrapper} >
      <div className= {styles.rootInf} >
      <div className= {styles.imgWrapper}>
      <img className= {styles.pizzaImg} src={data.imageUrl} alt="pizzaImg" />
      </div>
      <div className= {styles.information} >
      <h1 className= {styles.title} >{data.title}</h1>
      <div className= {styles.categories}  >
      
      <ul  className= {styles.sizes} >
        {data.sizes.map((elem) => {
          return <li
          className= {styles.size}
          >{elem} </li>
        })}
      </ul>
      
    
      
      </div  >
      <div className= {styles.buyWrapper} >
      <h4 className= {styles.price} >{data.price} ₴</h4>
      <div className= {styles.btns} >
       <Link to = '/'>
       <button className= {styles.home} >На главную</button>
       </Link>
        <button className= {styles.add}>{`Добавить ${count ? count.count : ''}`}</button>
      </div>
      </div>
      </div>
    </div>
    
    
    </div>
  </div> }
    </>
  )
}

export default FullPizza