export function classNames(...args: any): string {
  let temp = [...args];
  let classes = [] as any[];

  for (var i = 0; i < temp.length; i++) {
    let arg = temp[i];
    if (!arg) continue;

    let argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      let inner = classNames(...arg); //.apply(null, arg)
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (var key in arg) {
        classes.push(key);
      }
    }
  }
  classes = classes.join(' ').split(' ');
  const new_classes = classes.filter(
    (c, index) => classes.indexOf(c) === index
  );
  return new_classes.join(' ');
}
