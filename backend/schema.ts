import { list } from '@keystone-6/core'

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  multiselect,
  file,
  calendarDay,
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

const isAdmin = ({ session }: { session?: Session }) => Boolean(session?.data.role.includes('ROLE_ADMIN'));
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
      ads: relationship({ ref: 'Ad.author', many: true, ui: { hideCreate: true, displayMode: 'count' } }),
      posts: relationship({ ref: 'Post.author', many: true, ui: { hideCreate: true, displayMode: 'count' } }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),
  Ad: list({
    access: isAdManager,
    fields: {
      title: text({ validation: { isRequired: true } }),
      starts: calendarDay({
        validation: { isRequired: true }
      }),
      ends: calendarDay({
        validation: { isRequired: true }
      }),
      description: text(),
      status: select({
        type: 'enum',
        options: [
          { label: 'Draft', value: 'DRAFT' },
          { label: 'Progress', value: 'IN_PROGRESS' },
          { label: 'Published', value: 'PUBLISHED' },
        ]
      }),
      video: file({ storage: 'local_files_storage' }),
      tags: relationship({
        ref: 'Tag.ads',
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
      author: relationship({
        ref: 'User.ads',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
    }
  }),
  Post: list({
    access: isContentCreator,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text(),
      status: select({
        type: 'enum',
        options: [
          { label: 'Draft', value: 'DRAFT' },
          { label: 'Progress', value: 'IN_PROGRESS' },
          { label: 'Published', value: 'PUBLISHED' },
        ]
      }),
      video: file({ storage: 'local_files_storage' }),
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
      })
    },
  }),
  Tag: list({
    access: isContentCreator,
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      ads: relationship({ ref: 'Ad.tags', many: true }),
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),
} satisfies Lists
