import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'

const Items = () => {
    const { getProducts, products } = useContext(ProductContext);
    console.log(products);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {products.map((product) => (
                <div className="col">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <p className="card-text text-center">{product.product_name}</p>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Details</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default Items