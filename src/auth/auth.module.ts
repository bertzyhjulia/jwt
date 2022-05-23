import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LogInWithCredentialsGuard } from './guards/LogInWithCredentialsGuard.guarg';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      session: true
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: '10000s'}
      })
    })
  ],
  providers: [AuthService,  JwtStrategy, JwtAuthGuard, LogInWithCredentialsGuard],
  exports: [AuthService]
})
export class AuthModule {}
