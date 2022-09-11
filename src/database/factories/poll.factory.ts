import { setSeederFactory } from 'typeorm-extension';
import { Poll } from '../../entities/poll.entity';

export default setSeederFactory(Poll, (faker) => {
  const model = new Poll();
  model.title = faker.random.words(10);
  model.expireAt = faker.date.soon(10);
  return model;
});
