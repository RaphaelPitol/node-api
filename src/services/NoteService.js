class NoteService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }
  async createNote({ user_id, title, description, tags, links }) {
   
    const newNote = await this.notesRepository.create({
      user_id,
      title,
      description,
      tags,
      links,
    });

    return newNote;
  }

  async showNote({ id }) {
    const allNotes = await this.notesRepository.show({ id });
    return allNotes;
  }

  async deleteNote({ id }) {
    const del = await this.notesRepository.delete({ id });

    return del;
  }

  async indexNote({user_id, title, tags}){
     const noteIndex = await this.notesRepository.index({user_id, title, tags});

     return noteIndex;
  }
}

module.exports = NoteService;
