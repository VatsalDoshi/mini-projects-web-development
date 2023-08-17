Vatsal Doshi
NUID : 0027776613


The aim of this project is to develop a REST API for managing reminders using Node.js and MongoDB as the persistence layer. The API will allow developers to fetch, add, update and delete reminders through a Reminder Resource.

The Reminder Resource will have the following properties:

id (unique identifier for each reminder)
title (short description of the reminder)
description (detailed information about the reminder)
createdDate (date on which the reminder was created)
lastModifiedDate (date on which the reminder was last modified)
Developers will be able to access these properties and use them to perform CRUD operations on the reminders.

For the implementation of the REST API, we will be using the Express framework. Express is a popular Node.js framework that provides a simple and intuitive interface for creating web applications and APIs.

We will be using MongoDB as the database for storing the reminders. MongoDB is a NoSQL document-oriented database that provides scalability and flexibility for storing large amounts of data.

To get started with the project, we will create an endpoint for fetching all existing reminders. This endpoint will return a JSON array containing all the reminders in the database.

Next, we will create an endpoint for adding a new reminder. Developers will be able to send a JSON object containing the properties of the reminder they wish to add, and the API will create a new reminder in the database.

Similarly, we will create endpoints for updating and deleting reminders. Developers will be able to update and delete reminders by specifying the reminder ID in the request.

In summary, this project will provide developers with a simple and easy-to-use REST API for managing reminders using Node.js, Express, and MongoDB. The API will allow developers to perform CRUD operations on reminders and retrieve reminders from the database in a JSON format.
