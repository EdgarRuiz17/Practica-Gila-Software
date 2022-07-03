import React from 'react'
import { Link } from 'react-router-dom';

//components
import Items from './Items'

const Products = () => {
  return (
    <div className="album py-5 bg-light">
        <div className="container">
            <div className='d-flex justify-content-center align-items-center'>
                <Link className='btn btn-primary mb-4' to="/create">
                    Add new product
                </Link>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <Items/>
            </div>
        </div>
  </div>
  )
}

export default Products