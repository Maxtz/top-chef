import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//var fs = require("fs");
//import './index.html';

var data = require('./la_fourchette_stars_deals.json'); // forward slashes will depend on the file location
var monjs=data.la_fourchette_deals;
var datatest = require('./test.json'); // forward slashes will depend on the file location
const monjstest=datatest.la_fourchette_deals;
for(var i = 0; i < data.la_fourchette_deals.length; i++) {
    
  
    console.log("Name:" + data.la_fourchette_deals[i].resaurant_name );
}


class ProductCategoryRow extends React.Component {
  render() {
    const stars = this.props.stars;
    return (
      <tr>
        <th colSpan="2">
          {stars}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const resaurant_name = product.resaurant_name ;
      <span style={{color: 'red'}}>
        {product.resaurant_name}
      </span>;

    return (
      <tr>
        <td>{resaurant_name}</td>
        <td>{product.chef}</td>
        <td>{product.stars}</td>
        <td>{product.name_of_deal}</td>
        
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.stars !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.stars}
            key={product.stars} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.resaurant_name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Nom du restaurant</th>
            <th>Chef</th>
            <th>Nombre d'étoiles</th>
             <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


const PRODUCTS =  monjs;
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);