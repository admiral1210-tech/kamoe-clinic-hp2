import type { ReactNode } from 'react';

export interface DListItemProps {
  dt: string;
  children?: ReactNode;
}

export function DListItem({ dt, children }: DListItemProps) {
  return (
    <>
      <h6 dangerouslySetInnerHTML={{ __html: dt }} />
      <div className="dd ml-8">{children}</div>
    </>
  );
}
