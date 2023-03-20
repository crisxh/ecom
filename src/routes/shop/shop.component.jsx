import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategoriesAsync } from '../../store/categories/category.action';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
};

export default Shop;