import React   from "react";
import { useWhyDidYouUpdate } from "ahooks";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({value , onClickCategory}) => {
  
  useWhyDidYouUpdate('Categories', {value , onClickCategory})

 const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые', 
  'Закрытые'
 ]

 

return(
  <div className="categories">
              <ul>
                {categories.map((elem, i) => {
                  return <li
                  key={i} 
                  className= {i === value ? "active" : ''}
                  onClick = {() => onClickCategory(i)}
                  >{elem}</li>
                })}
              </ul>
            </div>
)
})

export default Categories;