export const parseToken = (token: string) => {
  return JSON.parse(atob(token.split('.')[1]).toString());
}

export const userFromToken = (token: string) => {
  const payload: any = parseToken(token);
  return payload.user;
}

export const query = (params: any): string => {
  const _params: URLSearchParams = new URLSearchParams(),
    keys: Array<string> = Object.keys(parseParams(params));

  if(keys.length === 0) {
    return null;
  }

  keys.forEach((key: string) => _params.append(key, params[key]));
  return _params.toString();
}

export const parseParams = (params: any): any => {
  const _params: any = {};

  Object.keys(params).forEach((key: string) => {
    if(params[key]) {
      _params[key] = params[key];
    }
  });

  return _params;
}

export const toSlug = (value: string) => {
  if (!value) {
    return "";
  }

  return value.toLowerCase().replace(/\s/g, "-");
};