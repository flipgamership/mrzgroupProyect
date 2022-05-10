const express = require("express");
const { render } = require("ejs");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const funtions = {};

funtions.sendRegister = async (req, res) => {
            const name = req.body.name;
            const user = req.body.user;
            const pass = req.body.pass;
            const email = req.body.email;
            const warrant = req.body.warrant;
            const address = req.body.address;
            const phone = req.body.phone;
            const dependence = req.body.dependence;
            const role = req.body.role;
            console.log(role)
            let passwordHaash = await bcryptjs.hash(pass, 8);
            req.getConnection((error, conn) => {
                conn.query(
                    "INSERT INTO dcUsuarios SET ?", {
                    name: name,
                    user: user,
                    password: passwordHaash,
                    email: email,
                    warrant: warrant,
                    address: address,
                    phone: phone,
                    dependence: dependence,
                    role: role,
                },
                    async (error, results) => {
                        if (error) {
                            console.log(error);
                            res.render("login", {
                                idUSERActual: req.session.ID,
                                role: req.session.role,
                                alert: true,
                                alertTitle: "Ups hubo algun problema",
                                alertMessage: "por favor revise correctamente la informacion y si este error continua vuelve a intentarlo mas tarde ten en cuenta que si el usuario ya esta creado no lo podras agregar",
                                alertIcon: "error",
                                showConfirmButton: true,
                                ruta: "usuario",
                                timer: 15000,
                            });
                        } else {
                            res.render("login", {
                                idUSERActual: req.session.ID,
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
};

module.exports = funtions;