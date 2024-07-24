# Flights

Simple UI for editing a subscriber available flights

## Table of content

- [Flights](#flights)
  * [Development server](#development-server)
    + [1 - Install dependencies](#1---install-dependencies)
    + [2 - Start the application](#2---start-the-application)
    + [3 - Navigate](#3---navigate)
  * [Running unit tests](#running-unit-tests)
  * [Extra information](#extra-information)
    + [Use Cases](#use-cases)
    + [Business information](#business-information)
    + [TODO comments](#todo-comments)
    + [Further information](#further-information)

## Development server

### 1 - Install dependencies

Run `npm install`

### 2 - Start the application

Run `npm run dev` for a dev server.

The application will automatically reload if you change any of the source files.

### 3 - Navigate

`http://localhost:5173/`


## Running unit tests

Run `npm run test` to execute the unit tests.

## Extra information

### Use Cases

There is just one Use Case (`get-subscribers.qry.ts`).
All the operations should be in their own Use Case with the proper API Call (typed, repositories, cache if needed, etc).
For instance:

`GET: /v1/public/subscribers`

`GET: /v1/public/subscribers/{subscriberId}`

Parameters
  - **subscriberId** (string): The ID of the subscriber to update.
  
`PUT: /v1/public/subscribers/{subscriberId}`

Parameters

- **subscriberId** (string): The ID of the subscriber to update.
- **updatedQuota** (number): The new quota for the subscriber.
- **motive** (string): The reason for the quota update.

### Business information

- Business information such max & min number of flights o motives lists should not be hardcoded. 
   - The magic numbers could be available through properties files.
   - Motives could be retrieved with CMS keys (for getting different translations).

### TODO comments

You can find some of these appreciations within the code.


### Further information

I kept this project as simple as possible.

For more complex architecture, please take a look into my [Marvel repo](https://github.com/v4n3ss4ms/marvel/) (React + TS + SASS +  Jest + Playwright)

For an extensive testing example, please take a look into my [MoviesApp repo](https://github.com/v4n3ss4ms/moviesApp) (Angular + TS + Jest).
