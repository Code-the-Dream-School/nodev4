import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const existingUser = global.users.find(
    (user) => user.email === req.body?.email,
  );
  if (existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exists" });
  }

  const newUser = { ...req.body };
  global.users.push(newUser);

  res.status(StatusCodes.CREATED).json({
    name: newUser.name,
    email: newUser.email,
  });
};

export const logon = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  const user = global.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentials" });
  }

  global.user_id = user;

  res.status(StatusCodes.OK).json({
    name: user.name,
    email: user.email,
  });
};

export const logoff = async (req, res) => {
  global.user_id = null;
  res.sendStatus(StatusCodes.OK);
};
