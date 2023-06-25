import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslationService) { }

  transform(messageName: string, languageCode: string): string {
    return this.translationService.getTranslation(languageCode, messageName);
  }
}
