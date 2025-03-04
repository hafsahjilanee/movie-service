import { Module } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OmdbController } from './omdb.controller';


@Module({
  imports: [HttpModule, ConfigModule],  
  providers: [OmdbService],
  controllers: [OmdbController],
  exports: [OmdbService],  
})
export class OmdbModule {}
