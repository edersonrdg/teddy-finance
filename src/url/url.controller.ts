import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  UseGuards,
  Patch,
  Param,
  Req,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { CreateUrlUseCase } from './usecases/create-url.usecase';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetAllUrlsUseCase } from './usecases/get-all-urls.usecase';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UpdateUrlUseCase } from './usecases/update-url.usecase';
import { DeleteUrlUseCase } from './usecases/delete-url.usecase';
import { Public } from '../auth/public.metadata';

@Controller('url')
export class UrlController {
  @Inject()
  private createUrlUseCase: CreateUrlUseCase;

  @Inject()
  private getAllUrlsUseCase: GetAllUrlsUseCase;

  @Inject()
  private updateUrlUseCase: UpdateUrlUseCase;

  @Inject()
  private deleteUrlUseCase: DeleteUrlUseCase;

  @Public()
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() { user }, @Body() createUrlDto: CreateUrlDto) {
    return this.createUrlUseCase.execute(user?.sub, createUrlDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() { user }) {
    return this.getAllUrlsUseCase.execute(user?.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Req() { user },
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto,
  ) {
    return this.updateUrlUseCase.execute(id, updateUrlDto, user?.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/delete')
  remove(@Req() { user }, @Param('id') id: string) {
    return this.deleteUrlUseCase.execute(id, user?.sub);
  }
}
