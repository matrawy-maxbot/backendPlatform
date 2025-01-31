import Permissions from '../../utils/permissions/permissions.util.js';

export const hasPermissions = (...permissions) => (req, res, next) => {
    const userPermissions = new Permissions(req.user.permissions);
  
    if (!userPermissions.has(permissions)) {
      res.status(403);
      return next(new Error('You do not have the required permissions'));
    }
  
    next();
};

export const AnyPermission = (...permissions) => (req, res, next) => {
    const userPermissions = new Permissions(req.user.permissions);
  
    if (!userPermissions.any(permissions)) {
      res.status(403);
      return next(new Error('You do not have the required permissions'));
    }
  
    next();
}
  