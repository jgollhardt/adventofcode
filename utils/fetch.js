import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '../.env' });

const fetchInput = async () => {
  if (!fs.existsSync('input.txt')) {
    const day = path.basename(process.cwd()).replace('day', '');
    const res = await fetch(`https://adventofcode.com/2020/day/${day}/input`, { headers: { cookie: `session=${process.env.SESSION_ID}` } });
    const fileStream = fs.createWriteStream("input.txt");
    await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
    console.log('Saved input to input.txt')
  }
}

export { fetchInput }
