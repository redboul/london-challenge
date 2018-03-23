import { ElementRef } from '@angular/core';
import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge-description',
  templateUrl: './challenge-description.component.html',
  styleUrls: ['./challenge-description.component.css'],
})
export class ChallengeDescriptionComponent implements OnInit {
  @Input() description;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const canvas = this.el.nativeElement.querySelector('canvas');
    const context = canvas.getContext('2d');
    const maxWidth = 300;
    const lineHeight = 25;
    const x = maxWidth / 2;
    const y = 25;
    context.textAlign = 'center';
    context.font = `1.1rem 'Nunito', sans-serif`;
    context.fillStyle = '#000';

    this.wrapText(context, this.description, x, y, maxWidth, lineHeight);
  }

  wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
}
