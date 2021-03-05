/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import RelatedProductsCarousel from './Carousels/RelatedProductsCarousel/RelatedProductsCarousel.jsx';
import OutfitCarousel from './Carousels/OutfitCarousel/OutfitCarousel.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import getAverageRating from './helperFunctions/getAverageRating.jsx';
import getDefaultStyle from './helperFunctions/getDefaultStyle.jsx';
import './App.css';

const App = () => {
  const [currentProduct, setCurrentProduct] = useState({});

  const fetchProductInfo = (productsResponse, putInState) => {
    putInState.id = productsResponse.data.id;
    putInState.name = productsResponse.data.name;
    putInState.category = productsResponse.data.category;
    putInState.description = productsResponse.data.description;
    putInState.slogan = productsResponse.data.slogan;
    return axios.get(`/products/${putInState.id}/styles`);
  };

  const fetchFirstProductInfo = (productsResponse, putInState = {}) => {
    putInState.id = productsResponse.data[0].id;
    putInState.name = productsResponse.data[0].name;
    putInState.category = productsResponse.data[0].category;
    putInState.description = productsResponse.data[0].description;
    putInState.slogan = productsResponse.data[0].slogan;
    return axios.get(`/products/${putInState.id}/styles`);
  };

  const fetchProductStyles = (stylesResponse, putInState) => {
    putInState.styles = stylesResponse.data.results;
    putInState.defaultStyle = getDefaultStyle(putInState.styles);
    putInState.originalPrice = putInState.defaultStyle.original_price;
    putInState.salePrice = putInState.defaultStyle.sale_price;
    putInState.photos = putInState.defaultStyle.photos;
    return axios.get(`/products/${putInState.id}/related`);
  };

  const fetchRelatedProductsIDs = (relatedProductsResponse, putInState) => {
    putInState.relatedProductIDs = relatedProductsResponse.data;
    console.log('relatedProducts:', putInState.relatedProductIDs);
    return axios.get(`/reviews/meta/${putInState.id}`);
  };

  const fetchMetaDataAndAverageRatings = (metaDataResponse, putInState) => {
    putInState.metaData = metaDataResponse.data;
    putInState.averageRating = getAverageRating(metaDataResponse.data.ratings);
  };

  const fetchNewProductDetails = (id) => {
    const putInState = {};
    const serverEndpoint = id ? `/products/${id}` : '/products';
    axios.get(serverEndpoint)
      .then((productsResponse) => (
        id
          ? fetchProductInfo(productsResponse, putInState)
          : fetchFirstProductInfo(productsResponse, putInState)
      ))
      .then((stylesResponse) => (
        fetchProductStyles(stylesResponse, putInState)
      ))
      .then((relatedProductsResponse) => (
        fetchRelatedProductsIDs(relatedProductsResponse, putInState)
      ))
      .then((metaDataResponse) => {
        fetchMetaDataAndAverageRatings(metaDataResponse, putInState);
        setCurrentProduct({ ...putInState });
      })
      .catch((err) => {
        console.error('error fetching on mount: ', err);
      });
  };

  useEffect(() => {
    fetchNewProductDetails();
  }, []);

  const handleRedirect = (id) => {
    fetchNewProductDetails(id);
  };

  return (
    <div className="app-container">
      <ProductOverview
        product={currentProduct}
        defaultStyle={currentProduct.defaultStyle}
        styles={currentProduct.styles}
      />
      <RelatedProductsCarousel
        currentProductID={currentProduct.id ?? 0}
        relatedProductsIDs={currentProduct.relatedProductIDs}
        handleRedirect={handleRedirect}
      />
      <OutfitCarousel
        productInfo={{
          id: currentProduct?.id ?? 0,
          name: currentProduct?.name ?? 'Product Name',
          category: currentProduct?.category ?? 'Category',
          productImage: currentProduct?.photos?.[0]?.thumbnail_url ?? null,
          originalPrice: currentProduct?.originalPrice ?? 0,
          salePrice: currentProduct?.salePrice ?? null,
          stars: currentProduct?.averageRating ?? null,
        }}
        handleRedirect={handleRedirect}
      />
      <RatingsAndReviews
        productID={currentProduct.id}
        metaData={currentProduct.metaData}
        productName={currentProduct.name}
      />
    </div>
  );
};

export default App;
