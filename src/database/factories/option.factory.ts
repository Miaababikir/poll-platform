import { setSeederFactory } from 'typeorm-extension';
import { Option } from '../../entities/option.entity';

export default setSeederFactory(Option, (faker) => {
  const model = new Option();
  model.title = faker.random.words(3);

  return model;
});
