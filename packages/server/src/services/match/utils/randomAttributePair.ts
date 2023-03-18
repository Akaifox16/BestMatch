import type { Attribute } from '../match.dto';

export default function randomAttributePair(): [Attribute, Attribute] {
  const prob = Math.floor(Math.random() * 3);

  switch (prob) {
    case 0:
      return ['messiness', 'loudness'];
    case 1:
      return ['messiness', 'do_not_disturb'];
    case 2:
      return ['loudness', 'do_not_disturb'];
    default:
      throw new Error('random function bug in randomAttributePair');
  }
}
