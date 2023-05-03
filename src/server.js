import { createServer } from "miragejs";

createServer({
  routes() {
    this.get("/api/auth", () => {
      return [];
    });
    this.post("/api/auth", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      attrs.id = Math.floor(Math.random() * 100);
      return { attrs };
    });
  },
});
