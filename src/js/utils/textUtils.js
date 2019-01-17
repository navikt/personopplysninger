/* eslint-disable import/prefer-default-export */

export const formatName = str => (
  str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
);
