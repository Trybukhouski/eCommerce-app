export class Slider {
  private sliderIndex = 0;

  private totalThumbnails: number;

  private visibleThumbnailsCount: number;

  private thumbnailsWrapper: HTMLElement;

  constructor(
    thumbnailsWrapper: HTMLElement,
    totalThumbnails: number,
    visibleThumbnailsCount: number
  ) {
    this.thumbnailsWrapper = thumbnailsWrapper;
    this.totalThumbnails = totalThumbnails;
    this.visibleThumbnailsCount = visibleThumbnailsCount;
  }

  public showPreviousImage(): void {
    if (this.sliderIndex > 0) {
      this.sliderIndex -= 1;
      this.updateThumbnails();
    }
  }

  public showNextImage(): void {
    if (this.sliderIndex < this.totalThumbnails - this.visibleThumbnailsCount) {
      this.sliderIndex += 1;
      this.updateThumbnails();
    }
  }

  private updateThumbnails(): void {
    if (this.thumbnailsWrapper.firstElementChild) {
      const thumbnailWidth = (this.thumbnailsWrapper.firstElementChild as HTMLElement).offsetWidth;
      this.thumbnailsWrapper.style.transform = `translateX(-${
        this.sliderIndex * thumbnailWidth
      }px)`;
    }
  }
}
