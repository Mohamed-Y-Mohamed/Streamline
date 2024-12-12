import { createProject } from "../src/controllers/projectController";

describe("createProject function", () => {
  it("should create a project and return the new project object", async () => {
    const mockReq = {
      body: { name: "Test Project", description: "Test Desc" }
    } as any; // Mock request object
    
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any; // Mock response object

    await createProject(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Test Project" })
    );
  });
});
