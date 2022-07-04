import axios from 'axios';
import React, { useContext } from 'react'

//Url API`s
import { base_url } from '../Url';

//Context
import { ProductContext } from '../context/ProductContext'

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductMap = (props) => {

    const { getProducts, category, getProductsCategory } = useContext(ProductContext);

    const deleteAttributes = async (attribute_id, product_id) => {
        await axios.get(base_url + `delete/attributes/` + attribute_id)
            .then((res) => {
                deleteProduct(product_id);
            })
    }

    const deleteProduct = async (id) => {
        await axios.get(base_url + `delete/` + id)
            .then((res) => {
                getProducts();
                getProductsCategory(category);
            })
    }

    return (
        <>
            {props.products.map((product) => (
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
                                                    Screen type: {product.screen}
                                                </p>
                                            </li>
                                        </>
                                    }
                                    {product.size &&
                                        <>
                                            <li className="list-group-item">
                                                <p className="card-text">
                                                    Screen size: {product.size} In
                                                </p>
                                            </li>
                                            <li className="list-group-item">
                                                Price: {(product.product_cost * 1.35).toFixed(2)}
                                            </li>
                                        </>
                                    }
                                    {product.CPU &&
                                        <li className="list-group-item">
                                            <p className="card-text">
                                                CPU: {product.CPU}
                                            </p>
                                        </li>
                                    }
                                    {product.RAM &&
                                        <>
                                            <li className="list-group-item">
                                                <p className="card-text">
                                                    RAM: {product.RAM}
                                                </p>
                                            </li>
                                            <li className="list-group-item">
                                                Price: {(product.product_cost * 1.40).toFixed(2)}
                                            </li>
                                        </>
                                    }
                                    {product.number &&
                                        <li className="list-group-item">
                                            <p className="card-text">
                                                Size: {product.number}
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
                                                Price: {(product.product_cost * 1.30).toFixed(2)}
                                            </li>
                                        </>
                                    }
                                </ul>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="btn-group">
                                            <button type="submit" className="btn btn-sm btn-outline-danger" onClick={() => deleteAttributes(product.attributes_id, product.product_id)} >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
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

export default ProductMap