import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post, PostSummary } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { cleanSlug, trimSlash, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

/** frontmatter のみ。一覧・RSS・ウィジェット用（MDX render なし）。 */
const buildPostSummaryFields = async (post: CollectionEntry<'post'>): Promise<PostSummary> => {
  const { id, data } = post;
  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(id);
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id,
    slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),
    publishDate,
    updateDate,
    title,
    excerpt,
    image,
    category,
    tags,
    author,
    draft,
    metadata,
  };
};

const buildPostFull = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { Content, remarkPluginFrontmatter } = await render(post);
  const base = await buildPostSummaryFields(post);
  return {
    ...base,
    Content,
    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

let _postEntries: CollectionEntry<'post'>[] | undefined;
let _summaries: PostSummary[] | undefined;
let _fullPosts: Post[] | undefined;

const ensureSortedEntries = async (): Promise<CollectionEntry<'post'>[]> => {
  if (!_postEntries) {
    const posts = await getCollection('post');
    _postEntries = [...posts].sort(
      (a, b) =>
        new Date(b.data.publishDate ?? 0).valueOf() - new Date(a.data.publishDate ?? 0).valueOf()
    );
  }
  return _postEntries;
};

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** 一覧・RSS・タグ/カテゴリ一覧など。MDX の `render` は行わない。 */
export const fetchPostSummaries = async (): Promise<PostSummary[]> => {
  if (_summaries) return _summaries;
  if (_fullPosts) {
    _summaries = _fullPosts.map(({ Content: _omit, ...rest }) => rest);
    return _summaries;
  }
  const entries = await ensureSortedEntries();
  const all = await Promise.all(entries.map((e) => buildPostSummaryFields(e)));
  _summaries = all.filter((p) => !p.draft);
  return _summaries;
};

/** 個別記事ページなど本文コンポーネントが必要なときのみ。 */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (_fullPosts) return _fullPosts;
  const entries = await ensureSortedEntries();
  const all = await Promise.all(entries.map((e) => buildPostFull(e)));
  _fullPosts = all.filter((p) => !p.draft);
  return _fullPosts;
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPostSummaries();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: PostSummary) {
      return slug === post.slug && r.push(post as Post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPostSummaries();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: PostSummary) {
      return id === post.id && r.push(post as Post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPostSummaries();

  return posts ? posts.slice(0, _count).map((p) => p as Post) : [];
};

/** ブログ一覧は src/pages/blog/index.astro（/blog）が唯一の正。旧 [...blog]/[...page] は廃止。 */

/** */
export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPostSummaries();
  const categories = {};
  posts.map((post) => {
    if (post.category?.slug) {
      categories[post.category?.slug] = post.category;
    }
  });

  return Array.from(Object.keys(categories)).flatMap((categorySlug) =>
    paginate(
      posts.filter((post) => post.category?.slug && categorySlug === post.category?.slug),
      {
        params: { category: categorySlug, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category: categories[categorySlug] },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPostSummaries();
  const tags = {};
  posts.map((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.map((tag) => {
        tags[tag?.slug] = tag;
      });
    }
  });

  return Array.from(Object.keys(tags)).flatMap((tagSlug) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag: tags[tagSlug] },
      }
    )
  );
};

/** */
export async function getRelatedPosts(originalPost: Post, maxResults: number = 4): Promise<Post[]> {
  const allPosts = await fetchPostSummaries();
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = allPosts.reduce((acc: { post: PostSummary; score: number }[], iteratedPost: PostSummary) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 1;
        }
      });
    }

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post as Post);
    i++;
  }

  return selectedPosts;
}
