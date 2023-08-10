
const { Router } = require("express");


const NotesController = require("../controller/NotesController");
const ensureAutenticated = require("../middlewar/ensureAutenticated");

const notesRoutes = Router();


const notesController = new NotesController();

notesRoutes.use(ensureAutenticated);

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);



module.exports = notesRoutes;
