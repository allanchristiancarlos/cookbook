export function stringToTitleCase(str) {
  if (!str) {
    return str;
  }
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function stringRemoveLineBreaks(str) {
  return (str || '').replace(/(\r\n|\n|\r)/gm, '');
}
