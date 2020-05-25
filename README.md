# cooking-with-code

SUMMARY:

This site will eventually be a place where home cooks can come to save old recipe and expedite their shopping. Cooks will be able to create recipes with an ingredient list and when it comes time for shopping (the worst part of cooking) this site will give users the ability to select multiple recipes and export a shopping list for all the ingredients required. Before exporting they will be able to unselect items they already own (like salt, pepper,...). Each ingredient will have a grocery store section attribute allowing an exported list to look something like this:

Meats:

1 pound ground beef

Vegetables:

    4 large tomatoes
    carrots
    zucchini
    parsley

Other:

    red wine
    8 ounce tomatoe sauce

REQUIRES:

    Mongo Atlas DB
    npm install
    npm run dev (server back end locally, runs client code on http://localhost:3000/)

TODO:

      build more beautiful front end
      Create export shopping list functionality
            Allow user to select recipies to add then create new view of all ingredients seperated and sorted.  This new list can have items deleted.
      add in addition features like rating or searching for recipes
