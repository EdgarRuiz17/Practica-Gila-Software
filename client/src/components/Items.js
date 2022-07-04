import React, { useContext, useEffect, useState } from 'react'

//Context
import { ProductContext } from '../context/ProductContext'

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

//Components
import ProductMap from './ProductMap';

const Items = () => {
    const { getProducts, products, getCategories, category, getProductsCategory, productsCategory } = useContext(ProductContext);

    const [currentPage, setCurrentPage] = useState(0)

    const filteredProducts = () => {
        if (category !== "0") {
            return productsCategory.slice(currentPage, currentPage + 6);
        } else {
            return products.slice(currentPage, currentPage + 6);
        }

    }

    const nextPage = () => {
        if (category !== "0") {
            if (productsCategory.length > currentPage + 5) {
                setCurrentPage(currentPage + 5);
            }
        } else {
            if (products.length > currentPage + 5) {
                setCurrentPage(currentPage + 5);
            }
        }
    }
    
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 5);
        }
    }

    useEffect(() => {
        getProducts();
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getProductsCategory(category);
        setCurrentPage(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    useEffect(()=> {
        setCurrentPage(0);
    },[products])


    return (
        <>
            {productsCategory.length ?
                <>
                    <ProductMap
                        products={filteredProducts()}
                    />
                    <div className='d-flex m-2'>
                        {productsCategory.length > 6 &&
                            <>
                                {currentPage !== 0 &&
                                    <button className='btn btn-dark' onClick={prevPage}>
                                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                                        Prev Page
                                    </button>
                                }
                                {productsCategory.length > currentPage + 5 &&
                                    <button className='btn btn-dark' onClick={nextPage}>
                                        Next Page <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                                    </button>
                                }
                            </>
                        }
                    </div>
                </>
                :
                <>
                    {category === "0" ?
                        <>
                            <ProductMap
                                products={filteredProducts()}
                            />
                            <div className='d-flex m-2'>
                                {products.length > 6 &&
                                    <>
                                        {currentPage !== 0 &&
                                            <button className='btn btn-dark' onClick={prevPage}>
                                                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                                                Prev Page
                                            </button>
                                        }
                                        {products.length > currentPage + 5 &&
                                            <button className='btn btn-dark' onClick={nextPage}>
                                                Next Page <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                                            </button>
                                        }

                                    </>
                                }
                            </div>
                        </>
                        :
                        <h6 className='text text-dark'>There`s no products in this category.</h6>
                    }

                </>
            }

        </>
    )
}

export default Items