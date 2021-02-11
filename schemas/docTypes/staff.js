import HiOutlineUserGroup from '@meronex/icons/hi/HiOutlineUserGroup';
export default {
  name: 'staff',
  title: 'Staff',
  type: 'document',
  icon: HiOutlineUserGroup,
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    {
      name: 'name',
      title: 'Name',
      validation: (Rule) => Rule.required(),
      type: 'string',
    },
    {
      name: 'headshot',
      title: 'Head Shot',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      title: 'Crendentials',
      name: 'crendentials',
      type: 'array',
      of: [
        {
          title: 'Copy',
          name: 'copy',
          type: 'string',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'name',
      media: 'headshot',
      cred: 'crendentials',
    },
    prepare(selection) {
      const { title, cred } = selection;
      return Object.assign({}, selection, {
        title,
        subtitle: `${cred[0]}`,
      });
    },
  },
};
