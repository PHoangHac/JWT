import jwt from "jsonwebtoken";

const middlewaresController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_SCERET_KEY, (err, user) => {
        if (err) {
          return res.status(400).json("token is not valid !");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(400).json("You are not authenticated !");
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewaresController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(400).json("You are not allowed to delete other !");
      }
    });
  },
};

export default middlewaresController;
