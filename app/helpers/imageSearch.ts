export function imageSearch(
  name: string,
  directory: string = 'cards',
  extension: string = 'png'
): string {
  return `/${directory}/${name}.${extension}`;
}



