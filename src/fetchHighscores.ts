import * as Papa from 'papaparse';
import fetch from 'node-fetch';

import { Skill } from './skillEntity';

const skillNames = [
  Skill.Overall,
  Skill.Attack,
  Skill.Defence,
  Skill.Strength,
  Skill.Hitpoints,
  Skill.Ranged,
  Skill.Prayer,
  Skill.Magic,
  Skill.Cooking,
  Skill.Woodcutting,
  Skill.Fletching,
  Skill.Fishing,
  Skill.Firemaking,
  Skill.Crafting,
  Skill.Smithing,
  Skill.Mining,
  Skill.Herblore,
  Skill.Agility,
  Skill.Thieving,
  Skill.Slayer,
  Skill.Farming,
  Skill.Runecraft,
  Skill.Hunter,
  Skill.Construction,
];
const csvHeader = 'name,rank,level,xp';

const transform = (value: string, column: string) => column === 'name' ? value : Number(value);

export const fetchHighscores = async (playerName: string) => {
  try {
    const res = await fetch(`http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${encodeURIComponent(playerName)}`);
    if (!res.ok) {
      return null;
    }
    const resText = await res.text();
    const skillsData = resText.split('\n', 24);
    const skillsDataWithNames = skillsData.map((skillData, index) => `${skillNames[index]},${skillData}`);
    const skillsDataWithNamesAndHeader = [csvHeader, ...skillsDataWithNames];
    const skillsDataWithNamesAndHeaderString = skillsDataWithNamesAndHeader.join('\n');
    // @ts-ignore - papaparse has muffed up types
    const parseResult = Papa.parse(skillsDataWithNamesAndHeaderString, { header: true , transform });
    return parseResult;
  } catch(error) {
    return null;
  }
};
