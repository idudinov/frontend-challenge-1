import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveEndpoint } from "./utils/endpoint.js";
import { Api } from "@mano/common/api";
import { uploadClaim } from "./controllers/claims.js";
import { listMrfFileIds } from "./controllers/mrfs.js";

const app = new Hono();

app.use(cors());

serveEndpoint(app, Api.UploadClaims, uploadClaim);
serveEndpoint(app, Api.ListMRFs, listMrfFileIds);

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
