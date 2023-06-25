import { Component, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-public-view',
  templateUrl: './public-view.component.html',
  styleUrls: ['./public-view.component.css']
})
export class PublicViewComponent {
  sections:any;
  currentSectionIndex = 0;
  isScrolling = false;



  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.sections = Array.from(document.querySelectorAll('section'));
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {
    if (!this.isScrolling) {
      this.isScrolling = true;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollBottom = scrollTop + windowHeight;
      const currentSection = this.sections[this.currentSectionIndex];
      const currentSectionTop = currentSection.offsetTop;
      const currentSectionBottom = currentSectionTop + currentSection.offsetHeight;
  
      if (scrollBottom > currentSectionBottom && this.currentSectionIndex < this.sections.length - 1) {
        this.currentSectionIndex++;
      } else if (scrollTop < currentSectionTop && this.currentSectionIndex > 0) {
        this.currentSectionIndex--;
      }
  
      const nextSection = this.sections[this.currentSectionIndex];
      const nextSectionTop = nextSection.offsetTop;
      const distance = nextSectionTop - scrollTop;
      const duration = 500; // milliseconds
      const startTime = performance.now();
  
      const animateScroll = (timestamp:any) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easing = this.easeInOutQuad(progress);
        const position = scrollTop + (distance * easing);
        window.scrollTo({
          top: position,
          behavior: 'auto'
        });
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setTimeout(() => {
            this.isScrolling = false;
            if (this.currentSectionIndex !== this.sections.indexOf(nextSection)) {
              this.currentSectionIndex = this.sections.indexOf(nextSection);
            }
          }, 10);
        }
      };
  
      requestAnimationFrame(animateScroll);
    }
  }
  
  easeInOutQuad(t:any) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}
