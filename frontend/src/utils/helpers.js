import { ROLES, DASHBOARD_ROUTES, NAV_ITEMS, COMMON_ROUTES } from './constants.js';

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (user) => {
  return user && user.id && user.role;
};

/**
 * Check if user has specific role
 */
export const hasRole = (user, role) => {
  return isAuthenticated(user) && user.role === role;
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (user, roles) => {
  return isAuthenticated(user) && roles.includes(user.role);
};

/**
 * Get dashboard route for user's role
 */
export const getDashboardRoute = (user) => {
  if (!isAuthenticated(user)) return COMMON_ROUTES.LOGIN;
  return DASHBOARD_ROUTES[user.role] || COMMON_ROUTES.UNAUTHORIZED;
};

/**
 * Get navigation items for user's role
 */
export const getNavItems = (user) => {
  if (!isAuthenticated(user)) return [];
  return NAV_ITEMS[user.role] || [];
};

/**
 * Check if user can access specific route
 */
export const canAccessRoute = (user, route) => {
  if (!isAuthenticated(user)) return false;
  
  const userNavItems = getNavItems(user);
  return userNavItems.some(item => route.startsWith(item.path));
};

/**
 * Get redirect path for unauthorized access
 */
export const getUnauthorizedRedirect = (user) => {
  if (!isAuthenticated(user)) return COMMON_ROUTES.LOGIN;
  return COMMON_ROUTES.UNAUTHORIZED;
};

/**
 * Check if current path is active
 */
export const isActivePath = (currentPath, itemPath) => {
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
};

/**
 * Get user role display name
 */
export const getRoleDisplayName = (role) => {
  const roleNames = {
    [ROLES.STUDENT]: 'Student',
    [ROLES.TRAINER]: 'Trainer',
    [ROLES.COMPANY]: 'Company',
    [ROLES.ADMIN]: 'Admin'
  };
  return roleNames[role] || 'Unknown';
};

/**
 * Validate role exists in system
 */
export const isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};