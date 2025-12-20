const cookieLib = {
  getOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };
  },
  setCookie(res, name, value, options) {
    res.cookie(name, value, { ...this.getOptions(), ...options });
  },
  getCookie(req, name) {
    return req.cookies[name];
  },
  clearCookie(res, name) {
    res.clearCookie(name, this.getOptions());
  },
};

export default cookieLib;
