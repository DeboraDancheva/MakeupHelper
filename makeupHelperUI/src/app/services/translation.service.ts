import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [languageCode: string]: { [messageName: string]: string } } = {
    en: {
      UI_MESS_EYES: 'Eyes',
      UI_MESS_MOUTH: 'Mouth',
      UI_MESS_NOSE: 'Nose',
      UI_MESS_FACE: 'Face',
      UI_MESS_EYES_ALMOND: 'Almond',
      UI_MESS_EYES_CLOSE_SET: 'Close Set',
      UI_MESS_EYES_DOWNTURNED: 'Downturned',
      UI_MESS_EYES_HOODED: 'Hooded',
      UI_MESS_EYES_ROUND: 'Round',
      UI_MESS_EYES_UPTURNED: 'Upturned',
      UI_MESS_EYES_WIDE_SET: 'Wide Set',
      UI_MESS_FACE_ELIPSE: 'Elipse',
      UI_MESS_FACE_RECTANGLE: 'Rectangle',
      UI_MESS_FACE_ROUND: 'Round',
      UI_MESS_FACE_SQUARE: 'Square',
      UI_MESS_FACE_TRIANGLE: 'Triangle',
      UI_MESS_FACE_COMMON: 'Common',
      UI_MESS_NOSE_ASYMMETRICAL: 'Asymmetrical',
      UI_MESS_NOSE_BULBOUS: 'Bulbous',
      UI_MESS_NOSE_LONG_AND_ARROW: 'Long and Arrow',
      UI_MESS_NOSE_SMALL_AND_SHORT: 'Small and Short',
      UI_MESS_NOSE_TURNED_UP: 'Turned Up',
      UI_MESS_NOSE_COMMON: 'Common',
      UI_MESS_MOUTH_BOW_SHAPED_LIPS: 'Bow Shaped Lips',
      UI_MESS_MOUTH_FULL_LIPS: 'Full Lips',
      UI_MESS_MOUTH_DOWNWARD_TURNED_LIPS: 'Downward Turned Lips',
      UI_MESS_MOUTH_HEART_SHAPED_LIPS: 'Heart Shaped Lips',
      UI_MESS_MOUTH_HEAVY_LOWER_LIPS: 'Heavy Lower Lips',
      UI_MESS_MOUTH_HEAVY_UPPER_LIPS: 'Heavy Upper Lips',
      UI_MESS_MOUTH_ROUND_LIPS: 'Round Lips',
      UI_MESS_MOUTH_THIN_LIPS: 'Thin Lips',
      UI_MESS_MOUTH_WIDE_LIPS: 'Wide Lips',
      UI_MESS_MOUTH_COMMON: 'Common',

      UI_MESS_FOUNDATION: 'Foundation',
      UI_MESS_MASCARA :'Mascara',
      UI_MESS_CONCELEAR :'Concelear',
      UI_MESS_EYELINER:'Eyeliner',
      UI_MESS_BLUSH :'Blush',
      UI_MESS_EYESHADOW :'Eyeshadow',
      UI_MESS_LIP_GLOSS :'Lip gloss',
      UI_MESS_BRONZER :'Bronzer',
      UI_MESS_HIGHLIGHTER:'Highlighter',
      UI_MESS_LIP_LINER :'Lip liner',

      UI_MESS_USERNAME: 'username',
      UI_MESS_EMAIL: 'email',
      UI_MESS_FIRSTNAME: 'firstName',
      UI_MESS_LASTNAME: 'lastName',

      UI_MESS_PRODUCTNAME: 'productName',
      UI_MESS_BRAND: 'brand',
      UI_MESS_FACEPART: 'facePart',
      UI_MESS_PRODUCTTYPE: 'productType',
      UI_MESS_AVERAGEREVIEW: 'averageReview',
      UI_MESS_PRICE: 'price',

      UI_MESS_NAME: 'name',
      UI_MESS_TYPE: 'type',
    },

    bg: {
      UI_MESS_EYES: 'очи',
      UI_MESS_MOUTH: 'устни',
      UI_MESS_NOSE: 'нос',
      UI_MESS_FACE: 'лице',
      UI_MESS_EYES_ALMOND: 'Бадемови',
      UI_MESS_EYES_CLOSE_SET: 'Събрани',
      UI_MESS_EYES_DOWNTURNED: 'С линия надолу',
      UI_MESS_EYES_HOODED: 'Очи с качулка',
      UI_MESS_EYES_ROUND: 'Кръгли',
      UI_MESS_EYES_UPTURNED: 'Обърнати нагоре',
      UI_MESS_EYES_WIDE_SET: 'Отдалечени',
      UI_MESS_FACE_ELIPSE: 'Елипсовидно',
      UI_MESS_FACE_RECTANGLE: 'Правоъгълно',
      UI_MESS_FACE_ROUND: 'Кръгло',
      UI_MESS_FACE_SQUARE: 'Квадратно',
      UI_MESS_FACE_TRIANGLE: 'Триъгълно',
      UI_MESS_FACE_COMMON: 'Общи',
      UI_MESS_NOSE_ASYMMETRICAL: 'Асиметричен',
      UI_MESS_NOSE_BULBOUS: 'Луковичен',
      UI_MESS_NOSE_LONG_AND_ARROW: 'Дълъг и Остър',
      UI_MESS_NOSE_SMALL_AND_SHORT: 'Малък и Свит',
      UI_MESS_NOSE_TURNED_UP: 'Чип',
      UI_MESS_NOSE_COMMON: 'Общи',
      UI_MESS_MOUTH_BOW_SHAPED_LIPS: 'Дъговидни Устни',
      UI_MESS_MOUTH_FULL_LIPS: 'Плътни Устни',
      UI_MESS_MOUTH_DOWNWARD_TURNED_LIPS: 'Обърнати Надолу Устни',
      UI_MESS_MOUTH_HEART_SHAPED_LIPS: 'Устни във Формата на Сърце',
      UI_MESS_MOUTH_HEAVY_LOWER_LIPS: 'Голяма Долна Устна',
      UI_MESS_MOUTH_HEAVY_UPPER_LIPS: 'Голяма Горна Устна',
      UI_MESS_MOUTH_ROUND_LIPS: 'Кръгли Устни',
      UI_MESS_MOUTH_THIN_LIPS: 'Тънки Устни',
      UI_MESS_MOUTH_WIDE_LIPS: 'Широки Устни',
      UI_MESS_MOUTH_COMMON: 'Общи',

      UI_MESS_FOUNDATION: 'Фон дьо тен',
      UI_MESS_MASCARA :'Спирала',
      UI_MESS_CONCELEAR :'Коректор',
      UI_MESS_EYELINER:'Очна линия',
      UI_MESS_BLUSH :'Руж',
      UI_MESS_EYESHADOW :'Сенки за очи',
      UI_MESS_LIP_GLOSS :'Гланц',
      UI_MESS_BRONZER :'Бронзант',
      UI_MESS_HIGHLIGHTER:'Озарител',
      UI_MESS_LIP_LINER :'Молив за устни',

      
      UI_MESS_USERNAME: 'потребителско име',
      UI_MESS_EMAIL: 'мейл',
      UI_MESS_FIRSTNAME: 'име',
      UI_MESS_LASTNAME: 'фамилия',

      UI_MESS_PRODUCTNAME: 'Име',
      UI_MESS_BRAND: 'Марка',
      UI_MESS_FACEPART: 'За коя част на лицето е',
      UI_MESS_PRODUCTTYPE: 'Вид',
      UI_MESS_AVERAGEREVIEW: 'Оценка',
      UI_MESS_PRICE: 'Цена',

      UI_MESS_NAME: 'Име',
      UI_MESS_TYPE: 'Вид',


    }
  };

  getTranslation(languageCode: string, messageName: string): string {
    const translations = this.translations[languageCode];
    if (translations && translations[messageName]) {
      return translations[messageName];
    }
    return 'Translation not found';
  }

  translateValue(languageCode: string, value: string): string {debugger;
    let langCodeToTranslate ='';
    if(languageCode === 'bg'){
      langCodeToTranslate = 'en';
    }else {
      langCodeToTranslate = 'bg';
    }

    const translations = this.translations[languageCode];
    if (translations) {
      const messageName = Object.keys(translations).find(key => translations[key].toLocaleLowerCase() === value.toLocaleLowerCase());
      if (messageName) {
        return this.getTranslation(langCodeToTranslate, messageName);
      }
    }
    return value;
  }
}
