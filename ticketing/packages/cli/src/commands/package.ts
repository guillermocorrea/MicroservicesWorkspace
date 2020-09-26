import { Command, flags } from '@oclif/command';
import { createPackage } from '../utils/files';

export default class Package extends Command {
  static description = 'create a new package';

  static examples = [`$ tinis-cli package my-package`];

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [{ name: 'name' }];

  async run() {
    const { args } = this.parse(Package);

    if (!args.name) {
      this.error(`provide a name`);
    }

    createPackage(args.name);
  }
}
