import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[pmHighlightExpensive]'
})
export class HighlightExpensiveDirective implements OnChanges {
  @Input('pmHighlightExpensive') price?: number;

  @HostBinding('style.borderRadius') radius = '6px';
  @HostBinding('style.padding') pad = '0 4px';

  @HostBinding('style.background') bg?: string;
  @HostBinding('style.border') border?: string;

  ngOnChanges(): void {
    const p = Number(this.price);
    if (Number.isFinite(p) && p >= 150) {
      this.bg = 'rgba(255, 99, 71, 0.15)';      
      this.border = '1px solid rgba(255, 99, 71, 0.45)';
    } else {
      this.bg = '';
      this.border = '';
    }
  }
}