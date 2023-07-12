let { server, dbConfig } = require("../../server");

const request = require("supertest");

describe("users/ enpoint", () => {
  afterEach(async () => {
    server.close();
    await dbConfig.User.destroy({ where: {} });
  });

  describe("GET/ (getting all users)", () => {
    it("should return all users", async () => {
      await dbConfig.User.bulkCreate([
        {
          name: "johnhj",
          email: "John@gmail.com",
          password: "pass1234",
          address: "Bavla Ahmedabad",
        },
        {
          name: "jammie",
          email: "jammie@gmail.com",
          password: "pass1234",
          address: "Bavla Ahmedabad",
        },
      ]);

      const response = await request(server).get("/users");
      expect(response.status).toBe(200);
      expect(response._body.Users.length).toBe(2);
      expect(
        response._body.Users.some((user) => user.name == "jammie")
      ).toBeTruthy();
    });
  });

  describe("GET/:id (getting one user)", () => {
    it("should return one users if the id is valid", async () => {
      const user = await dbConfig.User.create({
        name: "johnhj",
        email: "John@gmail.com",
        password: "pass1234",
        address: "Bavla Ahmedabad",
      });
      const response = await request(server).get(
        `/users/${user.dataValues.id}`
      );
      const data = JSON.parse(response.text);
      expect(response.status).toBe(200);
      expect(data.User[0].id).toBe(user.dataValues.id);
    });

    it("should return 404 if no user found with that id", async () => {
      const response = await request(server).get(`/users/1`);
      expect(response.status).toBe(404);
    });
  });

  describe("POST/ (for creating an user)", () => {
    it("should create an user if all fields are defined correctly", async () => {
      const response = await request(server).post("/users").send({
        name: "johnhj",
        email: "John@gmail.com",
        password: "pass1234",
        address: "john@email.com",
      });
      expect(response.status).toBe(201);
      expect(response._body.User.name).toBe("johnhj");
    });

    it("should failed the test if all fields are not defined correctly", async () => {
      const response = await request(server).post("/users").send({
        name: "johnhj",
        password: "pass1234",
        address: "john@email.com",
      });
      expect(response.status).toBe(400);
      expect(response._body.message).toMatch(/null/);
    });
  });

  describe("DELETE/:id (for deleting an user)", () => {
    it("should delete an user based on valid id", async () => {
      const user = await dbConfig.User.create({
        name: "johnhj",
        email: "John@gmail.com",
        password: "pass1234",
        address: "Bavla Ahmedabad",
      });
      const response = await request(server).delete(
        `/users/${user.dataValues.id}`
      );
      expect(response.status).toBe(204);
      // expect(response._body.User.name).toBe("johnhj");
    });

    it("should failed the test if the id is invalid", async () => {
      const response = await request(server).delete("/users/1");
      expect(response.status).toBe(404);
    });
  });

  describe("PATCH/:id (for updating an user)", () => {
    it("should update an user based on valid id", async () => {
      const user = await dbConfig.User.create({
        name: "johnhj",
        email: "John@gmail.com",
        password: "pass1234",
        address: "Bavla Ahmedabad",
      });
      const response = await request(server)
        .patch(`/users/${user.dataValues.id}`)
        .send({ name: "harshit" });
      expect(response.status).toBe(200);
      expect(JSON.parse(response.text).message).toMatch(/successfully/);
    });

    it("should failed the test if the id is invalid", async () => {
      const response = await request(server).delete("/users/1");
      expect(response.status).toBe(404);
      expect(JSON.parse(response.text).status).toMatch(/fail/);
    });
  });
});
