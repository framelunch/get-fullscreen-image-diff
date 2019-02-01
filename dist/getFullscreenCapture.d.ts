export interface Props {
  url: string;
  filename: string;
  width: number;
  height: number;
  user?: string;
  pass?: string;
}
export declare function getFullscreenCapture({ url, filename, width, height, user, pass }: Props): Promise<void>;
