
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


//Recover all the url of the stars' restaurents and store those in restaurants_list array
function urls_restaurant_scrape(url,callback){
	 var urls_restaurant=[];
  	 request(url, function(err,resp,html){  
  		var $=cheerio.load(html);
    	$('.poi-card-link').each(function(){
      		 var url_temp = "https://restaurant.michelin.fr";
      		 url_temp+=$(this).attr('href');
      		 urls_restaurant.push(url_temp);              
      	});
  		callback(urls_restaurant);     //when it's finish, we catch the restaurant information urls put before in the urls_restaurant array
  	});
}

//This function allows to scrap all of the informatiosn we need from the detail page of the restaurent
function json_informations_object(url,callback){
  request(url, function(err,resp,html){
    if (!err) {
    
      const $=cheerio.load(html);
      var name = $('h1').first().text();
      var star = $('.michelin-poi-distinctions-list').text();
      var chef = $('.field--name-field-chef').children('.field__items').text();
      var address = $('.thoroughfare').first().text();
      var city = $('.locality').first().text();
      var zipcode = $('.postal-code').first().text();
       

      //To now how many stars the restaurant have
      if (star.startsWith("1"))
        {star="1 étoile";}
      else if (star.startsWith("2"))
       {star="2 étoiles";}
      else if(star.startsWith("3")) 
        {star="3 étoiles";}    


      var restaurant = {    //the differents infromations (name,number of stars, chef, adress(city and zip))
         "name": name,
         "star": star,
         "chef": chef,
          "address": address,
          "city": city,
         "zipcode": zipcode  
      };
      console.log(restaurant);
        callback(restaurant); 
        //when the grogram have finish to recover the differents infromations of the restaurent, it catch the informations 

    }
  });
}
//list of the restaurants informations 
var restaurants_list = { "restaurants": [] };
//The main function prcesss the program to handle the links and after the json informations to store in the json file
function Main_fonction(url){

    	for(var i=1; i<=34; i++){
     	 	 var current_Url = url+"/page-"+String(i);
      	 	 urls_restaurant_scrape(current_Url,function(urls_resto){//handle the uls restaurants array


         	 	 urls_resto.forEach(function (current_Url_for_scraping){//course this array of urls



         	 	 	 json_informations_object(current_Url_for_scraping,function(restaurant){// scrape the diffrents restaurants page and handle the data of thoses


             			 restaurants_list.restaurants.push(restaurant);
             				 fs.writeFile('restaurants-etoiles.json',JSON.stringify(restaurants_list),'utf-8',function(err){  //Store the data in the json file
             	 				 if(err) return console.log(err);
             			 		
            		 		});
             		 	 
          	 	 	 }); 
         	 	 });
          	 });
    	 }

}
var Main_url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin";
//Launch the application 
Main_fonction(Main_url);