import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/singup.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { RequestWithUser } from './dto/request.dto';
import {
  ApiBody,
  ApiCookieAuth,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { SignInDto } from './dto/singin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('singup')
  @ApiBody({ schema: { $ref: getSchemaPath(SignUpDto) } })
  async signUp(@Body() signUpDto: SignUpDto): Promise<Omit<User, 'password'>> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: { $ref: getSchemaPath(SignInDto) },
  })
  @Post('singin')
  async signIn(@Req() req, @Res() res: Response) {
    const auth = await this.authService.signIn(req.user);
    res.cookie(
      process.env.ACCESS_TOKEN_COOKIE_NAME,
      auth[process.env.ACCESS_TOKEN_COOKIE_NAME],
      {
        httpOnly: true,
      },
    );
    return res.sendStatus(HttpStatus.OK);
  }

  @ApiCookieAuth(process.env.ACCESS_TOKEN_COOKIE_NAME)
  @Post('logout')
  async signOut(@Res() res: Response) {
    return res
      .clearCookie(process.env.ACCESS_TOKEN_COOKIE_NAME)
      .sendStatus(HttpStatus.OK);
  }

  @ApiCookieAuth(process.env.ACCESS_TOKEN_COOKIE_NAME)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return this.authService.getProfile(req.user);
  }
}
