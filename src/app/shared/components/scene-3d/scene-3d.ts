import { Component, input } from '@angular/core';

@Component({
  selector: 'app-scene-3d',
  templateUrl: './scene-3d.html',
  styleUrl: './scene-3d.css',
})
export class Scene3d {
  readonly variant = input<'hero' | 'subtle'>('hero');
}
