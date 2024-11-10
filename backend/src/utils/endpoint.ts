import { UserIdHeaderKey } from "@mano/common/models/user.js";
import type { IEndpointInfo } from "@zajno/common/api";
import type { Context, Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export function serveEndpoint<T extends IEndpointInfo>(app: Hono, endpoint: T, handler: (input: IEndpointInfo.ExtractIn<T>, ctx: Context) => Promise<IEndpointInfo.ExtractOut<T>>) {

  const middlewares: ReturnType<typeof createMiddleware>[] = [];

  if (endpoint.isAuthenticated) {
    middlewares.push(simpleAuthMiddleware);
  }

  app.on(
    endpoint.method,
    endpoint.pathBuilder.template(),
    ...middlewares,
    async (ctx) => {
      // Extract input from request to pass it to handler
      // TODO: this is very simple implementation for now
      const input = {
        ...(ctx.req.header('Content-Type') === 'application/json'
          ? await ctx.req.json()
          : {}
        ),
        ...ctx.req.param(),
      } as IEndpointInfo.ExtractIn<T>;
      const output = await handler(input, ctx);
      return ctx.json(output as object); // TS gets mad
    },
  );

  return app;
}

const simpleAuthMiddleware = createMiddleware((ctx, next) => {
  if (!ctx.req.header(UserIdHeaderKey)) {
    throw new HTTPException(401);
  }

  return next();
});
