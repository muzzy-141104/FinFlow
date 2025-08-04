
export const placeholderImages = [
  "/placeholders/event-1.jpg",
  "/placeholders/event-2.jpg",
  "/placeholders/event-3.jpg",
  "/placeholders/event-4.jpg",
  "/placeholders/event-5.jpg",
  "/placeholders/event-6.jpg",
  "/placeholders/event-7.jpg",
  "/placeholders/event-8.jpg",
];

export function getRandomPlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
}
