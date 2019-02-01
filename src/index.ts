import Dotenv from 'dotenv';

import { getFullscreenCapture } from './getFullscreenCapture';
import { imageDiff } from './imageDiff';

Dotenv.load();

async function createCaptures(fileinfo: Array<{ filename: string; url: string }>) {
  await Promise.all(
    fileinfo.map(({ filename, url }) =>
      getFullscreenCapture({
        url,
        filename,
        width: 1200,
        height: 800,
      }),
    ),
  );
}

async function main() {
  const currentFilename = `${process.env.IMAGE_PATH}/${process.env.CURRENT_IMAGE}`;
  const currentUrl = process.env.CURRENT_URL || '';
  const targetFilename = `${process.env.IMAGE_PATH}/${process.env.TARGET_IMAGE}`;
  const targetUrl = process.env.TARGET_URL || '';
  const output = `${process.env.IMAGE_PATH}/${process.env.RESULT_KEY}`;

  await createCaptures([{ filename: currentFilename, url: currentUrl }, { filename: targetFilename, url: targetUrl }]);
  await imageDiff(currentFilename, targetFilename, output);
}

main()
  .then(() => console.log('end'))
  .catch(e => console.error(e));
