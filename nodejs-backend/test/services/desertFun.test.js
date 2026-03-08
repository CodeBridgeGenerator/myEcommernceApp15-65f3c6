const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("desertFun service", async () => {
  let thisService;
  let desertFunCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("desertFun");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (desertFun)");
  });

  describe("#create", () => {
    const options = {"name":"new value"};

    beforeEach(async () => {
      desertFunCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new desertFun", () => {
      assert.strictEqual(desertFunCreated.name, options.name);
    });
  });

  describe("#get", () => {
    it("should retrieve a desertFun by ID", async () => {
      const retrieved = await thisService.Model.findById(desertFunCreated._id);
      assert.strictEqual(retrieved._id.toString(), desertFunCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value"};

    it("should update an existing desertFun ", async () => {
      const desertFunUpdated = await thisService.Model.findByIdAndUpdate(
        desertFunCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(desertFunUpdated.name, options.name);
    });
  });

  describe("#delete", async () => {
    it("should delete a desertFun", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const desertFunDeleted = await thisService.Model.findByIdAndDelete(desertFunCreated._id);
      assert.strictEqual(desertFunDeleted._id.toString(), desertFunCreated._id.toString());
    });
  });
});