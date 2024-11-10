import type { IEndpointInfo } from "@zajno/common/api";
import type { Context, Hono } from "hono";

export function serveEndpoint<T extends IEndpointInfo>(app: Hono, endpoint: T, handler: (input: IEndpointInfo.ExtractIn<T>, ctx: Context) => Promise<IEndpointInfo.ExtractOut<T>>) {

  app.on(
    endpoint.method,
    endpoint.pathBuilder.template(),
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