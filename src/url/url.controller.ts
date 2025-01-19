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
import { AuthGuard } from '../auth/auth.guard';
import { GetAllUrlsUseCase } from './usecases/get-all-urls.usecase';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UpdateUrlUseCase } from './usecases/update-url.usecase';
import { DeleteUrlUseCase } from './usecases/delete-url.usecase';
import { Public } from '../auth/public.metadata';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
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

  @ApiResponse({
    status: 200,
    description: 'Url created successfully',
    example: {
      link: 'http://localhost:3000/aaabbb',
    },
  })
  @Public()
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() { user }, @Body() createUrlDto: CreateUrlDto) {
    return this.createUrlUseCase.execute(user?.sub, createUrlDto);
  }

  @ApiResponse({
    status: 200,
    example: [
      {
        id: '1234',
        original_url: 'https://google.com',
        shortened_url: 'aaabbb',
        access_count: 0,
        owner_id: '1234',
        deleted_at: null,
        created_at: '2000-01-01T18:45:28.263Z',
        updated_at: '2000-01-01T18:45:28.263Z',
        fullUrl: 'http://localhost:3000/aaabbb',
      },
    ],
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() { user }) {
    return this.getAllUrlsUseCase.execute(user?.sub);
  }

  @ApiResponse({
    status: 200,
    description: 'Url updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Url already exists!',
    example: {
      message: 'Url already exists!',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Url does not belong to you!',
    example: {
      message: 'Url does not belong to you!',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Url does not exist!',
    example: {
      message: 'Url does not exist!',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Req() { user },
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto,
  ) {
    return this.updateUrlUseCase.execute(id, updateUrlDto, user?.sub);
  }

  @ApiResponse({
    status: 200,
    description: 'Url deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Url does not belong to you!',
    example: {
      message: 'Url does not belong to you!',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Url does not exist!',
    example: {
      message: 'Url does not exist!',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @UseGuards(AuthGuard)
  @Patch(':id/delete')
  remove(@Req() { user }, @Param('id') id: string) {
    return this.deleteUrlUseCase.execute(id, user?.sub);
  }
}
