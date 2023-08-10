
const { Router } = require("express");


const TagsController = require("../controller/TagsController");
const ensureAutenticated = require("../middlewar/ensureAutenticated");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAutenticated,tagsController.index);




module.exports = tagsRoutes;
