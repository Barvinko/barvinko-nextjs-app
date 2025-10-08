import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function webpack(config) {
  config.resolve.alias['@components'] = join(__dirname, 'src/components');
  config.resolve.alias['@pages'] = join(__dirname, 'src/pages');
  config.resolve.alias['@style'] = join(__dirname, 'src/style');
  config.resolve.alias['@store'] = join(__dirname, 'src/store');
  config.resolve.alias['@utilities'] = join(__dirname, 'src/utilities');
  config.resolve.alias['@/src/types'] = join(__dirname, 'src/types');
  return config;
}

export const sassOptions = {
  includePaths: [join(__dirname, 'styles')],
  additionalData: ``, // e.g., `@import "src/style/value.scss";`
};
