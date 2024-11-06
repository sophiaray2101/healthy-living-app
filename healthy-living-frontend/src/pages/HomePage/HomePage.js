import React from "react";
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar.js";
import CategoryList from '../../components/CategoryList/CategoryList.js';
import QuestionAnswerList from "../../components/QuestionAnswerList/QuestionAnswerList.js";
import './HomePage.css';

function HomePage(){
    const [selectedCategory, selectedCategorySetter] = useState(null);

    const handleSelectCategory = (categoryId) => {
        selectedCategorySetter(categoryId);
    }

    
    return(
        <div>
            <Navbar />
            <div className="homePage-layout">
                <CategoryList onSelectCategory={handleSelectCategory} />
                <QuestionAnswerList selectedCategory={selectedCategory} />
            </div>
        </div>

    );

}

export default HomePage;