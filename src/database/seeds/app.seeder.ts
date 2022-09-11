import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Poll } from '../../entities/poll.entity';
import { Option } from '../../entities/option.entity';
import { randomInt } from 'crypto';

export default class AppSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await this.truncateAllTables(dataSource);

    const userFactory = await factoryManager.get(User);
    const pollFactory = await factoryManager.get(Poll);
    const optionFactory = await factoryManager.get(Option);

    const defaultUser = await userFactory.make({ username: 'sabbar' });

    await userFactory.save(defaultUser);

    await userFactory.saveMany(5);

    await pollFactory.saveMany(40, { userId: randomInt(1, 6) });

    for (const id of [...Array(40).keys()]) {
      await optionFactory.save({ pollId: id + 1 });
      await optionFactory.save({ pollId: id + 1 });
      await optionFactory.save({ pollId: id + 1 });
      await optionFactory.save({ pollId: id + 1 });
      await optionFactory.save({ pollId: id + 1 });
    }
  }

  async truncateAllTables(dataSource: DataSource) {
    await dataSource.query('SET foreign_key_checks = 0');
    await dataSource.query('TRUNCATE vote');
    await dataSource.query('TRUNCATE `option`');
    await dataSource.query('TRUNCATE poll');
    await dataSource.query('TRUNCATE user');
  }
}
