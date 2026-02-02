import { Controller, Get, Logger, Req } from "@nestjs/common";
import type { Request } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const hostName = process.env.HOST_MACHINE_NAME ?? "unknown";
    this.logger.log(`${hostName}: GET /`);
    return this.appService.getHello();
  }

  @Get("client-info")
  getClientInfo(@Req() req: Request): string {
    const hostName = process.env.HOST_MACHINE_NAME ?? "unknown";
    this.logger.log(`${hostName}: GET /client-info`);
    const forwardedFor = req.headers["x-forwarded-for"];
    const ip = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(",")[0]?.trim() || req.ip || "unknown";
    const userAgent = req.headers["user-agent"] || "unknown";

    this.logger.log(
      `client-info ip=${ip} ua=${userAgent} via hostname=${hostName}`,
    );
    return `Client info: ip=${ip}, userAgent=${userAgent}`;
  }

  @Get("kill")
  killNest(): string {
    const hostName = process.env.HOST_MACHINE_NAME ?? "unknown";
    this.logger.warn(`${hostName}: GET /kill - shutting down`);
    setTimeout(() => process.exit(1), 100);
    return `${hostName}: NestJS shutting down...`;
  }
}
