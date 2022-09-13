import React from 'react'
import { Link } from "react-router-dom";

import NotFoundBlock from './NotFoundBlock';


export const NotFound: React.FC = () => {
  return (
    <div>
      <NotFoundBlock/>
      <Link to = '/' >
        <button>Назад на главную</button>
      </Link>
    </div>
    
  )
}

export default NotFound;