import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHurryTime]'
})
export class HurryTimeDirective {

  @Input() counter: number = 60;

  constructor(private el: ElementRef, private render: Renderer2) {


   }
   @HostListener('change') answer(){
    if(this.counter<40){
      this.render.setStyle(this.el.nativeElement,'color','red');
    }
  }

}
