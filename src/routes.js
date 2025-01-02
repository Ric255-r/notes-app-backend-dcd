const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [

  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler
  },
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
    // cors error bisa ditambah ke masing2 routes, atau klo mw lebih luas cakupannya, taruh di server.js
    // options: {
    //   cors: {
    //     origin: ['*']
    //   }
    // }
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByHandler
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler
  }

];

module.exports = routes;