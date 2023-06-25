export class UserFaceConfigData {
  facePart: string = "";
  facePartMediaFileNames
    : string[] = [];

  constructor(facePart: string, facePartMediaFileNames: string[]) {
    this.facePart = facePart;
    this.facePartMediaFileNames = facePartMediaFileNames;
  }

}