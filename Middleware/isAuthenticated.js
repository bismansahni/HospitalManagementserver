import jwt from 'jsonwebtoken';

const isAuthenticated = (Model) => {
  return async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Model.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token is not valid' });
    }
  };
};

export default isAuthenticated;
