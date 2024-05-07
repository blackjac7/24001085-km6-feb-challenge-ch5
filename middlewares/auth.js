const { getTokenFromHeaders, verifyToken } = require("../helpers/auth");
const { getProfile } = require("../usecases/auth");

exports.authMiddleware = (roles) => async (req, res, next) => {
    try {
        const token = getTokenFromHeaders(req.headers);

        if (!token) {
            return next({
                message: "Please login first",
                statusCode: 401,
            });
        }

        const decoded = verifyToken(token);

        const user = await getProfile(decoded?.id);

        if (!roles.includes(user?.role)) {
            return next({
                message: "Forbidden",
                statusCode: 403,
            });
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
