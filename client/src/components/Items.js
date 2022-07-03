import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { base_url } from '../Url';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Items = () => {
    const { getProducts, products } = useContext(ProductContext);
    console.log(products);

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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
                <div className="col" key={product.product_id}>
                    <div className="card shadow-sm">
                        <h5 className="card-header">{product.product_name}</h5>
                        <div className="card-body">
                            <div className='container text-center'>
                                <div className="d-flex justify-content-center">
                                    <p className="card-text mx-4">Brand: {product.product_brand}</p>
                                    <p className="card-text mx-4">SKU: {product.product_sku}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <h6 className="card-text">Details:</h6>
                                    </li>
                                    {product.screen &&
                                            <>
                                                <li className="list-group-item">
                                                    <p className="card-text">
                                                        Tipo de pantalla: {product.screen}
                                                    </p>
                                                </li>
                                            </>
                                    }
                                    {product.size && 
                                            <>
                                                <li className="list-group-item">
                                                    <p className="card-text">
                                                        Tamaño de pantalla: {product.size}
                                                    </p>
                                                </li>
                                                <li className="list-group-item">
                                                    Precio: {(product.product_cost*1.35).toFixed(2)}
                                                </li>
                                            </>
                                        }
                                    {product.CPU && 
                                            <li className="list-group-item">
                                                <p className="card-text">
                                                    Tipo de procesador: {product.CPU}
                                                </p>
                                            </li>
                                        }
                                    {product.RAM && 
                                            <>
                                                <li className="list-group-item">
                                                    <p className="card-text">
                                                        Tamaño de RAM: {product.RAM}
                                                    </p>
                                                </li>
                                                <li className="list-group-item">
                                                    Precio: {(product.product_cost*1.40).toFixed(2)}
                                                </li>
                                            </>
                                        }
                                    {product.number &&
                                            <li className="list-group-item">
                                                <p className="card-text">
                                                    Talla: {product.number}
                                                </p>
                                            </li>
                                        }
                                    {product.material && 
                                            <>
                                                <li className="list-group-item">
                                                    <p className="card-text">
                                                        Material: {product.material}
                                                    </p>
                                                </li>
                                                <li className="list-group-item">
                                                    Precio: {(product.product_cost*1.30).toFixed(2)}
                                                </li>
                                            </>
                                        }
                                </ul>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary"><FontAwesomeIcon icon={faEdit}/></button>
                                            <button type="submit" className="btn btn-sm btn-outline-danger" onClick={() => deleteAttributes(product.attributes_id, product.product_id)} ><FontAwesomeIcon icon={faTrash}/></button>
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