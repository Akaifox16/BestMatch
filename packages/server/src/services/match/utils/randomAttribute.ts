import type { ProfileAttributes } from '../../../utils/type';

export function randomAttibute(): [ProfileAttributes, ProfileAttributes] {
  const attribute_selector = (Math.random() * 100) % 3;
  switch (attribute_selector) {
    case 0:
      return ['messiness', 'loudness'];
    case 1:
      return ['messiness', 'do_not_disturb'];
    case 2:
      return ['loudness', 'do_not_disturb'];
    default:
      throw new Error("shouldn't been here");
  }
}
