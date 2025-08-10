export const placeholderImages: string[] = [
  "/placeholders/event-1.jpg",
  "/placeholders/event-2.jpg",
  "/placeholders/event-3.jpg",
  "/placeholders/event-4.jpg",
  "/placeholders/event-5.jpg",
  "/placeholders/event-6.jpg",
  "/placeholders/event-7.jpg",
  "/placeholders/event-8.jpg",
  "/placeholders/event-9.jpg",
  "/placeholders/event-10.jpg",
  "/placeholders/event-11.jpg",
  "/placeholders/event-12.jpg",
  "/placeholders/event-13.jpg",
  "/placeholders/event-14.jpg",
  "/placeholders/event-15.jpg",
];

let shuffledImages: string[] = [];
let currentIndex: number = 0;

function shuffleArray(array: string[]): string[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getRandomPlaceholder(): string {
  if (currentIndex === 0 || currentIndex >= shuffledImages.length) {
    shuffledImages = shuffleArray(placeholderImages);
    currentIndex = 0;
  }
  return shuffledImages[currentIndex++];
}
