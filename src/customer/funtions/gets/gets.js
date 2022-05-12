const express = require("express");
const { render } = require("ejs");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const funtions = {};

funtions.registerUsers = (req, res) => {
            res.render('registerUser')
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
module.exports = funtions;