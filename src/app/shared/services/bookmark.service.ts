import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { BookMark, BookmarkEntity } from '../models';

export class BookmarkService extends TypeOrmCrudService<BookMark> {
  constructor(
    @InjectRepository(BookmarkEntity) public readonly bookmarkRepo: Repository<BookMark>,
  ) {
    super(bookmarkRepo);
  }
}
