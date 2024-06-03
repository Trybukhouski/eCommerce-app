export class Slider {
  private sliderIndex = 0;

  private totalThumbnails: number;

  private visibleThumbnailsCount: number;

  private thumbnailsWrapper: HTMLElement;

  private prevButton: HTMLElement;

  private nextButton: HTMLElement;

  constructor(
    thumbnailsWrapper: HTMLElement,
    totalThumbnails: number,
    visibleThumbnailsCount: number,
    prevButton: HTMLElement,
    nextButton: HTMLElement
  ) {
    this.thumbnailsWrapper = thumbnailsWrapper;
    this.totalThumbnails = totalThumbnails;
    this.visibleThumbnailsCount = visibleThumbnailsCount;
    this.prevButton = prevButton;
    this.nextButton = nextButton;

    this.updateArrowVisibility();
  }

  public showPreviousImage(): void {
    if (this.sliderIndex > 0) {
      this.sliderIndex -= 1;
      this.updateThumbnails();
      this.updateArrowVisibility();
    }
  }

  public showNextImage(): void {
    if (this.sliderIndex < this.totalThumbnails - this.visibleThumbnailsCount) {
      this.sliderIndex += 1;
      this.updateThumbnails();
      this.updateArrowVisibility();
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

  private updateArrowVisibility(): void {
    if (this.totalThumbnails <= this.visibleThumbnailsCount) {
      this.prevButton.style.display = 'none';
      this.nextButton.style.display = 'none';
    } else {
      this.prevButton.style.display = this.sliderIndex === 0 ? 'none' : 'block';
      this.nextButton.style.display =
        this.sliderIndex >= this.totalThumbnails - this.visibleThumbnailsCount ? 'none' : 'block';
    }
  }
}
