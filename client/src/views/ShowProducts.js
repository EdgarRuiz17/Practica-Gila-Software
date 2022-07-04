import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

//components
import Items from '../components/Items'

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../context/ProductContext';
import { Label, Select } from '../styles/FormStyles';


const Products = () => {

    const { categories, category, setCategory } = useContext(ProductContext);

    function handleChangeCategory(e) {
        setCategory(e.target.value)
    }

    return (
        <div className="album py-5 bg-light">
            <div className="container">
                <Label htmlFor="" >Categories:</Label>
                <Select className='select mb-4'
                    value={category}
                    onChange={handleChangeCategory}
                >
                    <option value="0" >All</option>
                    {categories.map((objetivo) => (
                        <option value={objetivo.category_id} key={objetivo.category_id}>{objetivo.category_name}</option>
                    ))}
                </Select>
                <div className='d-flex justify-content-center align-items-center'>
                    <Link className='btn btn-primary mb-4' to="/create">
                        <FontAwesomeIcon icon={faPlus} />
                    </Link>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <Items />
                </div>
            </div>
        </div>
    )
}

export default Products