import { listEntrys } from 'when-aws';
import { User } from '../../typings';

const { USER_TABLE } = process.env;

if (!USER_TABLE) {
  throw Error('Missing Environment Variable: USER_TABLE');
}

export const centuriaUsers = (centuria: string): Promise<User[]> =>
  listEntrys<User>({
    TableName: USER_TABLE
  }).then(users =>
    users.filter(({ centuria: userCenturia }) => userCenturia === centuria)
  );
