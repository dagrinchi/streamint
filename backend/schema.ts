import { list } from '@keystone-6/core'

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  multiselect,
} from '@keystone-6/core/fields'

import { document } from '@keystone-6/fields-document'
import { type Lists } from '.keystone/types'

type Session = {
  data: {
    name: string;
    email: string;
    role: string[];
    createdAt: string;
  }
}

const isAdmin = ({ session }: { session?: Session }) => {
  console.log(session)
  return Boolean(session?.data.role.includes('ROLE_ADMIN'))
};
const isAdManager = ({ session }: { session?: Session }) => Boolean(session?.data.role.includes('ROLE_AD_MANAGER'));
const isContentCreator = ({ session }: { session?: Session }) => Boolean(session?.data.role.includes('ROLE_CONTENT_CREATOR'));

export const lists = {
  User: list({
    access: isAdmin,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      role: multiselect({
        type: 'enum',
        options: [
          { label: 'Admin', value: 'ROLE_ADMIN' },
          { label: 'Ad manager', value: 'ROLE_AD_MANAGER' },
          { label: 'Content creator', value: 'ROLE_CONTENT_CREATOR' },
          { label: 'Viewer', value: 'ROLE_VIEWER' },
        ]
      }),
      posts: relationship({ ref: 'Post.author', many: true, ui: { hideCreate: true, displayMode: 'count' } }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),
  Post: list({
    access: isContentCreator,
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      tags: relationship({
        ref: 'Tag.posts',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
      }),
    },
  }),

  Tag: list({
    access: isContentCreator,
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),
} satisfies Lists
