import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/genrateTokenJWT.js";
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExits = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExits) {
    return res.status(400).json({ error: "User already exists" });
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = await prisma.user.create({
    data: { name, email, password: hashPassword },
  });
  // genrate JWT Token
  const token = generateToken(user.id, res);
  res.status(201).json({
    status: "ok",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const userExits = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!userExits) {
    return res
      .status(401)
      .json({ error: "invalid email or password please check it" });
  }
  const isPassword = bcrypt.compareSync(password, userExits.password);
  if (!isPassword) {
    return res
      .status(401)
      .json({ error: "invalid email or password please check it" });
  }

  // genrate JWT Token
  const token = generateToken(userExits.id, res);
  res.status(201).json({
    status: "ok",
    data: {
      user: {
        id: userExits.id,
        email: userExits.email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "logged out successfully",
  });
};

export { login, logout, register };
