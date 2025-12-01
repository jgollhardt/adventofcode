import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';

dotenv.config({ path: '../../.env' });

const fetchInput = async () => {
  if (!fs.existsSync('input.txt')) {
    let [year, day] = process.cwd().split('/').slice(-2);
    day = day.replace(/day0?/, '');
    const res = await fetch(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: { cookie: `session=${process.env.SESSION_ID}` },
      }
    );
    const fileStream = fs.createWriteStream('input.txt');
    await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on('error', reject);
      fileStream.on('finish', resolve);
    });
    console.log('Saved input to input.txt');
  }
};

export { fetchInput };
