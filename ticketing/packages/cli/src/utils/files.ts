import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as inquirer from 'inquirer';
import cli from 'cli-ux';
import * as execa from 'execa';

const readFile = util.promisify(fs.readFile);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

async function createPackageFolder(
  name: string,
  overwrite = false
): Promise<string> {
  const folderPath = path.join(__dirname, '../../../', name);
  if (fs.existsSync(folderPath) && !overwrite) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'expand',
        name: 'overwrite',
        message: 'The package already exists, overwrite?',
        choices: [
          {
            key: 'y',
            value: 'yes',
          },
          {
            key: 'n',
            value: 'no',
          },
        ],
      },
    ]);

    if (overwrite === 'yes') {
      return await createPackageFolder(name, true);
    }

    const { newName } = await inquirer.prompt([
      {
        name: 'newName',
        message: 'Enter a new name',
      },
    ]);
    return await createPackageFolder(newName);
  } else {
    await mkdir(folderPath, { recursive: true });
  }
  return folderPath;
}

export async function createPackage(name: string) {
  const packageFolderPath = await createPackageFolder(name);
  cli.action.start(`Scaffolding new package ${name}`);

  const templatePath = path.join(__dirname, '../templates');
  await copy(templatePath, packageFolderPath, { name });
  cli.info('bootstrapping');
  await execa('npx', ['lerna', 'bootstrap']);
  cli.action.stop('√');
  cli.info('new package created', packageFolderPath);
}

export async function copy(
  templateDir: string,
  destDir: string,
  context: object
) {
  const dirItems = await readdir(templateDir);
  if (!dirItems.length) {
    return;
  }
  dirItems.forEach(async (file) => {
    file = path.resolve(templateDir, file);
    const statResult = await stat(file);
    if (!stat) {
      return;
    }
    if (statResult.isDirectory()) {
      const pathTokens = getPathTokens(file);
      await mkdir(path.join(destDir, ...pathTokens), { recursive: true });
      await copy(file, destDir, context);
    } else {
      const readFileResult = await readFile(file);
      const template = Handlebars.compile(readFileResult.toString());
      const output = template(context);
      const fileOutPath = path.join(destDir, ...getPathTokens(file));
      await mkdir(path.dirname(fileOutPath), { recursive: true });
      await writeFile(fileOutPath, output);
    }
  });
}

function getPathTokens(file: string) {
  const pathTokens = file.split(path.sep);
  const templateDirIndex = pathTokens.findIndex((path) => path === 'templates');
  const destPathTokens = pathTokens.slice(templateDirIndex + 1);
  return destPathTokens;
}
