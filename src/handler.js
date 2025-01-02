const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  // Selain itu, objek notes yang perlu kita simpan harus memiliki struktur seperti ini:
  // {
  //   id: string,
  //   title: string,
  //   createdAt: string,
  //   updatedAt: string,
  //   tags: array of string,
  //   body: string,
  // },

  // request.payload. utk tarik data dr body yg bentuk json
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = {
    title, tags, body, id, createdAt, updatedAt
  }

  notes.push(newNotes);

  // Lalu, bagaimana menentukan apakah newNote sudah masuk ke dalam array notes? Mudah saja! Kita bisa memanfaatkan method filter()
  //  berdasarkan id catatan untuk mengetahuinya. Kurang lebih implementasinya seperti ini:
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if(isSuccess){
    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil ditambahkan',
      data: {
        noteId: id
      }
    });

    response.code(201);
    return response;

  }else{
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan'
    });

    response.code(500);
    return response;
  }
}

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
});

const getNoteByIdHandler = (request, h) => {
  // ambil parameter dari url
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if(note !== undefined){
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'data tidak ditemukan'
  });
  
  response.code(404);
  return response;
}

const editNoteByHandler = (request, h) => {
  const { id } = request.params;
  const  {title, body, tag} = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((n) => n.id === id);

  // update
  if(index !== -1){
    notes[index] = {
      ...notes[index],
      title,
      tag,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui'
    });

    response.code(200);
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal memperbaharui data'
  });

  response.code(404);
  return response;
}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((n) => n.id === id);

  if(index !== -1){
    // Nah, untuk menghapus data pada array berdasarkan index, gunakan method array splice().
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    });

    response.code(200);
    return response;
    
  }

  const response = h.response({
    status: 'fail',
    message: 'Data gagal dihapus'
  });
  
  response.code(404);
  return response;




}





// Lalu untuk mengekspor fungsi handler ini, 
// kita gunakan objek literals yah. Ini bertujuan untuk memudahkan ekspor lebih dari satu nilai pada satu berkas JavaScript.
module.exports = {
  addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByHandler, deleteNoteByIdHandler
};

