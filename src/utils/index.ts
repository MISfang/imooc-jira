export const isFalsy = (val: any) => (val === 0 ? false : !val);

export const cleanObj = (Obj: object) => {
  // 这里这样把数据深拷贝一下，不要污染传入的原对象
  const res: any = { ...Obj };

  Object.keys(res).forEach((key) => {
    const val = res[key];
    if (isFalsy(val)) {
      delete res[key];
    }
  });
  return res;
};
