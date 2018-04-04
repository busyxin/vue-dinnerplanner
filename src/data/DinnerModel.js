import _ from 'lodash'

const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function() {

  let numberOfGuests = +window.localStorage.getItem('numberOfGuests') || 4
  let observers = []
  let cachedResponses = {
    'all': {},
    'breakfast': {},
    'appetizer': {},
    'main course': {},
    'side dish': {},
    'salad': {},
    'bread': {},
    'soup': {},
    'sauce': {},
    'drink': {},
    'beverage': {}
  }
  let menu = JSON.parse(window.localStorage.getItem('menu')) || {}

  this.setNumberOfGuests = function(num) {
    numberOfGuests = num
    window.localStorage.setItem('numberOfGuests', num)
    notifyObservers()
  }

  this.getNumberOfGuests = function() {
    return numberOfGuests;
  }

  this.addDishToMenu = function(dish) {
    menu[dish.id] = dish
    window.localStorage.setItem('menu', JSON.stringify(menu))
    notifyObservers()
  }

  // Returns all the dishes on the menu. Return an array of dish for convenience
  this.getMenu = function() {
    return _.values(menu)
  }

  // Removes dish from menu
  // notifies observers about the change in the menu
  this.removeDishFromMenu = function(id) {
    delete menu[id]
    notifyObservers()
  }

  // API Calls
  this.getAllDishes = function (type, filter) {

    const cachedResponse = getCachedResponse(type, filter || '*')

    if (cachedResponse !== undefined) {
      return processCachedResponse(cachedResponse)

    } else {
      let url = new URL('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search')
      let params = { instructionsRequired: true }

      if (type && type !== 'all') params.type = type
      if (filter && filter !== '') params.query = filter

      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      return fetch(url, httpOptions)
        .then(processResponse)
        .catch(handleError)
    }
  }

  this.getDish = function (id) {
    const cachedResponse = getCachedDishResponse(id)

    if (cachedResponse !== undefined) {
      return processCachedResponse(cachedResponse)

    } else {
      const url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information`

      return fetch(url, httpOptions)
        .then(processResponse)
        .catch(handleError)
    }
  }

  const cacheResponse = function (response) {
    const url = new URL(response.url)
    const pathArray = url.pathname.split('/')
    const path = pathArray[pathArray.length - 1]

    if (path === 'search') {
      const type = url.searchParams.get("type") || 'all'
      const filter = url.searchParams.get("filter") || '*'
      cachedResponses[type][filter] = response

    } else if (path === 'information') {
      const dishId = pathArray[pathArray.length - 2]
      cachedResponses[dishId] = response
    }
  }

  const getCachedResponse = function (type, filter) {
    return cachedResponses[type][filter]
  }

  const getCachedDishResponse = function (id) {
    return cachedResponses[id]
  }

  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      cacheResponse(response.clone())
      return response.json()
    }
    throw response
  }

  const processCachedResponse = function (response) {
    return Promise.resolve(response.clone())
      .then(function(res) {
        return res.json()
      })
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
