import React, { useState } from 'react'
import axios from 'axios'

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHandPointUp, faExclamation } from '@fortawesome/free-solid-svg-icons';

//Url API
import { base_url } from '../Url';

//components
import ProductInput from '../components/ProductInput';

//styled components
import { Select, Label, GroupInput, Button, ErrorMessage, SuccessMessage, DuplicatedMessage } from '../styles/FormStyles'

const CreateProduct = () => {
    const [product, setProduct] = useState({ value: "", flag: null });
    const [sku, setSku] = useState({ value: "", flag: null });
    const [brand, setBrand] = useState({ value: "", flag: null });
    const [cost, setCost] = useState({ value: "", flag: null });
    const [attribute1, setAttribute1] = useState({ value: "", flag: null, name: "" });
    const [attribute2, setAttribute2] = useState({ value: "", flag: null, name: "" });
    const [attribute4, setAttribute4] = useState({ value: "in", flag: null, name: "" });
    const [attribute3, setAttribute3] = useState({ value: "GB", flag: null, name: "" });

    const [category, setCategory] = useState("1");

    const [validationForm, setValidation] = useState(null);

    const [validationSKU, setValidationSKU] = useState(null);

    const expression = {
        name: /^[a-zA-Z0-9À-ÿ\s]{4,20}$/, // Letters, Numbers and spaces. Min 4 characters and max 20.
        number: /^[1-9]\d{0,7}(?:\.\d{1,4})?$/, // 1 to 7 numbers, can add decimals.
        sku: /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i, // Numbers and letters, minimum 1 letter and 1 digit.
        brand: /^[a-zA-Z0-9À-ÿ\s]{2,16}$/, // Letters, numbers and spaces. Min 2 characters and max 16
        onlynumber: /^([0-9]{1,3})$/,
        onlyletters: /^([a-zA-Z]{3,10})$/
    }

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
        setAttribute1({...attribute1, value: "", flag: "", name: ""});
        setAttribute2({...attribute2, value: "", flag: "", name: ""});
        setAttribute3({...attribute3, value: "GB", flag: "", name: ""});
        setAttribute4({...attribute4, value: "in", flag: "", name: ""});
    }

    const handelChangeScreenType = (e) => {
        setAttribute2({...attribute2, value: e.target.value, name: e.target.name});
    }

    const handelChangeUnits = (e) => {
        setAttribute3({...attribute3, value: e.target.value, name: e.target.name});
    }

    const handelChangeUnitsNumber = (e) => {
        setAttribute4({...attribute4, value: e.target.value, name: e.target.name});
    }

    const validation = () => {
        setValidation(null);
        if( !(product.flag === 'true') || !(brand.flag === 'true')  || !(sku.flag === 'true') || 
        !(cost.flag === 'true') || !(attribute1.flag === 'true') ){
            setValidation(false);
        }else{
            validateSKU();
        }
    }

    const validateSKU = async () => {
        if(sku.value){
            await axios.get(base_url+`sku/`+sku.value)
            .then((res) =>{
            console.log(res.data.response);
                if(res.data.response){
                    setValidationSKU(true);
                    saveProduct();
                }else{
                    setValidationSKU(false);
                }
            })
        }
    }

    const saveProduct = async() => {
            var InsertArray = 
            [{
                product_name: product.value,
                product_sku: sku.value,
                product_brand: brand.value,
                product_cost: cost.value,
                fk_category: category
            }];
            await axios.post(base_url+`add`,InsertArray)
            .then((res) => {
            console.log(res);
            insertAttributes(res.data.id);
            });
    }

    const insertAttributes = async(Insertedid) => {
        var name = attribute2.name;
        var name2 = attribute1.name;
        var union = attribute2.value;
        if(category === "2"){
            union = attribute2.value+attribute3.value;
        }else if(category === "3"){
            union = attribute2.value+attribute4.value;
        }

        var AttributesInsert = 
        [
            {
                attribute_category: JSON.stringify({[name]: union
                     , [name2]: attribute1.value}),
                fk_product: Insertedid
            }
        ]
        await axios.post(base_url+`add/attributes`, AttributesInsert)
        .then((res) => {
            console.log(res);
            setValidationSKU(null);
            setValidation(true);
        });
    }


    return (
        <div className='container'>
            <div className='d-flex'>
                <Button type="submit" className='mt-4 w-25'>
                    Back
                </Button>
            </div>
            <div className='card mt-4'>
                <div class="card-header">
                    Create new product
                </div>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <ProductInput
                            state={product}
                            changeState={setProduct}
                            label="Product Name:"
                            placeholder="Samsung Screen 4k"
                            name="product"
                            type="text"
                            error="The product name requires between 4 and 20 letters, and cannot contain special characters"
                            regularExpresion={expression.name}
                        />
                    </li>

                    <li className='list-group-item d-flex justify-content-center align-items-center'>
                        <ProductInput
                            state={sku}
                            changeState={setSku}
                            label="Product SKU:"
                            placeholder="243AA"
                            name="sku"
                            type="text"
                            error="The product sku requires between 2 and 6 letters, only numbers and characters accepted"
                            regularExpresion={expression.sku}
                        />
                        <ProductInput
                            state={brand}
                            changeState={setBrand}
                            label="Product Brand:"
                            placeholder="Samsung"
                            name="brand"
                            type="text"
                            error="The product brand requires between 2 and 16 letters, only numbers and characters accepted"
                            regularExpresion={expression.brand}
                        />
                        <ProductInput
                            state={cost}
                            changeState={setCost}
                            label="Product Cost:"
                            placeholder="500"
                            name="cost"
                            type="text"
                            error="The product cost requires between 2 and 6 digits, only digits and decimals accepted"
                            regularExpresion={expression.number}
                        />
                    </li>

                    <li className='list-group-item'>
                        <div className="form-group">
                            <Label htmlFor="type" >Select the category:</Label>
                            <Select className="form-control mx-1 " value={category} name="category" id="category" onChange={handleChangeCategory}>
                                <option value="1">TV</option>
                                <option value="2">Laptop</option>
                                <option value="3">Shoes</option>
                            </Select>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="row mt-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Unique attributes</h5>
                        <li className='list-group-item d-flex justify-content-center align-items-center'>
                            {category === "1" &&
                                <>
                                    <ProductInput
                                        state={attribute1}
                                        changeState={setAttribute1}
                                        label="Screen Size:"
                                        placeholder="40"
                                        name="size"
                                        type="text"
                                        error="The screen size requires between 2 and 3 digits, only numbers accepted"
                                        regularExpresion={expression.onlynumber}
                                    />
                                    <div className="form-group mx-2 w-50">
                                        <GroupInput>
                                            <Label htmlFor="attribute2" >Select the screen type:</Label>
                                            <Select
                                                className="form-control mx-1"
                                                name="screen"
                                                id="attribute2"
                                                onChange={handelChangeScreenType}
                                                value={attribute2.value}
                                            >
                                                <option value="LCD">LCD</option>
                                                <option value="LED">LED</option>
                                                <option value="OLED">OLED</option>
                                            </Select>
                                        </GroupInput>
                                    </div>
                                </>
                            }
                            {category === "2" &&
                                <>
                                    <ProductInput
                                        state={attribute1}
                                        changeState={setAttribute1}
                                        label="CPU:"
                                        placeholder="AMD Ryzen 5400"
                                        name="CPU"
                                        type="text"
                                        error="The CPU requires between 3 and 15 characters, only numbers and letters accepted"
                                        regularExpresion={expression.name}
                                    />
                                    <ProductInput
                                        state={attribute2}
                                        changeState={setAttribute2}
                                        label="RAM:"
                                        placeholder="8"
                                        name="RAM"
                                        type="number"
                                        error="The RAM size requires between 1 and 3 digits, only numbers accepted"
                                        regularExpresion={expression.onlynumber}
                                    />
                                    <div className="form-group w-25">
                                        <GroupInput>
                                            <Label htmlFor="attribute2" >Units:</Label>
                                            <Select
                                                className="form-control mx-1"
                                                name="attribute2"
                                                id="attribute2"
                                                value={attribute3.value}
                                                onChange={handelChangeUnits}
                                            >
                                                <option value="GB">GB</option>
                                                <option value="MB">MB</option>
                                            </Select>
                                        </GroupInput>
                                    </div>
                                </>
                            }
                            {category === "3" &&
                                <>
                                    <ProductInput
                                        state={attribute1}
                                        changeState={setAttribute1}
                                        label="Material:"
                                        placeholder="Lether"
                                        name="material"
                                        type="text"
                                        error="The material requires between 2 and 10 letters, only letters accepted"
                                        regularExpresion={expression.onlyletters}
                                    />
                                    <ProductInput
                                        state={attribute2}
                                        changeState={setAttribute2}
                                        label="Number:"
                                        placeholder="26"
                                        name="number"
                                        type="text"
                                        error="The number size requires between 2 and 3 digits, only numbers accepted"
                                        regularExpresion={expression.onlynumber}
                                    />
                                    <div className="form-group w-25">
                                        <GroupInput>
                                            <Label htmlFor="attribute2" >Units:</Label>
                                            <Select
                                                className="form-control mx-1"
                                                name="attribute2"
                                                id="attribute2"
                                                value={attribute4.value}
                                                onChange={handelChangeUnitsNumber}
                                            >
                                                <option value="in">in</option>
                                                <option value="cm">cm</option>
                                                <option value="ft">ft</option>
                                            </Select>
                                        </GroupInput>
                                    </div>
                                </>
                            }
                        </li>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                {validationSKU === false && <DuplicatedMessage>
					<p>
						<FontAwesomeIcon icon={faExclamation}/>
						<b>Caution:</b> The SKU its duplicated.
					</p>
				</DuplicatedMessage>}
                {validationForm === false && <ErrorMessage>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle}/>
						<b>Error:</b> Please fill in the fields correctly.
					</p>
				</ErrorMessage>}
                {validationForm === true && <SuccessMessage>
                        <p>
                            <FontAwesomeIcon icon={faHandPointUp}/>
						    <b>Success:</b> Product created successfully!
                        </p>
                </SuccessMessage>}
                <Button type="submit" className='mt-4 mb-4' onClick={validation}>
                    Create
                </Button>
            </div>
        </div>

    )
}

export default CreateProduct