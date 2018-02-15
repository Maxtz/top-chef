var request = require('request');
var cheerio = require('cheerio');
 var fs = require("fs");
var XMLHttpRequest = require('xhr2');
var lf_json_deal={ "la_fourchette_deals": [] };//create a json file to push all the deals 

//return the i dof a restaurant && check with the zipcode to avoid mistakes 
function la_fourchette_id_resto(name,monJson,indice,done){
	 var xmlhttp = new XMLHttpRequest();
     var name_array = name.split(' ');
	 var url_of_prediction = "https://m.lafourchette.com/api/restaurant-prediction?name="
	 for(var i=0;i<name_array.length;i++){
	 	 url_of_prediction +=name_array[i]+"+";
	 }	 
	 xmlhttp.onreadystatechange = function() {
    	 if (this.readyState == 4 && this.status == 200) {    	 	
    	 	 var result_in_json = JSON.parse(this.responseText);
    	 	 if(result_in_json.length!=0){    	 	 	
	           if (monJson.restaurants[indice].zipcode==result_in_json[0].address.postal_code)//check with the zipcode
               {done(result_in_json[0].id);}
         	    }
         }
	 };
	 xmlhttp.open("GET", url_of_prediction , true);
	 xmlhttp.send();
}

function push_the_deals_of_special_offer(restaurant,monJson,indice){
	 la_fourchette_id_resto(restaurant,monJson,indice,function(id_lafourchette){		
		 var deal_of_id_restaurant_api_url= "https://m.lafourchette.com/api/restaurant/"+id_lafourchette+"/sale-type";
		 var xmlhttp = new XMLHttpRequest();	 	 
	 	 xmlhttp.onreadystatechange = function() {
    		 if (this.readyState == 4 && this.status == 200) {    	 	 	 
    	 		 var deal_in_json = JSON.parse(this.responseText);
    	 		 if(deal_in_json.length!=0){
    	 	 		 for(var i=0;i<deal_in_json.length;i++){
    	 	 		 	 if(deal_in_json[i].is_special_offer){
    	 	 		 	 	 var name_of_deal= deal_in_json[i].title;
    	 	 		 	 	 var description = deal_in_json[i].description;
    	 	 		 	 	 var stars= monJson.restaurants[indice].star;
    	 	 		 	 	 var chef= monJson.restaurants[indice].chef;
    	 	 		 	 	 var address= monJson.restaurants[indice].address;
    	 	 		 	 	 var city= monJson.restaurants[indice].city;
    	 	 		 	 	 var zip= monJson.restaurants[indice].zipcode;
    	 	 		 	 	 var stared_deal = {
				 		 	 "resaurant_name": restaurant,
				 			 "id_restaurant": id_lafourchette,
				 			 "chef" : chef,
				 			 "name_of_deal": name_of_deal,
				 			 "deal_description": description,
				 			 "stars" : stars,
                             "address" :address,
                             "city":city,
                             "zipcode":zip

							 };
    	 	 		 	 	 lf_json_deal.la_fourchette_deals.push(stared_deal);
    	 	 		 	 	 console.log(stared_deal);
    	 	 		 	 	 fs.writeFile('la_fourchette_stars_deals.json',JSON.stringify(lf_json_deal),'utf-8',function(err){  //Store the data in the json file
             	 				 if(err) return console.log(err);             			 		
            		 		});
    	 	 		 	 }    	 	 		 	 
    	 	 		 }
         		 }         	 	
         	 }
		 };
		 xmlhttp.open("GET", deal_of_id_restaurant_api_url, true);
		 xmlhttp.send();
	 });
}

function parse_stars_restaurants(callback){
fs.readFile('restaurants-etoiles.json', 'utf8', function (erreur, donnees)
{	
 if (erreur)
 {throw erreur;} // Vous pouvez gérer les erreurs avant de parser le JSON
 var monJson = JSON.parse(donnees);
 
 callback(monJson); 
});
}

function Get_all_stars_deal(callback){
	parse_stars_restaurants(function(monJson){
		for (var i =  0; i < monJson.restaurants.length; i++)
		 {
	push_the_deals_of_special_offer(monJson.restaurants[i].name,monJson,i);}	
});
}
Get_all_stars_deal();