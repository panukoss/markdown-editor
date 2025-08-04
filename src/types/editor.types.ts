export interface EditorState {
  content: string;
  lastSaved: Date | null;
  isAutoSaveEnabled: boolean;
}

export interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
  description: string;
}

export interface SyncScrollProps {
  sourceRef: React.RefObject<HTMLElement>;
  targetRef: React.RefObject<HTMLElement>;
  enabled?: boolean;
}