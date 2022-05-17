const express = require("express");
const { render } = require("ejs");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const funtions = {};

funtions.index = (req, res) => {
        res.render("index");
};

funtions.logAut = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
funtions.login = (req, res) => {
    if(req.session.loggedin){
        res.redirect("/");
    }else{
        res.render("login");
    }
    
};
funtions.registerUsers = (req, res) => {
    if(req.session.loggedin){
        res.render('registerUser')
    }else{
        res.render("login");
    }
        };


funtions.registerTable = (req, res) => {
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
};

funtions.registerUEdit = (req, res) => {
    if (req.session.loggedin) {
        if (req.session.role == "SuperAdmin" || req.session.role == "Administrador") {
            const id = req.params.id;
            req.getConnection((error, conn) => {
                conn.query(
                    "SELECT * FROM usuarios WHERE id = ?", [id],
                    (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.render("editUsers", {
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
funtions.passwordNew = (req, res) => {
    if (req.session.loggedin) {
        if (req.session.role == "SuperAdmin" || req.session.role == "Administrador") {
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
funtions.BlockUser = (req, res) => {
    if (req.session.loggedin) {
        
            const bloqueado = "bloqueado"
            const id = req.params.id;
            req.getConnection((error, conn) => {
                conn.query(
                    "UPDATE usuarios SET ? WHERE id = ?", [{ role: bloqueado }, id],
                    (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.redirect("/registerTable");
                        }
                    }
                );
            });
        
    }else{
        res.redirect("/login")
    }
};
module.exports = funtions;