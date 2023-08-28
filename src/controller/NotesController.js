
const NotesRepository = require("../repositories/NotesRepository");
const NoteService = require("../services/NoteService");

class NotesController {
  async create(request, response) {
    const dados = request.body;
    const user_id = request.user.id;

    const notesRepository = new NotesRepository();
    const noteService = new NoteService(notesRepository);

    await noteService.createNote({
      user_id: user_id,
      title: dados.title,
      description: dados.description,
      tags: dados.tags,
      links: dados.links,
    });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const notesRepository = new NotesRepository();
    const noteService = new NoteService(notesRepository);

    const notes = await noteService.showNote({ id });

    return response.json(notes);
  }

  async delete(request, response) {
    const { id } = request.params;

    const notesRepository = new NotesRepository();
    const noteService = new NoteService(notesRepository);

    await noteService.deleteNote({ id });

    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;

    const id = request.user.id;

    const notesRepository = new NotesRepository();
    const noteService = new NoteService(notesRepository);

    const notesWithTags = await noteService.indexNote({user_id:id, title, tags})
    return response.json(notesWithTags);
  }
}

module.exports = NotesController;
