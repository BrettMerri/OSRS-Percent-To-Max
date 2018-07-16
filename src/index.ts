import * as readline from 'readline';

import { fetchHighscores } from "./fetchHighscores";
import { SkillData } from './skillEntity';

const askForRsn = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>(resolve => rl.question('OSRS RSN? ', ans => {
    rl.close();
    resolve(ans);
  }));
}

const app = async () => {
  const maxSkillXp = 13034431;
  const numSkills = 23;
  const maxXp = numSkills * maxSkillXp;

  while (true) {
    const rsn = await askForRsn();
    const parseResult = await fetchHighscores(rsn);

    console.log(); // Create extra space
    
    if (!parseResult || parseResult.errors.length > 0) {
      console.log('Invalid RSN')
      continue;
    }

    const skills = <SkillData[]>parseResult.data;

    let xp = 0;
    skills.forEach(skill => {
      if (skill.name === 'Overall') {
        return;
      }
      xp += skill.xp > maxSkillXp ? maxSkillXp : skill.xp
    });
    const percentToMax = `${(xp / maxXp * 100).toPrecision(5)}%`;
    console.log('-------------------------------------------');
    console.log('XP (Not including xp past 99):', xp.toLocaleString());
    console.log('XP needed to max:             ', (maxXp - xp).toLocaleString());
    console.log('Percent to max:               ', percentToMax);
    console.log('-------------------------------------------');
  }
}

app();

