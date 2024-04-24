import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {
  @Input() imageUrls: string[] = [];
  currentSlideIndex: number = 0;
  ngOnInit(): void {
    this.preloadImages();
  }

  setCurrentSlide(index: number): void {
    this.currentSlideIndex = index;
  }

  isCurrentSlide(index: number): boolean {
    // console.log(this.currentSlideIndex===index);

    return this.currentSlideIndex === index;
  }

  preloadImages(): void {
    for (const [index, url] of this.imageUrls.entries()) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        // Handle successful load if needed
      };
      img.onerror = () => {
        // Replace the broken link with a fallback image
        this.imageUrls[index] = 'path-to-your-fallback-image.png';
      };
    }
  }

}
