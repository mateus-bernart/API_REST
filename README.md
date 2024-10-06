### Creation of my first API Rest using Mongo DB and Express for a educational purpose.

- #### Request and Responses tested with Postman

- #### noSQL DB - json object/document related

For this project, was created a instance of MongoDB at Mongo Atlas, a service hosted at the cloud
Also created a local host to get route access with localhost:3000

- #### Framework mongoose for connection with MongoDB

- #### Use of MVC to structure the data, manage HTTP functions and routes.

## Error Handling using Linter

### Use of Middleware (Express)

- To manipulate popular errors (404, 500)
- to paginate the data using limit and skip, sort, functions

#### Functions that Intercept request to the API to handle the errors at first glance, before the controllers. (Controllers are also middlewares!)

Middlewares with classes with different kinds of errors (validation, requisition, base error)

- All errors centralized in the middleware "manipuladorDeErros"
- The right way to action this middleware is calling 'next' that is a parameter of the controller middleware and putting the error as a parameter. He will execute the manipuladorDeErros right after when an error is encountered.

#### Global validator

Using the mongoose option to set a validation to every String globally, it was passed a object that receives the possible error and a personalized message for the user.

- This global validator will be applied when it is called the models into a index.js
- "trim" function is to delete every white space in the input.

- _This enhances the understanding of the viewer and the communication with the front-end._

#### Other validations

- enum for accepting just a few values (cna be used with arrays of values);
- min/max values;
- message at the end for the user to comprehend what happened;

#### Custom filter query search

- implementation and validation of the search of books from your properties: editora, titulo, minPaginas, maxPaginas, nomeAutor
