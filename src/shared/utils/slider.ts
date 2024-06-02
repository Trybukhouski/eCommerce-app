export class Slider {
  private sliderIndex = 0;
  private totalThumbnails: number;
  private visibleThumbnailsCount: number;  // New property to store the number of visible thumbnails

  private thumbnailsWrapper: HTMLElement;

  constructor(thumbnailsWrapper: HTMLElement, totalThumbnails: number, visibleThumbnailsCount: number) {
    this.thumbnailsWrapper = thumbnailsWrapper;
    this.totalThumbnails = totalThumbnails;
    this.visibleThumbnailsCount = visibleThumbnailsCount;  // Initialize with how many thumbnails are visible at once
  }

  public showPreviousImage(): void {
    if (this.sliderIndex > 0) {
      this.sliderIndex--;
      this.updateThumbnails();
    }
  }

  public showNextImage(): void {
    // Only allow moving to the next image if doing so won't go past the end
    if (this.sliderIndex < this.totalThumbnails - this.visibleThumbnailsCount) {
      this.sliderIndex++;
      this.updateThumbnails();
    }
  }

  private updateThumbnails(): void {
    if (this.thumbnailsWrapper.firstElementChild) {
      const thumbnailWidth = (this.thumbnailsWrapper.firstElementChild as HTMLElement).offsetWidth;
      this.thumbnailsWrapper.style.transform = `translateX(-${this.sliderIndex * thumbnailWidth}px)`;
    }
  }
}
