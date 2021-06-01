import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { Request } from 'express';

import { JwtAuthGuard } from '../../../auth/guards';
import { CurrentUser } from '../../../shared/decorators';
import { ImageService } from '../../../shared/services';
import { uuid } from '../../../shared/types';
import { User } from '../../../user/models';
import { CreatePostDTO, Post as PostModel, PostEntity, UpdatePostDTO } from '../../models';
import { PostService } from '../../services/post/post.service';

@Crud({
  model: {
    type: PostEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      image: {
        eager: false,
      },
      author: {
        eager: false,
      },
      'author.avatar': {
        eager: false,
      },
      comments: {
        eager: false,
      },
      'comments.author': {
        eager: false,
        // alias refers to DB column aliasing when quering
        alias: 'commentAuthor',
      },
      'comments.author.avatar': {
        eager: false,
        alias: 'commentAuthorAvatar',
      },
      bookmarkedBy: {
        eager: false,
      },
      'bookmarkedBy.user': {
        eager: false,
      },
    },
  },
  validation: {
    whitelist: true,
  },
  dto: {
    create: CreatePostDTO,
  },
})
@CrudAuth({
  persist: (req: Request) => {
    const method = req.method.toLocaleLowerCase();
    const post: Partial<PostModel> = {
      modifiedBy: req.user['id'],
    };
    if (['post'].includes(method)) {
      post.author = req.user as User;
      post.createdBy = req.user['id'];
    }
    return post;
  },
})
@UseGuards(JwtAuthGuard)
@ApiTags('posts')
@Controller('posts')
export class PostController implements CrudController<PostModel> {
  constructor(public readonly service: PostService, private readonly imageService: ImageService) {}

  @Override()
  @UseInterceptors(FileInterceptor('coverImage'))
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) dto: CreatePostDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const image = await this.imageService.createAndSave(file);
    return this.service.createOne(req, { ...dto, image });
  }

  @Override()
  @UseInterceptors(FileInterceptor('coverImage'))
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @Param('id') postId: uuid,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) dto: UpdatePostDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const post = await this.service.findOne(postId, { relations: ['image'] });
    let image;
    if (dto.deleteCoverImg || file) {
      image = await this.imageService.updateAndSave(post.image?.id, file, dto.deleteCoverImg);
    }
    return this.service.updateOne(req, { ...dto, image });
  }

  @Patch(':id/react')
  async toggleReaction(
    @Param('id', ParseUUIDPipe) postId: uuid,
    @CurrentUser() user: User,
  ): Promise<Pick<PostModel, 'votes'>> {
    return this.service.toggleVote(postId, user);
  }

  @Post(':id/bookmark')
  async bookmarkPost(@Param('id', ParseUUIDPipe) postId: uuid, @CurrentUser() user: User) {
    return this.service.toggleBookmark(postId, user);
  }
}
