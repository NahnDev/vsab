import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { ActiveJwtGuard } from './guards/active-jwt.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

class ApiResponseWithToken {
  @ApiProperty()
  user: User;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  expires: number;
}

@ApiTags('auth')
@PublicApi()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBasicAuth()
  @ApiOkResponse({ type: ApiResponseWithToken })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { email: { type: 'string' }, password: { type: 'string' } },
    },
  })
  @Post('login')
  async login(@RequestUser() user: User) {
    return { user, ...(await this.authService.generateTokenForUser(user)) };
  }

  @ApiOkResponse({ type: ApiResponseWithToken })
  @Get('access-tokens')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    const user = await this.authService.verifyRefreshToken(refreshToken);
    if (!user) throw new UnauthorizedException();
    return { user, ...(await this.authService.generateTokenForUser(user)) };
  }

  @ApiOkResponse({ type: ApiResponseWithToken })
  @UseGuards(GoogleAuthGuard)
  @Get('google-login')
  async googleLogin(@RequestUser() user: User) {
    return { user, ...(await this.authService.generateTokenForUser(user)) };
  }

  @ApiOkResponse()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return { user, ...(await this.authService.generateTokenForUser(user)) };
  }

  @ApiOkResponse()
  @UseGuards(ActiveJwtGuard)
  @Get('active')
  async activeAccount(@RequestUser() user: User) {
    await this.authService.activeAccount(user.email);
  }

  @ApiOkResponse()
  @Get('resend-active-mail/:email')
  async resendActiveEmail(@Param('email') email: string) {
    await this.authService.resendActiveEmail(email);
  }
}
