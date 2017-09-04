NoteBook
--------

A notebook and organization application for saving and organizing notes, links, files and documentation.

- Backend:  NodeJS, MongoDB
- Frontend: JQuery, Bootstrap (bootswatch themes), Datatables, Summernote WYSIWYG editor

Technical note: Page refreshing only happens when going to notes view and singular note view.
Every other action like adding a project, saving a note, editing notes is made over AJAX with
the content dynamically updated using JQuery.

The project screen allows you to create projects to store related notes in.

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/1.png)

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/2.png)

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/3.png)

A project contains its related notes. They are in a dynamic datatable and are also filterable by type and tag.

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/4.png)

The create note form is in a Bootstrap modal. From here you and also add new tags and types.
The Summernote editor can be used to give your notes basic styling as well as to add hyperlinks and embedded videos.

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/5.png)

The 'glimpse' feature allows a note to be quickly viewed from the table view.

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/6.png)

The 'view' link takes you to the editor page where you can work on the document and save its edits.

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/7.png)

There are also switchable themes.

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/8.png)

![alt tag](https://raw.githubusercontent.com/ThriceGood/NoteBook/master/pictures/9.png)
