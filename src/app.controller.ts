import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PublicRoute } from './utils/decorators/public.route.decorator';
import { LocalAuthGuard } from './utils/guards/local.auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @PublicRoute()
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @Get('protected')
  protected(@Request() req): any {
    return req.user;
  }
}
