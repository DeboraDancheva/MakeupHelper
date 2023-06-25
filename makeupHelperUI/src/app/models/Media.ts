export class Media {
    name: string;
    description: string;
    type:string;
    hover:boolean = false;
    favorite:boolean = false;
  
    constructor(name: string,type: string,description: string, favorite:boolean) {
      this.name = name;
      this.description = description;
      this.type = type;
      this.favorite=favorite;
    }
  }
  