import { jwtDecode } from "jwt-decode";

const verifyToken = <T>(token: string): T => {
  const decoded: T = jwtDecode(token);
  return decoded;
};

export default verifyToken;
