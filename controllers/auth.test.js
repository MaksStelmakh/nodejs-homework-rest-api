const authController = require("./auth");
const authService = require("../services/auth.service");

describe("Auth Controller", () => {
  beforeAll(() => {
    console.log("before ALL");
  });
  beforeEach(() => {
    console.log("Before Each");
  });
  describe("New User shold register with email", () => {
    test("New User shold register with email", async () => {
      let next = jest.fn();
      const req = {
        body: {
          email: "email@gmail.com",
          subscription: "User",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };
      authService.registerUser = jest.fn((data) => data);
      await authController.register(req, res, next);
      expect(result.code).toBe(201);
      expect(result.data.name).toBe("email@gmail.com");
      expect(result.data.subscription).toBe("UserSubscription");
      expect(next).toBeCalledTimes(0);
    });
  });
  describe("Login", () => {
    test("User should login whith correct creds", async () => {
      let next = jest.fn();
      const req = {
        body: {
          email: "email@gmail.com",
          subscription: "User",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      };
      authService.loginUser = jest.fn(() => {
        return {
          token: "test-token",
        };
      });
      const result = await authController.login(req, res, next);
      expect(result.code).toBe(200);
      expect(result.token.token).toBe("test-token");
    });
  });
});
