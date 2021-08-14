module.exports.userRole = (id) => {
  switch (id) {
    case 0:
      return 'student';
    case 1:
      return 'hod';
    case 2:
      return 'admin';
    case 3:
      return 'committee';
    case 4:
      return 'store';
    default:
      return null;
  }
};

module.exports.validUserRoles = (id) => {
  switch (id) {
    case 'student':
    case 'hod':
    case 'admin':
    case 'committee':
    case 'committee':
      return true;
    default:
      return false;
  }
};
