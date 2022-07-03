import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'

const Items = () => {
    const { getProducts, products, attributes } = useContext(ProductContext);
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
                            {product.screen ? 
                                    <>
                                    <p className="card-text text-center">Tipo de pantalla:</p>
                                    <p className="card-text text-center">{product.screen}</p>
                                    </>
                                :
                                    null
                                }
                            {product.size ? 
                                    <>
                                    <p className="card-text text-center">Tamaño de pantalla:</p>
                                    <p className="card-text text-center">{product.size}</p>
                                    </>
                                :
                                    null
                                }
                            {product.CPU ? 
                                    <>
                                    <p className="card-text text-center">Tipo de procesador:</p>
                                    <p className="card-text text-center">{product.CPU}</p>
                                    </>
                                :
                                    null
                                }
                            {product.RAM ? 
                                    <>
                                    <p className="card-text text-center">Tamaño de RAM:</p>
                                    <p className="card-text text-center">{product.RAM}</p>
                                    </>
                                :
                                    null
                                }
                            {product.number ? 
                                    <>
                                    <p className="card-text text-center">Talla:</p>
                                    <p className="card-text text-center">{product.number}</p>
                                    </>
                                :
                                    null
                                }
                            {product.material ? 
                                    <>
                                    <p className="card-text text-center">Material:</p>
                                    <p className="card-text text-center">{product.material}</p>
                                    </>
                                :
                                    null
                                }
                            <div className="d-flex justify-content-center align-items-center">
                              
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-danger">Delete</button>
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