import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { base_url } from '../Url';

const Items = () => {
    const { getProducts, products } = useContext(ProductContext);
    console.log(products);

    useEffect(() => {
        getProducts();
    }, []);

    const deleteAttributes = async(attribute_id, product_id) => {
        await axios.get(base_url+`delete/attributes/`+attribute_id)
        .then((res)=>{
            console.log(res);
            deleteProduct(product_id);
        })
    }

    const deleteProduct = async(id) => {
        await axios.get(base_url+`delete/`+id)
        .then((res)=>{
            getProducts();
            console.log(res);
        })
    }


    return (
        <>
            {products.map((product) => (
                <div className="col">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{product.product_name}</h5>
                            <div className='container text-center'>
                                <p className="card-text">Brand: {product.product_brand}</p>
                                <p className="card-text">SKU: {product.product_sku}</p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <h5 className="card-text">Details:</h5>
                                    </li>
                                    {product.screen ? 
                                            <li class="list-group-item">
                                                <p className="card-text">Tipo de pantalla: {product.screen}</p>
                                            </li>
                                        :
                                            null
                                        }
                                    {product.size ? 
                                            <li class="list-group-item">
                                                <p className="card-text">Tamaño de pantalla: {product.size}</p>
                                            </li>
                                        :
                                            null
                                        }
                                    {product.CPU ? 
                                            <li class="list-group-item">
                                                <p className="card-text">Tipo de procesador: {product.CPU}</p>
                                            </li>
                                        :
                                            null
                                        }
                                    {product.RAM ? 
                                            <li class="list-group-item">
                                                <p className="card-text">Tamaño de RAM: {product.RAM}</p>
                                            </li>
                                        :
                                            null
                                        }
                                    {product.number ? 
                                            <li class="list-group-item">
                                                <p className="card-text">Talla: {product.number}</p>
                                            </li>
                                        :
                                            null
                                        }
                                    {product.material ? 
                                            <li class="list-group-item">
                                                <p className="card-text">Material: {product.material}</p>
                                            </li>
                                        :
                                            null
                                        }
                                    <li class="list-group-item">Precio: {product.product_cost}$</li>
                                </ul>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                            <button type="submit" className="btn btn-sm btn-outline-danger" onClick={() => deleteAttributes(product.attributes_id, product.product_id)} >Delete</button>
                                        </div>
                                    </li>
                                </ul>
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