import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslationService } from 'src/app/services/translation.service';
import { TranslationPipe } from 'src/app/helpers/TranslationPipe';
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit{
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  selectedItems: any[] = [];

  constructor(private translationService:TranslationService){

  }
  ngOnInit(): void {
    debugger;
  }

  @ViewChild('dt') table!: Table;

  filterColumns: { [key: string]: any } = {};

  applyFilter(event: any, column: string) {
    this.filterColumns[column] = event.target.value;
    this.table.filter(this.filterColumns[column], column, 'contains');
  }

  clearFilter(column: string) {
    this.filterColumns[column] = null;
    this.table.filter(null, column, 'contains');
  }

  toggleRowSelection(item: any) {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  isRowSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  selectAllRows() {
    this.selectedItems = [...this.data];
  }

  deselectAllRows() {
    this.selectedItems = [];
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  trasnlateToEn(value:string) {
   return this.translationService.getTranslation('en', value);
  }
}


 
