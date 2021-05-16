import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseEvent } from '../models';
import { EventService } from '../services';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Sse('sse')
  handleEvents(): Observable<BaseEvent> {
    return this.eventService.serverSentEvent.asObservable();
  }
}
