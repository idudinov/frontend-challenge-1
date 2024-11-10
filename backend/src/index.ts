import 'module-alias/register.js';
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveEndpoint } from "./utils/endpoint.js";
import { Api } from "@mano/common/api/index.js";
import { uploadClaim } from "./controllers/claims.js";
import { listMrfFileIds } from "./controllers/mrfs.js";
import { getAuthState, login, logout } from "./controllers/auth.js";

const app = new Hono();

app.use(cors());

serveEndpoint(app, Api.UploadClaims, uploadClaim);
serveEndpoint(app, Api.ListMRFs, listMrfFileIds);

serveEndpoint(app, Api.GetAuthState, getAuthState);
serveEndpoint(app, Api.Login, login);
serveEndpoint(app, Api.Logout, logout);

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
