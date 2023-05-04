import { createServer, Model } from "miragejs";

createServer({
  models: {
    user: Model,
  },

  routes() {
    this.get("/api/auth", (schema) => {
      return schema.users.all();
    });

    this.post("/api/auth", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      return schema.users.create(attrs);
    });
  },
});
