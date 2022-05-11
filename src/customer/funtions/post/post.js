const express = require("express");
const { render } = require("ejs");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const funtions = {};

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
            'SELECT * FROM usuarios WHERE correo = ? ', [email], async (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    if ( results.length != 0 ) {
                        console.log('el correo esta registrado')
                        res.render("", {

                            alert: true,
                            alertTitle: "el correo ya esta registrado",
                            alertMessage: "este correo de Usuario ya fue registrado en la plataforma",
                            alertIcon: "error",
                            showConfirmButton: true,
                            ruta: "usuario",
                            timer: 15000,
                        });
                    } else {
                        console.log(role)
                        let passwordHaash = await bcryptjs.hash(pass, 8);
                        req.getConnection((error, conn) => {
                            conn.query(
                                "INSERT INTO usuarios SET ?", {
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
                                        res.render("", {
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
                                        console.log(results);
                                        res.render("", {
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

            })
    }

    )
};

module.exports = funtions;