export type ArticleData = {
  title: string;
  description: string;
  body: string;
  tag: string;
};

export function generateArticleData(
  prefix = "Automation Article",
): ArticleData {
  const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    title: `${prefix} ${uniqueId}`,
    description: `Automation Description ${uniqueId}`,
    body: `Automation Body ${uniqueId}`,
    tag: `qa-${uniqueId}`,
  };
}

export function generateBio(): string {
  return `Automation bio ${Date.now()}`;
}
