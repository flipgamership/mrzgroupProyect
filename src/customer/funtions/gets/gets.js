const express = require("express");
const { render } = require("ejs");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const funtions = {};

funtions.registerUsers = (req, res) => {
            res.render('registerUser')
        };


module.exports = funtions;