import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .send(`You can't do a ${req.method} for ${req.url}`);
};

export default notFoundMiddleware;