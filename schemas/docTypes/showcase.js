import BisBriefcaseAlt2 from '@meronex/icons/bi/BisBriefcaseAlt2';
import FaImage from '@meronex/icons/fa/FaImage';
import { slugify } from './post';
export default {
  name: 'showcase',
  title: 'Showcase',
  type: 'document',
  icon: BisBriefcaseAlt2,
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => `showcase/${slugify(input)}`,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Additional Images',
      name: 'additionalImages',
      type: 'array',
      icon: FaImage,
      of: [
        {
          title: 'Image',
          name: 'image',
          type: 'image',
          validation: (Rule) => Rule.required(),
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      title: 'Contributors',
      name: 'contributors',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          title: 'Contributor',
          name: 'link',
          type: 'link',
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Meta Description',
      name: 'metaDescription',
      type: 'text',
      description: 'Keep it short and sweet!',
      validation: (Rule) => Rule.max(150).required(),
    },
  ],

  preview: {
    select: {
      title: 'title',
      contributors: 'contributors',
      media: 'mainImage',
    },
    prepare(selection) {
      const { contributors } = selection;
      return Object.assign({}, selection, {
        subtitle: `for ${contributors[0].copy}`,
      });
    },
  },
};
