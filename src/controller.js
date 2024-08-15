import {pool} from './database.js';

class LibroController{

  async getAll(req, res) {
    const [result] = await pool.query('SELECT * FROM libros');
    res.json(result);  
  }

  async add(req, res){
    try {
        /*capturamos el 'cuerpo' de la solicitud http de la solicitud enviada
        por el cliente y la guardamos en la constante persona para después realizar
        una sentencia INSERT INTO SQL */
        //console.log('EY!!'+req.body);
        const libro = req.body;       

        const [result] = await pool.query
        (
          `INSERT INTO libros(nombre, autor, categoria, anio_publicacion, ISBN)VALUES(?, ?, ?, ?, ?)`,
          [
            libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN
          ]
        );
        res.json({"Libro Insertado": result.insertId});
      } catch (error) {
        res.status(500).json({ error: 'Error al insertar libro', details: error.message }); 
    }
  }

  async delete(req, res){
    try {
      const libro = req.body;
      const [result] = await pool.query
      (
        `DELETE FROM libros WHERE id=(?)`,
        [libro.id]
      );
      res.json({"Libros eliminados": result.affectedRows});
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar libro', details: error.message});
    }
  }

}

export const libro = new LibroController();
