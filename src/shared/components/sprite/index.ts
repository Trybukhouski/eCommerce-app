function addSprite(sprite: BrowserSpriteSymbol, width = 50, height = 50): string {
  return `
    <svg viewBox="${sprite.viewBox}" width="${width}" height="${height}">
      <use xlink:href="#${sprite.id}"/>
    </svg>
  `;
}

export { addSprite };
