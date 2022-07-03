const express = require("express");
const { render } = require("ejs");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const funtions = {};

// funtions.p = (req, res) => {
//     res.render("notification");
// };

funtions.home = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      res.render("home");
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/loginClient");
  }
};
funtions.index = (req, res) => {
  if (req.session.loggedin) {
    res.render("index",{
      login: true,
      name: req.session.name,
      role: req.session.role,
    });
  } else {
    res.render("loginClientes");
  }
};

funtions.logAut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

funtions.login = (req, res) => {
  if (req.session.loggedin) {
    res.redirect("/home");
  } else {
    res.render("login");
  }
};

funtions.loginClient = (req, res) => {
  if (req.session.loggedin) {
    res.redirect("/home",{
      login: true,
      name: req.session.name,
      role: req.session.role,
    });
  } else {
    res.render("loginClientes");
  }
};
funtions.registerUsers = (req, res) => {
  if (req.session.loggedin) {
    res.render("registerUserClient");
  } else {
    res.render("login");
  }
};

funtions.registerTable = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      req.getConnection((error, conn) => {
        conn.query("SELECT * FROM usuarios", (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.render("registerTable", {
              results: results,
              login: true,
              name: req.session.name,
              role: req.session.role,
            });
          }
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};

funtions.registerTableClient = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      req.getConnection((error, conn) => {
        conn.query("SELECT * FROM clientes", (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.render("registerTableClients", {
              results: results,
              login: true,
              name: req.session.name,
              role: req.session.role,
            });
          }
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};

funtions.registerUEdit = (req, res) => {
  if (req.session.loggedin) {
    if (
      req.session.role == "SuperAdmin" ||
      req.session.role == "Administrador"
    ) {
      const id = req.params.id;
      req.getConnection((error, conn) => {
        conn.query(
          "SELECT * FROM usuarios WHERE id = ?",
          [id],
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              console.log(results);
              res.render("registerEditUser", {
                user: results[0],
                login: true,
                name: req.session.name,
                role: req.session.role,
              });
            }
          }
        );
      });
    } else {
      res.render("login", {
        login: false,
      });
    }
  } else {
    res.redirect("/login");
  }
};

funtions.registerUEditClient = (req, res) => {
  if (req.session.loggedin) {
    if (
      req.session.role == "SuperAdmin"
    ) {
      const id = req.params.id;
      req.getConnection((error, conn) => {
        conn.query(
          "SELECT * FROM clientes WHERE id = ?",
          [id],
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              console.log(results);
              res.render("registerEditUserClient", {
                user: results[0],
                login: true,
                name: req.session.name,
                role: req.session.role,
              });
            }
          }
        );
      });
    } else {
      res.render("login", {
        login: false,
      });
    }
  } else {
    res.redirect("/login");
  }
};


funtions.BlockUser = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      const bloqueado = "bloqueado";
      const id = req.params.id;
      req.getConnection((error, conn) => {
        conn.query(
          "UPDATE usuarios SET ? WHERE id = ?",
          [{ role: bloqueado }, id],
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.redirect("/registerTable");
            }
          }
        );
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};

funtions.statusTable = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      req.getConnection((error, conn) => {
        conn.query("SELECT * FROM status", (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.render("statusTable", {
              results: results,
              login: true,
              name: req.session.name,
              role: req.session.role,
            });
          }
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};
funtions.addstatus = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      res.render("addstatus", {
        login: true,
        name: req.session.name,
        role: req.session.role,
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.render("login");
  }
};

funtions.delateStatus = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      const id = req.params.id;
      req.getConnection((error, conn) => {
        conn.query(
          "DELETE FROM status WHERE id = ?",
          [id],
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.redirect("/statusTable");
            }
          }
        );
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};
funtions.addMercancia = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      req.getConnection((error, conn) => {
        conn.query("SELECT * FROM STATUS ", (error, results) => {
          if (error) {
            console.log(error);
          } else {
            conn.query("SELECT * FROM clientes ", (error, resultsClient) => {
              if (error) {
                console.log(error);
              } else {
                console.log(resultsClient);
                res.render("addMercancia", {
                  login: true,
                  result: results,
                  resultsClient: resultsClient,
                  name: req.session.name,
                  role: req.session.role,
                });
              }
            });
          }
        });
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.render("login");
  }
};

funtions.mercanciaTable = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      req.getConnection((error, conn) => {
        conn.query("SELECT * FROM objetos", (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.render("mercanciaTable", {
              results: results,
              login: true,
              name: req.session.name,
              role: req.session.role,
            });
          }
        });
      });
    } else {
      req.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};

funtions.mercanciaUpdateHistorial = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
      const id = req.params.id;
      req.getConnection((error, conn) => {
        conn.query("SELECT * FROM status", (error, data) => {
          if (error) {
            console.log(error);
          } else {
            req.getConnection((error, conn) => {
              conn.query(
                "SELECT * FROM `historial` WHERE awbID = ? ORDER by id DESC;",
                [id],
                (error, resultsHistory) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(resultsHistory);
                    if (resultsHistory.length > 0) {
                      req.getConnection((error, conn) => {
                        conn.query(
                          "SELECT * FROM objetos WHERE id = ?",
                          [id],
                          (error, results) => {
                            if (error) {
                              console.log(error);
                            } else {
                              res.render("addMercanciaUpdateStatus", {
                                data: data,
                                results1: resultsHistory,
                                results3: results,
                                login: true,
                                name: req.session.name,
                                role: req.session.role,
                                id: id,
                              });
                            }
                          }
                        );
                      });
                    } else {
                      req.getConnection((error, conn) => {
                        conn.query(
                          "SELECT * FROM objetos WHERE id = ?",
                          [id],
                          (error, results) => {
                            if (error) {
                              console.log(error);
                            } else {
                              res.render("addMercanciaUpdateStatus", {
                                data: data,
                                results2: results,
                                login: true,
                                name: req.session.name,
                                role: req.session.role,
                                id: id,
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
          }
        });
      });
    } else {
      req.redirect("/");
    }
  } else {
    res.redirect("/login");
  }
};

funtions.fotosHistorial = (req, res) => {
  if (req.session.loggedin) {
    if (req.session.role == "SuperAdmin") {
    }
    const id = req.params.id;
    req.getConnection((error, conn) => {
      conn.query(
        "SELECT * FROM imagenes WHERE idHistorial = ?",
        [id],
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.render("mercanciaImagenesTable", {
              results: results,
              idAWS: id,
            });
          }
        }
      );
    });
  } else {
    res.redirect("/login");
  }
};
funtions.foto = (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    req.getConnection((error, conn) => {
      conn.query(
        "SELECT * FROM objetos WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            req.getConnection((error, conn) => {
              conn.query("SELECT * FROM STATUS ", (error, data) => {
                if (error) {
                  console.log(error);
                } else {
                  res.render("addFoto", {
                    results: results,
                    data: data,
                    idFoto: id,
                  });
                }
              });
            });
          }
        }
      );
    });
  } else {
    res.redirect("/login");
  }
};

funtions.dataHistorial = (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    req.getConnection((error, conn) => {
      conn.query(
        "SELECT * FROM `historial` WHERE awbID = ? ORDER by id DESC;",
        [id],
        (error, resultsHistory) => {
          if (error) {
            console.log(error);
          } else {
            console.log(resultsHistory);
            if (resultsHistory.length > 0) {
              req.getConnection((error, conn) => {
                conn.query(
                  "SELECT * FROM objetos WHERE id = ?",
                  [id],
                  (error, results) => {
                    if (error) {
                      console.log(error);
                    } else {
                      res.render("tabledataHistori", {
                        results: resultsHistory,
                        dataMerc: results,
                        login: true,
                        name: req.session.name,
                        role: req.session.role,
                        id: id,
                      });
                    }
                  }
                );
              });
            } else {
              req.getConnection((error, conn) => {
                conn.query(
                  "SELECT * FROM objetos WHERE id = ?",
                  [id],
                  (error, results) => {
                    if (error) {
                      console.log(error);
                    } else {
                      res.render("notification", {
                        alert: true,
                        alertTitle:
                          "lo sentimos pero esta mercancía aun no tiene historial de estatus",
                        alertMessage: "",
                        alertIcon: "error",
                        showConfirmButton: false,
                        ruta: "../mercanciaTable",
                        timer: 3000,
                        role: req.session.role,
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
  } else {
    res.redirect("/login");
  }
};

funtions.BlockUserClient = (req, res) => {
  if (req.session.loggedin) {
    const bloqueado = "bloqueado";
    const id = req.params.id;
    req.getConnection((error, conn) => {
      conn.query(
        "UPDATE clientes SET ? WHERE id = ?",
        [{ role: bloqueado }, id],
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.redirect("/registerTableClient");
          }
        }
      );
    });
  }
};

funtions.delateMercancia = (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    req.getConnection((error, conn) => {
      conn.query("DELETE FROM objetos WHERE id= ?", [id], (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/inventarioConsumiblesRedline");
        }
      });
    });
  }
};

funtions.delateImagenes = (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    req.getConnection((error, conn) => {
      conn.query("DELETE FROM imagenes WHERE id= ?", [id], (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/mercanciaTable");
        }
      });
    });
  }
};



funtions.mercanciaService = (req, res) => {
  if (req.session.loggedin) {
    req.getConnection((error, conn) => {
      conn.query("SELECT * FROM status", (error, data) => {
        if (error) {
          console.log(error);
        } else {
          conn.query("SELECT * FROM objetos", (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.render("mercanciaTableservices", {
                data: data,
                results: results,
                login: true,
                name: req.session.name,
                role: req.session.role,
              });
            }
          });
        }
      });
    });
  } else {
    res.redirect("/login");
  }
};

funtions.passwordNew = (req, res) => {
  if (req.session.loggedin) {
      if (req.session.role == "SuperAdmin") {
          const id = req.params.id;
          req.getConnection((error, conn) => {
              conn.query(
                  "SELECT * FROM usuarios WHERE id = ?", [id],
                  (error, results) => {
                      if (error) {
                          console.log(error);
                      } else {
                          res.render("newPassword", { user: results[0], role: req.session.role, });
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
funtions.passwordNewClient = (req, res) => {
  if (req.session.loggedin) {
      if (req.session.role == "SuperAdmin") {
          const id = req.params.id;
          req.getConnection((error, conn) => {
              conn.query(
                  "SELECT * FROM clientes WHERE id = ?", [id],
                  (error, results) => {
                      if (error) {
                          console.log(error);
                      } else {
                          res.render("newPasswordClient", { user: results[0], role: req.session.role, });
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


funtions.mercanciaServiceClient = (req, res) => {
  if (req.session.loggedin) {
    const client = req.params.client;
    req.getConnection((error, conn) => {
      conn.query("SELECT * FROM status", (error, data) => {
        if (error) {
          console.log(error);
        } else {
          conn.query("SELECT * FROM objetos WHERE cliente = ? ", [client], (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.render("mercanciaTableservicesClient", {
                data: data,
                results: results,
                login: true,
                name: req.session.name,
                role: req.session.role,
              });
            }
          });
        }
      });
    });
  } else {
    res.redirect("/login");
  }
};

funtions.p = (req, res) => {
  res.render("diseño")
}

module.exports = funtions;
