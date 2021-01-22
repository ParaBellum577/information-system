
export const permit = (...permittedRoles) => {
    return async (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next()
        }
        const { user } = request

        if (user && permittedRoles.includes(user.role)) {
            next();
        } else {
            res.status(403).json({message: "Forbidden"});
        }
    }
}
