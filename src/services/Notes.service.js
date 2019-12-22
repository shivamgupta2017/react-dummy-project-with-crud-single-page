export default class NoteService {
  serverUrl = process.env.REACT_APP_URL;

 async addNewNote(data) {
    return await fetch(this.serverUrl+'note', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }
    });


  }

  async renderList() {
    return await fetch(this.serverUrl+'note', {
      method: 'GET',
      // body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }
    });


  }
  async deleteNote(noteId) {

    return await fetch(this.serverUrl+'note/'+noteId, {
      method: 'DELETE',
      // body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }
    });

  }


  async updateNote(noteObject) {

    return await fetch(this.serverUrl+'note/', {
      method: 'PUT',
      body: JSON.stringify(noteObject),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }
    });

  }
  // renderList



}