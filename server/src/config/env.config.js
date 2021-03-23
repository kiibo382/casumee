export default {
  port: 3600,
  appEndpoint: "http://localhost:3000",
  apiEndpoint: "http://localhost:8080",
  jwt_secret: "sample",
  jwt_expiration_in_seconds: 36000,
  environment: "dev",
  permissionLevels: {
    NORMAL_USER: 1,
    PAID_USER: 4,
    ADMIN: 2048,
  },
};
