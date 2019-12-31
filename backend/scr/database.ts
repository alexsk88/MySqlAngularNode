import mysql from 'mysql';
import keys from './keys'

const pool = mysql.createPool(keys.database); // Creamos la conexion con 
//los datos de la DB

pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.release();
  // Creamos la conexion
  // con release dice ya estoy listo para escuchar
  console.log('DB is connected');
});

export default pool;