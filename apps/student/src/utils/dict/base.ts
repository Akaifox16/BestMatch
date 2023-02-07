export type Dict = 'th';
export type ActionKey = 'variant' | 'matchOptions';

// Variant
export type VariantGroup = 'auth' | 'match';

export type AppVariant = 'profile' | 'matePref' | 'roomPref' | 'summary';
export type MatchVariant = Omit<AppVariant, 'summary'>;
export type PageVariant = Extract<AppVariant, 'profile' | 'summary'>;

// Match Options
export type OptionsVariant = 'self' | 'roommate';

type RoomMateMatchOptions = 'messiness' | 'noise' | 'do-not-disturb';
type RoomMatchOptions = 'zone' | 'floor';
type DormMatchOptinos = 'rent' | 'resident';

export type MatchOptions =
  | RoomMatchOptions
  | RoomMateMatchOptions
  | DormMatchOptinos;

// Dictionary
// export type Dictionary = {
//   []
// }
