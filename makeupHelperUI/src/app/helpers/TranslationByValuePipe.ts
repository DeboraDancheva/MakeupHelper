import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translateValue'
})
export class TranslationByValuePipe implements PipeTransform {
  constructor(private translationService: TranslationService) { }

  transform(messageName: string, languageCode: string): string {
    return this.translationService.translateValue(languageCode, messageName);
  }
}
