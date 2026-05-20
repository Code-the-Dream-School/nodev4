import { StatusCodes } from "http-status-codes";

export default (req, res, next) => {
  if (!global.user_id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  next();
};
