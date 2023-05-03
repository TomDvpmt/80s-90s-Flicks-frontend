const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { createToken } = require("../utils/user");

/**
 * Authenticate a user.
 *
 * @async
 * @route POST /API/users/login
 * @access Public
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("Merci de remplir tous les champs requis.");
    }

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
    }

    const token = createToken(user);

    res.status(200).json({
        message: "Utilisateur connecté.",
        _id: user.id,
        token: token,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    });
});

/**
 * Create user.
 *
 * @async
 * @route POST /API/users/
 * @access Public
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.createUser = asyncHandler(async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body; // add imgUrl later

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Merci de remplir tous les champs requis.");
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        res.status(400);
        throw new Error(
            "Ce nom d'utilisateur existe déjà, veuillez en choisir un autre."
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hash,
        firstName,
        lastName,
    });

    if (!user) {
        res.status(400);
        throw new Error("Impossible de créer l'utilisateur.");
    }
    const token = createToken(user);

    res.status(201).json({
        message: "Utilisateur créé.",
        _id: user.id,
        token: token,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    });
});

/**
 * Get user info.
 *
 * @async
 * @route GET /API/users/:id
 * @access Private
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.getOneUser = asyncHandler(async (req, res) => {
    const userId = req.auth.id;

    try {
        const user = await User.findOne({ _id: userId });

        res.status(200).json({
            id: userId,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            moviesSeen: user.moviesSeen,
            moviesToSee: user.moviesToSee,
            favorites: user.favorites,
            language: user.language,
        });
    } catch (error) {
        res.status(404);
        throw new Error(
            "Impossible de récupérer les données de l'utilisateur."
        );
    }
});

/**
 * Update user.
 *
 * @async
 * @route PUT /API/users/:id
 * @access Private
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.updateUser = asyncHandler(async (req, res) => {
    const paramUserId = req.params.id;
    const loggedUserId = req.auth.id;
    const updateData = req.body;

    if (paramUserId !== loggedUserId) {
        res.status(401);
        throw new Error("Non autorisé.");
    }

    try {
        await User.updateOne({ _id: loggedUserId }, updateData);
        res.status(200).json({
            ...updateData,
            message: "Informations mises à jour.",
        });
    } catch (error) {
        res.status(400);
        throw new Error("Impossible de mettre à jour l'utilisateur.");
    }
});

/**
 * Delete user.
 *
 * @async
 * @route DELETE /API/users/:id
 * @access Private
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.deleteUser = asyncHandler(async (req, res) => {
    const paramId = req.params.id;
    const userId = req.auth.id;

    if (paramId !== userId) {
        res.status(401);
        throw new Error("Non autorisé");
    }

    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "Utilisateur supprimé." });
});
