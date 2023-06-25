import { MakeupProduct } from "./models/MakeupProduct";
import { Media } from "./models/Media";
import { User } from "./models/User";

export class Constants {
  static userColumns: string[] = ['UI_MESS_USERNAME', 'UI_MESS_EMAIL', 'UI_MESS_FIRSTNAME', 'UI_MESS_LASTNAME'];

  
  static productColumns: string[] = ['UI_MESS_PRODUCTNAME', 'UI_MESS_BRAND', 'UI_MESS_FACEPART', 'UI_MESS_PRODUCTTYPE', 'UI_MESS_AVERAGEREVIEW','UI_MESS_PRICE'];

  static mediaColumns: string[] = ['UI_MESS_NAME', 'UI_MESS_TYPE'];

  static translationPrefix = 'UI_MESS_';
}