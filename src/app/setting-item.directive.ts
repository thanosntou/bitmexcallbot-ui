import {Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSettingItem]'
})
export class SettingItemDirective {

  @Input() set appSettingItem(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private elementRef: ElementRef,
              private vcRef: ViewContainerRef,
              private renderer: Renderer2) { }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightBlue');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }

}
