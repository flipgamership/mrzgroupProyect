const express = require("express");
const { render } = require("ejs");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const funtions = {};

//vistas login

funtions.loginAuth = async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
  if (user && pass) {
    req.getConnection((error, conn) => {
      conn.query(
        "SELECT * FROM usuarios WHERE correo=?",
        [user],
        async (error, results) => {
          if (
            results.length === 0 ||
            !(await bcryptjs.compare(pass, results[0].password))
          ) {
            res.render("login", {
              role: req.session.role,
              alert: true,
              alertTitle: "Ups los datos no coinciden",
              alertMessage:
                "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde",
              alertIcon: "error",
              showConfirmButton: true,
              ruta: "login",
              timer: 10000,
            });
          } else {
            req.session.loggedin = true;
            req.session.name = results[0].nombre;
            req.session.role = results[0].role;
            req.session.ID = results[0].id;
            if (req.session.role == "bloqueado") {
              req.session.destroy(() => {
                res.render("login", {
                  alert: true,
                  alertTitle: "Ups este usuario esta BLOQUEADO",
                  alertMessage: "BLOQUEADO",
                  alertIcon: "error",
                  showConfirmButton: true,
                  ruta: "login",
                  timer: 10000,
                });
              });
            } else {
              res.render("login", {
                alert: true,
                alertTitle: "acceso consedido",
                alertMessage: "acceso valido",
                alertIcon: "success",
                showConfirmButton: false,
                ruta: "home",
                timer: 3000,
              });
            }
          }
        }
      );
    });
  } else {
    res.render("login", {
      role: req.session.role,
      alert: true,
      alertTitle: "Ups por favor llene todos los datos",
      alertMessage:
        "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde",
      alertIcon: "error",
      showConfirmButton: true,
      ruta: "login",
      timer: 10000,
    });
  }
};

funtions.loginAuthClients = async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
  if (user && pass) {
    req.getConnection((error, conn) => {
      conn.query(
        "SELECT * FROM  clientes WHERE correo=?",
        [user],
        async (error, results) => {
          if (
            results.length === 0 ||
            !(await bcryptjs.compare(pass, results[0].password))
          ) {
            res.render("loginClientes", {
              role: req.session.role,
              alert: true,
              alertTitle: "Ups los datos no coinciden",
              alertMessage:
                "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde",
              alertIcon: "error",
              showConfirmButton: true,
              ruta: "loginClient",
              timer: 10000,
            });
          } else {
            req.session.loggedin = true;
            req.session.name = results[0].nombre;
            req.session.role = results[0].role;
            req.session.ID = results[0].id;
            if (req.session.role == "bloqueado") {
              req.session.destroy(() => {
                res.render("loginClientes", {
                  alert: true,
                  alertTitle: "Ups este usuario esta BLOQUEADO",
                  alertMessage: "BLOQUEADO",
                  alertIcon: "error",
                  showConfirmButton: true,
                  ruta: "loginClient",
                  timer: 10000,
                });
              });
            } else {
              res.render("loginClientes", {
                alert: true,
                alertTitle: "acceso consedido",
                alertMessage: "acceso valido",
                alertIcon: "success",
                showConfirmButton: false,
                ruta: "",
                timer: 3000,
              });
            }
          }
        }
      );
    });
  } else {
    res.render("loginClientes", {
      role: req.session.role,
      alert: true,
      alertTitle: "Ups por favor llene todos los datos",
      alertMessage:
        "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde",
      alertIcon: "error",
      showConfirmButton: true,
      ruta: "loginClient",
      timer: 10000,
    });
  }
};

funtions.sendRegister = async (req, res) => {
  const name = req.body.name;
  const pass = req.body.pass;
  const email = req.body.email;
  const warrant = req.body.warrant;
  const phone = req.body.phone;
  const role = req.body.role;
  console.log(name, pass, email, warrant, phone, role);
  req.getConnection((error, conn) => {
    conn.query(
      "SELECT * FROM usuarios WHERE correo = ? ",
      [email],
      async (error, results) => {
        if (error) {
          console.log(error);
        } else {
          if (results.length != 0) {
            console.log("el correo esta registrado");
            res.render("notification", {
              alert: true,
              alertTitle: "el correo ya esta registrado",
              alertMessage:
                "este correo de Usuario ya fue registrado en la plataforma",
              alertIcon: "error",
              showConfirmButton: true,
              ruta: "usuario",
              timer: 15000,
            });
          } else {
            console.log(role);
            let passwordHaash = await bcryptjs.hash(pass, 8);
            req.getConnection((error, conn) => {
              conn.query(
                "INSERT INTO usuarios SET ?",
                {
                  nombre: name,
                  password: passwordHaash,
                  correo: email,
                  warrant: warrant,
                  telefono: phone,
                  role: role,
                },
                async (error, results) => {
                  if (error) {
                    console.log(error);
                    res.render("notification", {
                      role: req.session.role,
                      alert: true,
                      alertTitle: "Ups hubo algun problema",
                      alertMessage:
                        "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde ten en cuenta que si el usuario ya esta creado no lo podras agregar",
                      alertIcon: "error",
                      showConfirmButton: true,
                      ruta: "usuario",
                      timer: 15000,
                    });
                  } else {
                    console.log(results);
                    res.render("notification", {
                      role: req.session.role,
                      alert: true,
                      alertTitle: "Registrado",
                      alertMessage: "Registro de cuenta Exitosa",
                      alertIcon: "success",
                      showConfirmButton: true,
                      ruta: "register",
                      timer: 15000,
                    });
                  }
                }
              );
            });
          }
        }
      }
    );
  });
};

funtions.sendRegisterClients = async (req, res) => {
  const name = req.body.name;
  const pass = req.body.pass;
  const email = req.body.email;
  const warrant = req.body.warrant;
  const phone = req.body.phone;
  const role = req.body.role;
  console.log(name, pass, email, warrant, phone, role);
  req.getConnection((error, conn) => {
    conn.query(
      "SELECT * FROM clientes WHERE correo = ? ",
      [email],
      async (error, results) => {
        if (error) {
          console.log(error);
        } else {
          if (results.length != 0) {
            console.log("el correo esta registrado");
            res.render("notification", {
              alert: true,
              alertTitle: "el correo ya esta registrado",
              alertMessage:
                "este correo de Usuario ya fue registrado en la plataforma",
              alertIcon: "error",
              showConfirmButton: true,
              ruta: "usuario",
              timer: 15000,
            });
          } else {
            console.log(role);
            let passwordHaash = await bcryptjs.hash(pass, 8);
            req.getConnection((error, conn) => {
              conn.query(
                "INSERT INTO clientes SET ?",
                {
                  nombre: name,
                  password: passwordHaash,
                  correo: email,
                  warrant: warrant,
                  telefono: phone,
                  role: role,
                },
                async (error, results) => {
                  if (error) {
                    console.log(error);
                    res.render("notification", {
                      role: req.session.role,
                      alert: true,
                      alertTitle: "Ups hubo algun problema",
                      alertMessage:
                        "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde ten en cuenta que si el usuario ya esta creado no lo podras agregar",
                      alertIcon: "error",
                      showConfirmButton: true,
                      ruta: "usuario",
                      timer: 15000,
                    });
                  } else {
                    console.log(results);
                    res.render("notification", {
                      role: req.session.role,
                      alert: true,
                      alertTitle: "Registrado",
                      alertMessage: "Registro de cuenta Exitosa",
                      alertIcon: "success",
                      showConfirmButton: true,
                      ruta: "register",
                      timer: 15000,
                    });
                  }
                }
              );
            });
          }
        }
      }
    );
  });
};
funtions.sendUpdateUser = (req, res) => {
  if (req.session.loggedin) {
    if (
      req.session.role == "SuperAdmin" ||
      req.session.role == "Administrador"
    ) {
      const id = req.body.id;
      const name = req.body.name;
      const email = req.body.email;
      const warrant = req.body.warrant;
      const phone = req.body.phone;
      const role = req.body.role;
      req.getConnection((error, conn) => {
        conn.query(
          "UPDATE usuarios SET ? WHERE id = ?",
          [
            {
              nombre: name,
              correo: email,
              warrant: warrant,
              telefono: phone,
              role: role,
            },
            id,
          ],
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.redirect("/register");
            }
          }
        );
      });
    } else {
      res.redirect("/home");
    }
  } else {
    res.redirect("/login");
  }
};

funtions.savePasssword = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.body.id;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    req.getConnection((error, conn) => {
      conn.query(
        "UPDATE usuarios SET ? WHERE id = ?",
        [{ password: passwordHaash }, id],
        async (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.redirect("/register");
          }
        }
      );
    });
  } else {
    res.redirect("/login");
  }
};

funtions.sendAddStatus = async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const porcentaje = req.body.porcentaje;
  req.getConnection((error, conn) => {
    conn.query(
      "INSERT INTO status SET ?",
      {
        name: name,
        descripcion: description,
        porcentaje: porcentaje,
      },
      async (error, results) => {
        if (error) {
          console.log(error);
          res.render("notification", {
            role: req.session.role,
            alert: true,
            alertTitle: "Ups hubo algun problema",
            alertMessage:
              "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde",
            alertIcon: "error",
            showConfirmButton: true,
            ruta: "AgregarStatus",
            timer: 15000,
          });
        } else {
            res.render("notification", {
                role: req.session.role,
                alert: true,
                alertTitle: "agregado",
                alertMessage: "se agrego el estatus de forma  Exitosa",
                alertIcon: "success",
                showConfirmButton: true,
                ruta: "statustable",
                timer: 15000,
              });
           
        }
      }
    );
  });
};
funtions.sendAddMercancia = async (req, res) => {
  const AWB = req.body.AWB;
  const status = req.body.status;
  const name = req.body.name;
  const cliente = req.body.cliente;
  const fecha = req.body.fecha;
  req.getConnection((error, conn) => {
    conn.query(
      "INSERT INTO objetos SET ?",
      {
        awb: AWB,
        status: status,
        name: name,
        cliente: cliente,
        fecha: fecha,
      },
      async (error, results) => {
        if (error) {
          console.log(error);
          res.render("notification", {
            role: req.session.role,
            alert: true,
            alertTitle: "Ups hubo algun problema",
            alertMessage:
              "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde",
            alertIcon: "error",
            showConfirmButton: true,
            ruta: "sendMercancia",
            timer: 15000,
          });
        } else {
          console.log(results);
          res.render("notification", {
            role: req.session.role,
            alert: true,
            alertTitle: "agregado",
            alertMessage: "se agrego el estatus de forma  Exitosa",
            alertIcon: "success",
            showConfirmButton: true,
            ruta: "home",
            timer: 15000,
          });
        }
      }
    );
  });
};

funtions.SubirNuevoArchivos = (req, res) => {
  if (req.session.loggedin) {
    const idHistorial = req.params.id;
    const file = req.file.filename;
    const status = req.body.status;
    req.getConnection((error, conn) => {
      conn.query(
        "INSERT INTO imagenes SET ? ",
        { imagen: file, statusHistorial: status, idHistorial: idHistorial },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            res.render("notification", {
              alert: true,
              alertTitle: "foto subida con exito",
              alertMessage: "",
              alertIcon: "success",
              showConfirmButton: false,
              ruta: "../addFotosTable/" + idHistorial,
              timer: 3000,
              role: req.session.role,
            });
          }
        }
      );
    });
  } else {
    res.redirect("/login");
  }
};

funtions.estatusNuevoRegister = (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    const awb = req.body.AWB;
    const status = req.body.status;
    const name = req.body.name;
    const cliente = req.body.cliente;
    const fecha = req.body.fecha;
    const observaciones = req.body.observaciones;
    req.getConnection((error, conn) => {
      conn.query(
        "INSERT INTO historial SET ?",
        {
          awbID: id,
          estatusHistorial: status,
          fecha: fecha,
          observaciones: observaciones,
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            conn.query(
                "UPDATE objetos SET ? WHERE id = ?",
                [
                  {
                    status: status,
                  },
                  id,
                ],
                (error, result) => {
                  if (error) {
                    console.log(error);
                  } else {
                    res.render("notification", {
                        alert: true,
                        alertTitle: "estatus actualizado",
                        alertMessage: "",
                        alertIcon: "success",
                        showConfirmButton: false,
                        ruta: "../mercanciaTable",
                        timer: 3000,
                        role: req.session.role,
                      });
                  }
                }
              );
          
          }
        }
      );
    });
  } else {
    res.redirect("/login");
  }
};

funtions.savePasssword = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.body.id;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    req.getConnection((error, conn) => {
      conn.query(
        "UPDATE usuarios SET ? WHERE id = ?",
        [{ password: passwordHaash }, id],
        async (error, results) => {
          if (error) {
            console.log(error);
          } else {
          }
        }
      );
    });
  }
};

funtions.buscador = (req, res) => {
    if (req.session.loggedin){
      const busqueda = req.body.busqueda;
      req.getConnection((error, conn) => {
        conn.query("SELECT * FROM objetos WHERE awb = ?", [busqueda], )
      })
      
    }else{
  
    }
  }
  

module.exports = funtions;
