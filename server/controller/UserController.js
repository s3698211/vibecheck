const { Users, Posts, Comments } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, confirmPassword, name, avatar } = req.body;
  if (password !== confirmPassword) {
    res.status(400).json({
      name: "password",
      message: "Password and confirmPassword do not match.",
    });
    return;
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    await Users.create({
      email: email,
      password: hash,
      confirmPassword: confirmPassword,
      name: name,
      avatar: avatar,
    })
      .then(() => {
        res.json("Success");
      })
      .catch((exception) => {
        res.status(400).json(
          exception.errors.map((err) => {
            if (err.message === "email must be unique") {
              res
                .status(400)
                .send({ name: "email", message: "Email is already taken." });
            } else {
              res.status(400).json({ name: err.path, message: err.message });
            }
          })
        );
      });
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } }).catch((err) => {
    res.status(400).send(err.errors);
  });

  if (!user) {
    res.status(404).send({ name: "email", message: "Email doesnt match." });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      res.status(404).send({ name: "password", message: "Wrong password." });

    //Create token
    const payload = {
      email: user.email,
      id: user.id,
      avatar: user.avatar,
      join: user.createdAt,
      name: user.name,
    };
    const accessToken = sign(payload, process.env.SECRET, {
      expiresIn: "2h",
    });
    res.json(accessToken);
  });
};

exports.getUser = async (req, res) => {
  const user = await Users.findOne({
    where: { email: req.params.email },
  });

  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) {
    res.json("User does not exist");
  }

  await Users.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.status(200).send("Success");
    })
    .catch((err) => res.json(err));
};
