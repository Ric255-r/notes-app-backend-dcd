// server.js : Memuat kode untuk membuat, mengonfigurasi, dan menjalankan server HTTP menggunakan Hapi.
// routes.js : Memuat kode konfigurasi routing server seperti menentukan path, method, dan handler yang digunakan.
// handler.js : Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.
// notes.js : Memuat data notes yang disimpan dalam bentuk array objek.

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`)
};

init();