import React, { Suspense } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as VscIcons from 'react-icons/vsc';
import * as FcIcons from 'react-icons/fc';

const IconFromDatabase = ({ set, name }) => {
  let Icon;

  switch (set) {
    case 'ai':
        Icon = AiIcons[name];
        return <Icon />;
    case 'bs': 
      Icon = BsIcons[name];
      return <Icon />;
      case 'fa':
        Icon = FaIcons[name];
        return <Icon />;
      case 'gi':
        Icon = GiIcons[name];
        return <Icon />;
      case 'im':
        Icon = ImIcons[name];
        return <Icon />;
    case 'ri':
      Icon = RiIcons[name];
      return <Icon />;
      case 'si':
        Icon = SiIcons[name];
      return <Icon />;
    case 'vsc':
      Icon = VscIcons[name];
      return <Icon />;
    case 'fc':
      Icon = FcIcons[name];
      return <Icon />
    default:
      break;
  }
};

export const DynamicIcon = ({ name, set }) => {
  return <IconFromDatabase set={set} name={name} />;
};
