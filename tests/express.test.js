const request = require("supertest");
const app = require("./app");

const server = app.listen(5555, () => {
  
});

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the index path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/index")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the gmessage path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/gmessage")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the login path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/login")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the register path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/register")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
server.close();