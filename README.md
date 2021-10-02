## yarn to install dependencies1332d23d23d23d3241341344

============================================================================================

## Users: 

### POST /users -> create passing e-mail, name and password inside of request body

### DELETE /users -> delete current authenticated user

============================================================================================

## List: e32e3e323

### GET /lists -> get all lists from authenticated user

### GET /lists/:listId -> get a single list by id

### POST /lists -> create a new list for a authenticated user passing the title inside of request body

### DELETE /lists/:listId -> delete list from an authenticated user passing the list's id in the url params

============================================================================================

## Item: 

### POST /lists/:listId/item -> add item to a list passing content and quantity inside of request body

### PUT /lists/:listId/item/:itemId -> update a item from a list

### DELETE /lists/:listId/item/:itemId -> delete a item from a list
