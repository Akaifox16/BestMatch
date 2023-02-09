import type { ProfileOwner, AttrName } from '@component/ProfileCard/index.type';

const attrName: Record<ProfileOwner, AttrName> = {
  self: {
    messiness: 'การรักษาความสะอาดของคุณ',
    noise: 'เสียงรบกวนที่คุณสร้าง',
    time: 'ช่วงเวลาที่ไม่ใช้เสียง',
  },
  mate: {
    messiness: 'การรักษาความสะอาดของรูมเมท',
    noise: 'เสืยงรบกวนที่คุณทนไหว',
    time: 'ช่วงเวลาที่ไม่อยากให้ใช้เสียง',
  },
} as const;

export {};
