## Challenge - Keep Note

#### Context

Keep Note is a web app that allows user to maintain notes.  The app should be designed as a single page application.​

Based on SPA approach, the app should be developed by creating components.​

The first four phases of development are completed. During these four phases, the components are created to add, view and search notes. The persistence has been implemented and notes are added and retrieved from the server. Angular Material components are used to style the Keep Note app.

By making HTTP calls to `json-server`, notes are fetched from and saved in `notes.json` file located in `keep-note-data` folder.​

In phase 5 development, the Keep Note app should be made navigable using Angular Router. Also, add  edit and delete note functionalities in the app that allows modification and deletion of existing notes.

**Note:** The changes required for developing the solution of this challenge should be implemented in the solution code of `Keep Note` developed in the `challenge` of `Sprint 2: Develop Interactive Forms Inside SPA` of this course.

#### Task 1 - Implement Edit Note Functionality
 
- Add method in Note service that makes PUT request to update the note.
- Create Angular component with input fields for note properties
- On initialization, the component should read the route parameter that contains id of the note selected
- Fetch the note for the retrieved id
- Define method that updates the note with changes provided by the user

#### Task 2 - Implement Delete Note Functionality

- Add method in Note service that makes DELETE request to delete the note.
- Each note card has a delete button which when clicked should call the method that calls the delete method of the Note service and execute delete operation.
- Post deletion the array of notes should get updated by removing the note that was deleted.

#### Task 3 - Add Routing Module

- To enable routing, create routing module with route definitions
- Import this routing module in `AppModule`

#### Task 4 - Define Routes

- In routing module define routes that fulfils following requirements:
    - route that navigates to notes view
    - default route that redirects to notes view when application is launched
    - wild card route to handle page not found error
    - route with note-id as parameter to load edit-note component
        - this component should read note-id parameter and display note details in editable mode.

#### Task 5 - Add Routes to Keep Note Application

- Identify the position on app for dynamically loading the navigated component
- Add link on app's toolbar to allow users to navigate to landing view that displays notes.
- Add link on edit icon in note card that navigates users to edit-note component
    - the route should contain id of note selected for edit
    
#### Task 6 - Implement Programmatic Navigation from Edit View to Landing View

- Create Angular service with method that calls the `navigate()` method of Router class.
- The `navigate()` method when called should route to landing / notes view
- Once the note has been edited, call the service method to programmatically navigate to landing view