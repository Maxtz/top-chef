import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//var fs = require("fs");
//import './index.html';

var data = require('./la_fourchette_stars_deals.json'); // forward slashes will depend on the file location
var monjs=data.la_fourchette_deals;
/*var datatest = require('./test.json'); // forward slashes will depend on the file location
const monjstest=datatest.la_fourchette_deals;*/
for(var i = 0; i < data.la_fourchette_deals.length; i++) {
    
  
    console.log("Name:" + data.la_fourchette_deals[i].resaurant_name );
}
var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
};

class ProductCategoryRow extends React.Component {
  render() {
    const stars = this.props.stars;
    return (
      <tr>
        <th colSpan="5">
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
     

    return (
      <tr  style={{backgroundColor: "rgb(120,120,120)"}}>

        <td >{resaurant_name}</td>
        <td>  </td>
        <td  >{product.city}</td>
        <td></td>
        <td >{product.stars}</td>
        <td></td>

        <td >{product.chef}</td>
        <td></td>

       
         

        
       
        <td > <a target="_blank"  style={{color: 'black'}}  style={{backgroundColor: "rgb(128,128,128)"},{color: 'black'}} href={product.url_restaurant}>{product.name_of_deal}</a></td>
        
        
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
           <fieldset class="column-layout"  ><th>Nom du restaurant</th></fieldset>
            <td></td>
             <fieldset class="column-layout"> <th>Ville</th></fieldset>
              <td></td>          
           <fieldset class="column-layout"> <th>Nombre d'étoiles</th></fieldset>
            <td></td>
            <fieldset class="column-layout"><th>Chef</th></fieldset>
            <td></td>

            <fieldset class="column-layout"> <th >Description : cliquez sur l'offre pour aller sur le lien</th></fieldset>

          </tr>

        </thead>
        <tbody>{rows}</tbody>
      </table>

    );
  }
}


class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
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