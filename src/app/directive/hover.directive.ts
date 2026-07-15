import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[Hover]',
})
export class HoverDirective {

  @HostBinding('style.fontWeight')
  fontWeight: string = 'normal';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.fontWeight = 'normal';
  }

}