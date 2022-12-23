export const enum ENotionObject {
  database = 'database',
  block = 'block',
  page = 'page',
  comment = 'comment',
  user = 'user',
}

export const enum ENotionBlockType {
  paragraph = 'paragraph',
  bulletedListItem = 'bulleted_list_item',
  numberedListItem = 'numbered_list_item',
  toggle = 'toggle',
  toDo = 'to_do',
  quote = 'quote',
  callout = 'callout',
  syncedBlock = 'synced_block',
  template = 'template',
  column = 'column',
  childPage = 'child_page',
  childDatabase = 'child_database',
  table = 'table',
  heading1 = 'heading_1',
  heading2 = 'heading_2',
  heading3 = 'heading_3',
  image = 'image',
  code = 'code',
  divider = 'divider',
  video = 'video',
}

export interface NotionBlock {
  [x: string]: {};
  object: ENotionObject;
  id: string;
  parent: {
    type: string; // always page_id
    page_id: string;
  };
  created_time: Date;
  last_edited_time: Date;
  created_by: {
    object: string; // always user
    id: string;
  };
  last_edited_by: {
    object: string; // always user
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  type: ENotionBlockType;
}

export declare type AnnotationResponse = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color:
    | 'default'
    | 'gray'
    | 'brown'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'red'
    | 'gray_background'
    | 'brown_background'
    | 'orange_background'
    | 'yellow_background'
    | 'green_background'
    | 'blue_background'
    | 'purple_background'
    | 'pink_background'
    | 'red_background';
};

export const EColor = {
  default: '#37352F',
  gray: '#9B9A97',
  brown: '#64473A',
  orange: '#D9730D',
  yellow: '#DFAB01',
  green: '#0F7B6C',
  blue: '#0B6E99',
  purple: '#6940A5',
  pink: '#AD1A72',
  red: '#E03E3E',
};

export const EBackgroundColor = {
  default: 'rgba(227, 226, 224, 0.5)',
  gray: '#EBECED',
  brown: '#E9E5E3',
  orange: '#FAEBDD',
  yellow: '#FBF3DB',
  green: '#DDEDEA',
  blue: '#DDEBF1',
  purple: '#EAE4F2',
  pink: '#F4DFEB',
  red: '#FBE4E4',
};

export declare type NOTION_COLOR =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';
