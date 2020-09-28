<br/>
<h1 align="center" >
	  INDIVIDUA&#8729;LIST
</h1>
<h4 align="center">Save recipes and easily create custom shopping lists.  Mobile Friendly and HTTPS secured!</h4>

<p align="center">
  <a href="https://myindividualist.com/">Website</a> •
  <a href="#features">Features</a> •
  <a href="#tutorial">Tutorial</a> • 
  <a href="#contributing">Contributing</a>

</p>

# Features

#### Save and Edit Recipes

Found a delicious recipe online? Create a new recipe and save each ingredient and link the website. Made a mistake? No problem delete the recipe or edit the incorrect values and save.

#### Persistent shopping list

Easily create shopping list by adding all ingredients from recipe with a single click or add single items as you think of them. All items on the shopping list will be listed with other items from the same grocery section.

#### Custom Grocery Sections

Create a list of grocery sections ex: Produce, Vegetables, Frozen, Other ... When saving a new ingredient for a recipe set the grocery section value from one in the list. Add items to your shopping list based on the grocery section.

# Tutorial

![Demo Gif](demo/test.gif)

# Contributing

Want to help? Great! Checkout the [project](https://github.com/jrvanderveen/cooking-with-code/projects/1) and find something you'd like to tackle.  If some thing looks interesting follow these steps to get setup.

	1A. git clone https://github.com/jrvanderveen/individualist-webapp.git
	1B. Create mongodb atlas account

	2A. npm install
	2B. cd client - npm install


	3A.cd server/config - open config_tmp.env, setup environmanet variables, and rename to config.env
		Note: Some configuration of this file is optional like facebook/google auth and the AWS S3 bucket


	3B. optional: can create your own SSL certificates

	4.cd client/src - create file config.js
		export const getENV = () => {
			return "development";
		}

	5.  cd back to server - npm run dev
