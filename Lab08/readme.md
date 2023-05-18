Create a new film

    POST /films/add
    body: Film object

Get the list of all films (with full details)

    GET /films

    Response: list of Film objects

(Get the full details of a film, given the ID)

Get the list of all filtered films according to filter name

    GET /films/filters/:filterName

    Response: list of Film objects which follow the criteria

Create a new film 

    POST /films/add/
    Request body: a single Film object

Delete a film 

    DELETE /films/:filmId

Update the content of an existing film (keeping the filmId)

    PUT /films/update/:filmId
    Request body: a Film object
    (title,fav,score,date,user -> id wont' be modified so it's not requested)

(Update the score of an existing film)

(Update the favorite field of an existing film)

TYPES OF ENTITIES (in JSON)

Film

{ id, title, favorite, watchdate, rating, user }
(id,favorite,rating,user are numbers, title and watchdate are strings)
(on creation, id should not be provided)
(date is a ISO-formatted string)
