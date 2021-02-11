import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import FaCogs from '@meronex/icons/fa/FaCogs';
import FaKeyboard from '@meronex/icons/fa/FaKeyboard';
import FiStar from '@meronex/icons/fi/FiStar';
import BiSort from '@meronex/icons/bi/BiSort';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import FdPageMultiple from '@meronex/icons/fd/FdPageMultiple';

const remoteURL = 'https://developersdonating.com';
const localURL = 'http://localhost:3000';

const appUrl = window.location.hostname === 'localhost' ? localURL : remoteURL;

const hiddenTypes = [
  'siteSettings',
  'category',
  'page',
  'post',
  'event',
  'menu',
  'staff',
  'showcase',
];

const PreviewModule = ({ url }) => {
  return (
    <>
      <a
        style={{
          display: 'block',
          textDecoration: 'none',
          textAlign: 'right',
          fontSize: '12px',
          position: 'fixed',
          zIndex: '431',
          right: '20px',
          top: '107px',
          border: '1px solid',
          padding: '0 5px',
        }}
        href={url}
        target="_blank"
      >
        New tab
      </a>
      <div className="container" style={{ height: '100%' }}>
        <iframe
          src={url}
          frameBorder={0}
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        />
      </div>
    </>
  );
};

const WebPreview = ({ document }) => {
  const previewUrl = `${appUrl}/${document.displayed?.slug?.current}?preview`;
  return <PreviewModule document={document} url={previewUrl} />;
};

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (
    schemaType !== 'event' &&
    schemaType !== 'category' &&
    schemaType !== 'staff' &&
    schemaType !== 'menu'
  ) {
    return S.document().views([
      S.view.form().icon(EditIcon),
      S.view.component(WebPreview).title('Web Preview').icon(EyeIcon),
    ]);
  }
};

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages'))
        .icon(FdPageMultiple),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('All Posts')
                .schemaType('post')
                .child(S.documentTypeList('post'))
                .icon(FdPageMultiple),
              S.listItem()
                .title('Sorted Posts')
                .schemaType('post')
                .child(
                  S.documentTypeList('post')
                    .filter('_type == "category"')
                    .child((id) =>
                      S.documentList()
                        .title('Posts by category')
                        .schemaType('post')
                        .filter('_type == "post" && $id in categories[]._ref')
                        .params({ id })
                    )
                )
                .icon(BiSort),
              S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(S.documentTypeList('category'))
                .icon(FiStar),
            ])
        )
        .icon(FaKeyboard),
      S.listItem()
        .title('Showcase')
        .schemaType('showcase')
        .child(S.documentTypeList('showcase')),
      S.listItem()
        .title('Staff')
        .schemaType('staff')
        .child(S.documentTypeList('staff')),
      S.listItem()
        .title('Events')
        .schemaType('event')
        .child(S.documentTypeList('event')),
      S.listItem()
        .title('Navigation')
        .schemaType('menu')
        .child(S.documentTypeList('menu')),
      S.listItem()
        .title('Global Settings')
        .child(
          S.editor()
            .title('Global Settings')
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(FaCogs),
      ...S.documentTypeListItems().filter(
        (listItem) => !hiddenTypes.includes(listItem.getId())
      ),
    ]);
