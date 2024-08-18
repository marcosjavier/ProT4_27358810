import {pool} from './database.js';

class LibroController{

  //Obteniendo todos los libros
  async getAll(req, res) {
    try {
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);      
    } catch (error) {
      //Obtener error durante la consulta
      res.status(500).json({ message: "Error al obtener los libros", error });
    }    
      
  }

  // Obtener un libro por su ID
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const [result] = await pool.query
      (
        `SELECT * FROM libros WHERE id = ?`,
        [
        id
        ]
      );

      if (result.length === 0) {
        // Si no se encuentra el libro, devolver un error 404
        res.status(404).json({ message: "Libro no encontrado" });
      } else {
        res.json(result[0]);
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante la consulta
      res.status(500).json({ message: "Error al obtener el libro", error });
    }
  }

  async add(req, res){

    /*capturamos el 'cuerpo' de la solicitud http de la solicitud enviada
        por el cliente y la guardamos en la constante libro para después realizar
        una sentencia INSERT INTO SQL */
    const libro = req.body;
    try {
         // Validar que solo se envíen atributos válidos
        if (
          !libro.nombre ||
          !libro.autor ||
          !libro.categoria ||
          !libro.anio_publicacion ||
          !libro.ISBN
        ) {
          return res.status(400).json({ message: "Faltan atributos requeridos" });
        }              

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

  //Eliminar un libro por su id
  async delete(req, res){
    
      const libro = req.body;
      
    try {
      const [result] = await pool.query
      (
        `SELECT id FROM libros WHERE ISBN=?`,
        [libro.ISBN]
      );

      if (result.length === 0) {
        // Si no se encuentra el libro, devolver un error 404
        return res.status(404).json({ message: "Libro no encontrado con ése ISBM" });
      }

      // Obtener el ID del libro encontrado
      const libroId = result[0].id;

      const [deleteResult] = await pool.query
      (
        `DELETE FROM libros WHERE id=(?)`,
        [libroId]
      );

      if (deleteResult.affectedRows === 0) {
        res.status(404).json({ message: "No se pudo eliminar el libro" });
      } else {
        res.json({ "Registros eliminados": deleteResult.affectedRows });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar libro', details: error.message});
    }
  }

  async update(req, res){
    
      const libro = req.body;
    try {
      // Validar que solo se envíen atributos válidos
      if (
        !libro.nombre ||
        !libro.autor ||
        !libro.categoria ||
        !libro.anio_publicacion ||
        !libro.ISBN
      ) {
        return res.status(400).json({ message: "Faltan atributos requeridos" });
      }

      const [result] = await pool.query
      (
        `UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), ISBN=(?) WHERE id=(?) `,
        [
          libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id
        ]
      );
      if (result.changedRows === 0) {
        // Si no se actualizó ningún libro, devolver un error 404
        res.status(404).json({ message: "Libro no encontrado o sin cambios" });
      } else {
        res.json({ "Registro actualizado": result.changedRows });
      }
      
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar libro', details: error.message});
    }
    
  }

}

export const libro = new LibroController();
