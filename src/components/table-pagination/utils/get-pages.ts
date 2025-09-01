const getPages = (currentPage: number, siteTotal: number) => {
  const pages: (number | string)[] = [];
  const delta = 3; // how many pages around current

  // Always show first
  pages.push(1);

  // Left ellipsis
  if (currentPage - delta > 2) {
    pages.push("...");
  }

  // Pages around current
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(siteTotal - 1, currentPage + delta);
    i++
  ) {
    pages.push(i);
  }

  // Right ellipsis
  if (currentPage + delta < siteTotal - 1) {
    pages.push("...");
  }

  // Always show last
  if (siteTotal > 1) {
    pages.push(siteTotal);
  }

  return pages;
};

export default getPages;
