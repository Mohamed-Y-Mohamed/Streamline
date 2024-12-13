import request from "supertest";
import app from "../src/index"; // Ensure your Express app is exported

describe("Projects API", () => {
  it("GET /projects should return a 200 status", async () => {
    const response = await request(app).get("/projects");
    expect(response.status).toBe(200);
  });

  it("POST /projects should create a new project", async () => {
    const newProject = {
      name: "Test Project",
      description: "Test Description",
    };
    const response = await request(app)
      .post("/projects")
      .send(newProject);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
