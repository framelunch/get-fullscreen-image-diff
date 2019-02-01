import resemble, { ResembleComparisonResult } from 'resemblejs';
import fs from 'fs-extra';

async function getImageDiff(before: string, after: string): Promise<ResembleComparisonResult> {
  return new Promise((resolve, reject) => {
    try {
      resemble(before)
        .compareTo(after)
        .ignoreColors()
        .onComplete(result => resolve(result));
    } catch (e) {
      reject(e);
    }
  });
}

export async function imageDiff(source: string, compare: string, output: string) {
  const data = await getImageDiff(source, compare);
  fs.writeFileSync(
    `${output}.png`,
    (data as any) // 型情報が古い
      .getBuffer(),
  );

  fs.writeFileSync(`${output}.json`, JSON.stringify(data));
}
