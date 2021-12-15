import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect : boolean = false;
  constructor(private el : ElementRef, private render : Renderer2) { }
  @HostListener('click') answer(){
    if(this.isCorrect){
      this.render.addClass(this.el.nativeElement,'text-white');
      this.render.addClass(this.el.nativeElement,'bg-teal-400');
    } else {
      this.render.addClass(this.el.nativeElement,'text-white');
      this.render.addClass(this.el.nativeElement,'bg-red-400');

    }

  }
}
