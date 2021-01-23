const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user.js");
const env = require("../../.env");

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const sendErrosFromDB = (res, dbErrors) => {
    const errors = [];

    _.forIn(dbErrors.errors, error => errors.push(error.message));

    return res.status(400).json({ errors });
};

const login = (req, res) => {
    const email = req.body.email || "";
    const password = req.body.password || "";

    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrosFromDB(res, err);
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user.toJSON(), env.authSecret, {
                expiresIn: "1 day"
            });

            const { name, email } = user;
            res.json({ name, email, token });
        } else {
            return res.status(400).send({ errors: ["Usuário/senha inválidos"] });
        }
    });
};

const validarToken = (req, res) => {
    const token = req.body.token || "";

    jwt.verify(token, env.authSecret, (err, decoded) => res.status(200).send({ valid: !err }));
};

const signUp = (req, res) => {
    const name = req.body.name || "";
    const email = req.body.email || "";
    const password = req.body.password || "";
    const confirmPassword = req.body.confirm_password || "";

    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ["O e-mail informado está inválido"] });
    }

    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisa ter: Mínimo 8 caractes, 1 letra maiúscula e 1 numero."
            ]
        });
    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ["Senhas não conferem"] });
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrosFromDB(res, err);
        } else if (user) {
            return res.status(400).send({ errors: ["Usário já cadastrado."] });
        } else {
            const newUser = new User({ name, email, password: passwordHash });

            newUser.save((err) => {
                if (err) {
                    return sendErrosFromDB(res, err);
                } else {
                    login(req, res);
                }
            });
        }
    });
};

module.exports = { login, signUp, validarToken };
