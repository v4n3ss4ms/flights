import { Subscriber } from '../domain/subscriber.ts';
import { FAKE_SUBSCRIBERS_LIST } from './fake-data/fake-data.ts';

export class GetSubscribersQry {
  constructor() {
  }

  execute(): Promise<Subscriber[]> {
    return new Promise((resolve, reject) => {
      resolve(FAKE_SUBSCRIBERS_LIST);
    });
  }
}
