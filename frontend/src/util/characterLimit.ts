export default function characterLimit(word: string, limit: number) {
  if (word.length > limit) {
    return word.substring(0, limit) + "...";
  }
  return word;
}
