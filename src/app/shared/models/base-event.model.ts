export class BaseEvent<T = Record<string, any>> {
  type: string;
  data: Partial<T>;

  constructor(data?: Partial<T>) {
    this.data = {
      ...data,
    };
  }
}
