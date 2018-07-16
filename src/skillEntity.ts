export interface SkillData {
  name: string;
  rank: number;
  level: number;
  xp: number;
}

export enum Skill {
  Overall = 'Overall',
  Attack = 'Attack',
  Defence = 'Defence',
  Strength = 'Strength',
  Hitpoints = 'Hitpoints',
  Ranged = 'Ranged',
  Prayer = 'Prayer',
  Magic = 'Magic',
  Cooking = 'Cooking',
  Woodcutting = 'Woodcutting',
  Fletching = 'Fletching',
  Fishing = 'Fishing',
  Firemaking = 'Firemaking',
  Crafting = 'Crafting',
  Smithing = 'Smithing',
  Mining = 'Mining',
  Herblore = 'Herblore',
  Agility = 'Agility',
  Thieving = 'Thieving',
  Slayer = 'Slayer',
  Farming = 'Farming',
  Runecraft = 'Runecraft',
  Hunter = 'Hunter',
  Construction = 'Construction',
}
