const express = require("express");
const notes = require("../controllers/note.controller.js");

const router = express.Router();

router.route("/")
    .get(notes.findAll)
    .post(notes.create)
    .delete(notes.deleteAll);

router.route("/important")
    .get(notes.findAllImportant);

router.route("/:id")
    .get(notes.findOne)
    .put(notes.update)
    .delete(notes.delete);

module.exports = router;