import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authServices } from "../services/auth.service.js";

const REFRESH_TOKEN_SECRET = "YOUR_REFRESH_TOKEN_SECRET"
const ACCESS_TOKEN_SECRET = "YOUR_ACCESS_TOKEN_SECRET"

export const authController = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      const userName = await authServices.checkUsername(username);
      if (userName)
        return res.status(422).json({ msg: "Tên người dùng đã tồn tại." });

      const userEmail = await authServices.checkEmail(email);
      if (userEmail)
        return res.status(422).json({ msg: "Email này đã tồn tại." });

      if (password.length < 6 || password.includes(' '))
        return res.status(422).json({ msg: "Mật khẩu phải có ít nhất 6 kí tự và không có khoảng trắng." });

      const passwordHash = await bcrypt.hash(password, 12);
      const user = await authServices.register(
        fullname,
        username,
        email,
        passwordHash,
        gender
      );

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      return res.status(200).json({
        msg: "Đăng kí thành công!",
        accessToken,
        refreshToken,
        user,
      });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await authServices.checkEmail(email);
      if (!user)
        return res.status(401).json({ msg: "Email này không tồn tại." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ msg: "Mật khẩu không chính xác." });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      return res.status(200).json({
        msg: "Đăng nhập thành công!",
        accessToken,
        refreshToken,
        user,
      });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const {refreshToken} = req.body;
      if (!refreshToken || refreshToken.trim() == "")
        return res.status(401).json({ msg: "Xin hãy đăng nhập." });

      jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(401).json({ msg: "Xin hãy đăng nhập." });
          const user = await authServices.getUser(result.id);

          if (!user)
            return res.status(401).json({ msg: "Người dùng không tồn tại." });
          const accessToken = createAccessToken({ id: result.id });

          return res.status(200).json({
            accessToken,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
