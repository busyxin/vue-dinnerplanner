const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function() {

  let numberOfGuests = 4;
  let observers = [];
  let resultDishes = [];
  let cachedRequests = [];
  let cachedDishes = [];
  let menu = {};

  this.setNumberOfGuests = function(num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function() {
    return numberOfGuests;
  };

  this.pushRequest = function(req) {
    cachedRequests.push(req);
  }

  this.getCachedRequests = function() {
    return cachedRequests
  }

  this.addDishToMenu = function(dish) {
    menu[dish.id] = dish;
    notifyObservers();
  }

  // Returns all the dishes on the menu. Return an array of dish for convenience
  this.getMenu = function() {
    let dishArray = []

    for (let id in menu) {
      if (menu[id]) dishArray.push(menu[id])
    }

    return dishArray
  }

  // Removes dish from menu
  // notifies observers about the change in the menu
  this.removeDishFromMenu = function(id) {
    menu[id] = null;
    notifyObservers();
  }

  // API Calls

  this.getAllDishes = function (type, filter) {
    let url = new URL('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search')
    let params = { instructionsRequired: true }

    if (type && type !== 'all') params.type = type
    if (filter && filter !== '') params.query = filter
    
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDish = function (id) {
    let url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information`

    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
