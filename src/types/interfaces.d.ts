interface ImageKitUploadResult {
  name: string;
  height: number;
  width: number;
  fileId: string;
  filePath: string;
  fileType: string;
  orientation: number;
  size: number;
  thumbnailUrl: string;
  url: string;
  versionInfo: { id: string; name: string };
  AITags: any; // eslint-disable-line
}
