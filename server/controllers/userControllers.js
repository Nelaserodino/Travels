const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class userController {
  //1.Crear usuario
  //localhost:4000/users/createUser

  createUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" }); // Updated error message
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email format" }); // Error for invalid email format
    }

    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (name, lastname, phone, address, email, password) VALUES ( '${name}',"", "", "", '${email}', '${hash}')`;

        connection.query(sql, (error, result) => {
          console.error("Error creating user:", error);
          if (error && error.code === "ER_DUP_ENTRY") {
            res.status(400).json({ error: "User already exists" });
          } else if (error) {
            res.status(400).json({ error: "Failed to create user" });
          } else {
            res.status(201).json(result);
          }
        });
      });
    });
  };

  //-------------------------------------------------
  //2.- Login
  //localhost:4000/users/login
  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    connection.query(sql, (error, result) => {
      // console.log(result[0].is_deleted, "==========result===============");
      console.log(result[0]);
      //en caso de error en la consulta
      if (error) return res.status(400).json(error);

      //en caso de no encontrar un user con dicho user_name o mail.
      if (!result || !result.length || result[0].is_deleted == 1) {
        res.status(401).json("Usuario no registrado");
      } else {
        //en caso de que el mail o user_name SEA correcto
        //aqui lo estamos haciendo con el mail
        const [user] = result;
        const hash = user.password;

        //capturo el user_id
        const user_id = user.user_id;

        //compramos contraseñas
        bcrypt.compare(password, hash, (error, response) => {
          if (error) throw error;
          //si las contraseñas coinciden
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  name: user.name,
                  id: user_id,
                  type: user.type,
                  img: user.img,
                },
              },
              process.env.SECRET,
              { expiresIn: "10d" }
            );
            res.status(200).json({ token });
            //si las contraseñas coinciden
          } else {
            res.status(401).json("Usuario y contraseña incorrectos");
          }
        });
      }
    });
  };

  //---------------------------------------------------
  //3.- Trae la información de un usuario
  //localhost:4000/users/oneUser/:user_id

  selectOneUser = (req, res) => {
    const user_id = req.params.user_id;

    let sqlUser = `SELECT * FROM user WHERE user_id = ${user_id} and is_deleted = 0`;
    let sqlTravel = `SELECT * FROM travel WHERE user_id = ${user_id} and is_deleted = 0`;

    connection.query(sqlUser, (error, resultUser) => {
      if (error) {
        console.log("error response user", error);
        res.status(400).json({ error });
        return;
      }

      if (resultUser.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      connection.query(sqlTravel, (error2, resultTravel) => {
        if (error2) {
          console.log("error response travel", error2);
          res.status(400).json({ error2 });
          return;
        }

        if (resultTravel.length === 0) {
          resultTravel = [];
        }  

        res.status(200).json({ resultUser, resultTravel });
      });
    });
  };

  //---------------------------------------------------
  // 4.- Trae todos los usuarios de la tabla user
  //localhost:4000/users/allUser
  selectAllUsers = (req, res) => {
    console.log("headerrresssdasdasda", req.headers.authorization);

    let sql = "select * from user";
    // let sql = `select user.*, travel.*, photo.* from user,≈ travel, photo where user.user_id = travel.user_id and travel.travel_id = photo.travel_id and user.type=0 and travel.is_deleted = 0 and user.is_deleted = 0 group by travel.travel_id ORDER BY RAND() `;

    // let sql = `select user.*, travel.*, photo.* from user, travel, photo where user.user_id = travel.user_id and travel.travel_id = photo.travel_id and user.type=0 and travel.is_deleted = 0 and user.is_deleted = 0  `;

    // let sql = `select user.*, travel.*, photo.* from user left join travel on user.user_id = travel.user_id left join photo on travel.travel_id = photo.travel_id where user.type = 0 and travel.is_deleted = 0 and user.is_deleted = 0 and photo.is_deleted = 0 group by travel.travel_id ORDER BY RAND()`;

    // let sql ="SELECT * FROM user"

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log("error", error);
    });
  };

  //-----------------------------------------------------
  /// 5.- Editar un usuario
  //localhost:4000/users/editUser/:userId
  // Edit a user by user_id
  editUser = (req, res) => {
    const user_id = req.params.user_id;
    const { name, lastname, phone, address, email, img  } = req.body;
  
  
    // Initialize an empty object to store fields to update
    const updateFields = {};
  
    // Check if each field is provided and add it to the updateFields object
    if (name !== undefined) {
      updateFields.name = name;
    }
  
    if (lastname !== undefined) {
      updateFields.lastname = lastname;
    }
  
    if (phone !== undefined) {
      updateFields.phone = phone;
    }
  
    if (address !== undefined) {
      updateFields.address = address;
    }
  
    if (email !== undefined) {
      updateFields.email = email;
    }
  
    if (img !== undefined) {
      updateFields.img = img;
    }
  
    // Check if any fields to update are provided
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }
  
    const sql = `UPDATE user SET ? WHERE user_id = ?`;
  
    connection.query(sql, [updateFields, user_id], (error, result) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(400).json({ error: "Failed to update user" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(result);
    });
  };
  

  //-----------------------------------------------
  // 6.- Eliminar un usuario de manera lógica
  //localhost:4000/users/deleteUser/:userId

  deleteUser = (req, res) => {
    const user_id = req.params.user_id;

    if (!user_id || isNaN(user_id)) {
      // Invalid or missing user_id parameter
      return res.status(400).json({ error: "Invalid user_id parameter" });
    }

    const sql = `DELETE FROM user WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Failed to delete user" });
      }

      if (result.affectedRows === 0) {
        // No user with the specified user_id found
        return res.status(404).json({ error: "User not found" });
      }

      // User successfully deleted
      res.status(200).json({ message: "User deleted successfully" });
    });
  };

  //-----------------------------------------------
  // 7.- Trae la info de un usuario para editarlo
  //localhost:4000/users/editUser/:userId

  getEditOneUser = (req, res) => {
    console.log(req);
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = "${user_id}"`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 8.- Trae todas las fotos de un usuario con todos sus viajes
  //localhost:4000/users/getAllPhotos/:user_id
  getAllPhotos = (req, res) => {
    console.log("********//////////*********", req.params);
    let user_id = req.params.user_id;

    let sql = `select user.*, travel.*, photo.* from user, travel, photo where user.user_id = travel.user_id and travel.travel_id = photo.travel_id and user.type=0 and travel.is_deleted = 0 and user.is_deleted = 0 and user.user_id = ${user_id} group by travel.travel_id`;
    let sql2 = `select travel.*, photo.* from travel, photo where travel.user_id = ${user_id} and travel.travel_id = photo.travel_id and travel.is_deleted = 0`;

    connection.query(sql, (error, resultTravels) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sql2, (error2, resultPhotos) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ resultTravels, resultPhotos });
      });
    });
  };
}

module.exports = new userController();
