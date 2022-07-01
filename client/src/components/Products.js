import React from 'react'

//components
import Items from './Items'

const Products = () => {
  return (
    <div class="album py-5 bg-light">
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <Items/>
            </div>
        </div>
  </div>
  )
}

export default Products