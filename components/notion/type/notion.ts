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
