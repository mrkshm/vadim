export function sortDesc(a: any, b: any) {
  if (a.fields.order > b.fields.order) {
    return -1;
  }
  if (a.fields.order < b.fields.order) {
    return 1;
  }
  return 0;
}

export function sortAsc(a: any, b: any) {
  if (a.fields.order < b.fields.order) {
    return -1;
  }
  if (a.fields.order > b.fields.order) {
    return 1;
  }
  return 0;
}
