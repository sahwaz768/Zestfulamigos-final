export const SkinToneData = ['Fair', 'Medium', 'Dark'];

export const GenderData = ['MALE', 'FEMALE', 'OTHER'];

export const descriptionData = [
  'CASUAL_COMPANIONSHIP',
  'COFFEEANDCONVERSATIONS',
  'MOVIES',
  'CITY_TOURS',
  'DINING_PARTNER',
  'ADVANTURE_COMPANIONSHIP',
  'HIKING_BUDDY',
  'BEACHANDWATER_SPORTS',
  'CAMPING_TRIPS',
  'ROAD_TRIPS',
  'SOCIAL_COMPANIONSHIP',
  'EVENT_PLUSONE',
  'PARTY_PARTNER',
  'BUSSINESS_NETWORKING',
  'CULTURAL_OUTINGS',
  'LIFESTYLE_COMPANIONSHIP',
  'FITNESS_PARTNER',
  'SHOPPING_BUDDY',
  'COOKING_COMPANION',
  'LANGUAGE_EXCHANGE',
  'PERSONALIZED_EXPERIENCE',
  'TRAVEL_BUDDY',
  'PET_LOVER_COMPANION',
  'UNIQUE_REQUESTS'
];

export const FemalebodytypeData = [
  'RECTANGLE',
  'TRIANGLE',
  'SPOON',
  'HOURGLASS',
  'TOPHOURGLASS'
];

export const MalebodytypeData = ['ATHLETIC', 'MUSCULAR', 'SLIM'];

export const skinToneData = ['FAIR', 'DARK', 'BROWN'];

export const eatingHabitsData = [
  'VEG',
  'NONVEG',
  'JAIN',
  'EGGETERIAN',
  'VEGAN'
];

export const smokingHabitsData = [
  'PASSIVE_SMOKER',
  'ACTIVE_SMOKER',
  'NON_SMOKER',
  'OCCASIONALLY'
];

export const drinkingHabitsData = [
  'DAILY_DRINKER',
  'NON_DRINKER',
  'OCCASIONALLY'
];

export const getBodyTypes = (gender) => {
  switch (gender) {
    case 'MALE':
      return MalebodytypeData;
    case 'FEMALE':
      return FemalebodytypeData;
    case 'OTHER':
      return [...MalebodytypeData, ...FemalebodytypeData];
    default:
      return [];
  }
};
