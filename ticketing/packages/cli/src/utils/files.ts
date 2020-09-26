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
        type: 'confirm',
        name: 'overwrite',
        message: 'The package already exists, overwrite?',
      },
    ]);

    if (overwrite) {
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

  const templateDir = path.join(__dirname, '../templates');
  const context = { name };
  await copy(templateDir, packageFolderPath, context);
  cli.info('bootstrapping');
  await execa('npx', ['lerna', 'bootstrap']);
  cli.action.stop('√');

  await copyKubernetesFiles(templateDir, name, context);

  cli.info('new package created', packageFolderPath);
}

async function copyKubernetesFiles(
  templatesDir: string,
  name: string,
  context: object
) {
  cli.info('adding k8s depl file...');

  const kubernetsFolder = path.join(__dirname, '../../../../infra/k8s');
  const deplFile = path.join(kubernetsFolder, path.sep, `${name}-depl.yaml`);
  const deplOutput = await getTemplateResult(
    path.join(templatesDir, path.sep, 'k8s-templates', 'name-depl.yaml'),
    context
  );
  await writeFile(deplFile, deplOutput);

  const { addMongoDepl } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'addMongoDepl',
      message: 'Add k8s mongo service?',
    },
  ]);
  if (!addMongoDepl) {
    return;
  }
  cli.info('adding k8s mongodb depl file...');
  const mongoDeplFile = path.join(
    kubernetsFolder,
    path.sep,
    `${name}-mongo-depl.yaml`
  );
  const mongoDeplOutput = await getTemplateResult(
    path.join(templatesDir, path.sep, 'k8s-templates', 'name-mongo-depl.yaml'),
    context
  );
  await writeFile(mongoDeplFile, mongoDeplOutput);
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
      const output = await getTemplateResult(file, context);
      const fileOutPath = path.join(destDir, ...getPathTokens(file));
      await mkdir(path.dirname(fileOutPath), { recursive: true });
      await writeFile(fileOutPath, output);
    }
  });
}

async function getTemplateResult(file: string, context: object) {
  const readFileResult = await readFile(file);
  const template = Handlebars.compile(readFileResult.toString());
  const output = template(context);
  return output;
}

function getPathTokens(file: string) {
  const pathTokens = file.split(path.sep);
  const templateDirIndex = pathTokens.findIndex(
    (path) => path === 'api-template'
  );
  const destPathTokens = pathTokens.slice(templateDirIndex + 1);
  return destPathTokens;
}
