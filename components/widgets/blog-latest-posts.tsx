import type { ReactNode } from 'react';
import Image from 'next/image';

import { WidgetWrapper } from '@/components/ui/widget-wrapper';

export interface BlogPost {
  id: string;
  slug: string;
  permalink: string;
  title: string;
  excerpt?: string;
  image?: string;
}

export interface BlogLatestPostsProps {
  id?: string;
  isDark?: boolean;
  bg?: ReactNode;
  classes?: { container?: string };
  title?: string;
  linkText?: string;
  linkUrl?: string;
  information?: string;
  posts?: BlogPost[];
}

export function BlogLatestPosts({
  id,
  isDark = false,
  bg,
  classes = {},
  title,
  linkText = 'View all posts',
  linkUrl = '/blog',
  information,
  posts = [],
}: BlogLatestPostsProps) {
  return (
    <WidgetWrapper id={id} isDark={isDark} containerClass={classes?.container} bg={bg}>
      <div className="flex flex-col lg:justify-between lg:flex-row mb-8">
        {title && (
          <div className="md:max-w-sm">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none group font-heading mb-2"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {linkText && linkUrl && (
              <a href={linkUrl} className="text-primary font-semibold hover:underline">
                {linkText} »
              </a>
            )}
          </div>
        )}

        {information && (
          <p
            className="text-muted dark:text-slate-400 lg:text-sm lg:max-w-md"
            dangerouslySetInnerHTML={{ __html: information }}
          />
        )}
      </div>

      {posts.length ? (
        <div className="grid gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-4 -mb-6">
          {posts.map((post) => (
            <article key={post.id} className="mb-6">
              <div className="relative md:h-64 bg-gray-400 dark:bg-slate-700 rounded shadow-lg mb-6 overflow-hidden">
                {post.image && (
                  <a href={post.permalink}>
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </a>
                )}
              </div>
              <h3 className="text-xl font-bold">
                <a href={post.permalink} className="hover:text-primary transition">
                  {post.title}
                </a>
              </h3>
              {post.excerpt && <p className="mt-2 text-muted">{post.excerpt}</p>}
            </article>
          ))}
        </div>
      ) : (
        <p className="text-muted dark:text-slate-400">現在公開中の記事はありません。</p>
      )}
    </WidgetWrapper>
  );
}
