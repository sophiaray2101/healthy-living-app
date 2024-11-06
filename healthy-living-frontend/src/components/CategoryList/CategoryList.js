import React from "react";
import { useState, useEffect } from "react";

import './CategoryList.css';


function CategoryList({onSelectCategory}) {
    const [categories, categorySetter] = useState([]);

    useEffect( () => {
        handleQuery();
    }, []);

    const handleQuery = () => {
        let parameters = {
            method: "GET"
        }
        console.log("handleQuery called")
        let url = 'http://localhost:8000/api/categories';
        fetch (url, parameters)
            .then (res => res.json())
            .then (json => {
                console.log("API repsponse:",json )
                categorySetter(json.categories);
            })
            .catch(err => console.error("error fetching categories:", err));
    }

    return (
        <div className="category-list-container">
            {categories.map(category => (
                <div
                    key={category.category_id}
                    className="category-list-item" 
                    onClick={() => onSelectCategory(category)}>
                    {category.name}
                </div>
            ))}
        </div>
    )
}

export default CategoryList;