export class Slider {
  private sliderIndex = 0;

  private totalThumbnails: number;

  private visibleThumbnailsCount: number;

  private thumbnailsWrapper: HTMLElement;

  private prevButton: HTMLElement;

  private nextButton: HTMLElement;

  private onUpdateMainImage: (src: string) => void;

  constructor(
    thumbnailsWrapper: HTMLElement,
    totalThumbnails: number,
    visibleThumbnailsCount: number,
    prevButton: HTMLElement,
    nextButton: HTMLElement,
    onUpdateMainImage: (src: string) => void
  ) {
    this.thumbnailsWrapper = thumbnailsWrapper;
    this.totalThumbnails = totalThumbnails;
    this.visibleThumbnailsCount = visibleThumbnailsCount;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.onUpdateMainImage = onUpdateMainImage;

    // eslint-disable-next-line no-param-reassign
    prevButton.onclick = () => this.showPreviousImage();
    // eslint-disable-next-line no-param-reassign
    nextButton.onclick = () => this.showNextImage();

    this.updateThumbnails();
    this.updateArrowVisibility();
  }

  public showPreviousImage(): void {
    if (this.sliderIndex > 0) {
      this.sliderIndex -= 1;
      this.updateThumbnails();
      this.onUpdateMainImage(this.getCurrentImageSrc());
      this.updateArrowVisibility();
    }
  }

  public showNextImage(): void {
    if (this.sliderIndex < this.totalThumbnails - this.visibleThumbnailsCount) {
      this.sliderIndex += 1;
      this.updateThumbnails();
      this.onUpdateMainImage(this.getCurrentImageSrc());
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

  private getCurrentImageSrc(): string {
    const currentThumbnail = this.thumbnailsWrapper.children[this.sliderIndex] as HTMLImageElement;
    return currentThumbnail ? currentThumbnail.src : '';
  }
}
