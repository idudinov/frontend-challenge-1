import type { Context } from "hono";
import { createUser } from "../services/auth/index.js";
import { UserIdHeaderKey } from "@mano/common/models/user.js";

export async function getAuthState(_: unknown, ctx: Context) {
  const userId = ctx.req.header(UserIdHeaderKey);
  return userId ? { userId } : null;
}

export async function login(_: unknown, ctx: Context) {
  const user = await createUser();
  return user;
}

export async function logout(_: unknown, ctx: Context) {
  return null;
}
