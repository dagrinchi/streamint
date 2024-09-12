import { list, graphql } from '@keystone-6/core'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  multiselect,
  file,
  calendarDay,
  virtual,
  json,
} from '@keystone-6/core/fields'

import { type Lists } from '.keystone/types'

const BASE_ARFLEET_CLIENT_URL = process.env.BASE_ARFLEET_CLIENT_URL || 'http://localhost:8885'

type Session = {
  data: {
    id: string;
    name: string;
    email: string;
    role: string[];
    createdAt: string;
  }
}

type AssignmentPlacements = {
  id: string;
  assignment_id: string;
  provider_id: string;
  provider_connection_strings: string[];
  merkle_root: string;
  merkle_tree: string[];
  process_id: string;
  private_key: string;
  public_key: string;
  expires?: string;
  is_funded: boolean;
  required_reward: number;
  required_collateral: number;
  error_was?: string;
  status: string;
  created_at: string;
  updated_at: string;
  AssignmentId: string;
}

const isAdmin = ({ session }: { session?: Session }) => Boolean(session?.data.role.includes('ROLE_ADMIN'));
const isAdManager = ({ session }: { session?: Session }) => isAdmin({ session }) || Boolean(session?.data.role.includes('ROLE_AD_MANAGER'));
const isContentCreator = ({ session }: { session?: Session }) => isAdmin({ session }) || Boolean(session?.data.role.includes('ROLE_CONTENT_CREATOR'));
const isLogged = ({ session }: { session?: Session }) => Boolean(session);
const isMyWallet = ({ session }: { session?: Session }) => ({ user: { id: { equals: session?.data.id } } })
const isMyContent = ({ session }: { session?: Session }) => ({ author: { id: { equals: session?.data.id } } })
const isMe = ({ session }: { session?: Session }) => ({ id: { equals: session?.data.id } })

export const lists = {
  User: list({
    ui: { hideCreate: true },
    access: {
      operation: isLogged,
      filter: {
        query: isMe,
        update: isMe,
        delete: isMe,
      }
    },
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
      wallet: relationship({ ref: 'Wallet.user', many: false, ui: { hideCreate: true } }),
      posts: relationship({ ref: 'Post.author', many: true, ui: { hideCreate: true } }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),
  Wallet: list({
    access: {
      operation: isLogged,
      filter: {
        query: isMyWallet,
        update: isMyWallet,
        delete: isMyWallet,
      }
    },
    fields: {
      user: relationship({ ref: 'User.wallet', many: false, ui: { hideCreate: true } }),
      address: text({ validation: { isRequired: true } }),
      publickey: text({ validation: { isRequired: true } }),
    }
  }),
  Ad: list({
    access: {
      operation: isAdManager,
      filter: {
        update: isMyContent,
        delete: isMyContent,
      }
    },
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
        ref: 'User',
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
    access: {
      operation: isContentCreator,
      filter: {
        update: isMyContent,
        delete: isMyContent,
      }
    },
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text(),
      status: select({
        type: 'enum',
        options: [
          { label: 'Draft', value: 'DRAFT' },
          { label: 'Progress', value: 'IN_PROGRESS' },
          { label: 'Assignment', value: 'ASSIGNMENT' },
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
      }),
      assignment: json(),
      placements: virtual({
        ui: { query: '{ id status provider_id provider_connection_strings error_was created_at updated_at }' },
        field: graphql.field({
          type: graphql.list(graphql.object<AssignmentPlacements>()({
            name: 'AssignmentPlacements',
            fields: {
              id: graphql.field({ type: graphql.String }),
              assignment_id: graphql.field({ type: graphql.String }),
              provider_id: graphql.field({ type: graphql.String }),
              provider_connection_strings: graphql.field({ type: graphql.list(graphql.String) }),
              merkle_root: graphql.field({ type: graphql.String }),
              merkle_tree: graphql.field({ type: graphql.list(graphql.String) }),
              process_id: graphql.field({ type: graphql.String }),
              private_key: graphql.field({ type: graphql.String }),
              public_key: graphql.field({ type: graphql.String }),
              expires: graphql.field({ type: graphql.String }),
              is_funded: graphql.field({ type: graphql.Boolean }),
              required_reward: graphql.field({ type: graphql.Int }),
              required_collateral: graphql.field({ type: graphql.Int }),
              error_was: graphql.field({ type: graphql.String }),
              status: graphql.field({ type: graphql.String }),
              created_at: graphql.field({ type: graphql.String }),
              updated_at: graphql.field({ type: graphql.String }),
              AssignmentId: graphql.field({ type: graphql.String }),
            },
          })),
          async resolve({ assignment, authorId }, args, context) {
            if (!assignment) return []
            const { assignmentId } = JSON.parse(assignment);
            const user = await context.query.User.findOne({ where: { id: authorId }, query: 'id wallet { publickey }' })
            const jwk = btoa(JSON.stringify({
              e: "AQAB",
              ext: true,
              kty: "RSA",
              n: user.wallet.publickey
            }))
            const res = await fetch(`${BASE_ARFLEET_CLIENT_URL}/api/placements/${assignmentId}`, {
              method: 'POST',
              body: JSON.stringify({ jwk }),
              headers: { 'Content-Type': 'application/json' }
            })
            const json = await res.json()
            return json.placement;
          },
        }),
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
    hooks: {
      afterOperation: async ({ operation, item, context }) => {
        if ((operation === 'create' || operation === 'update') && item.video_filename && item.status === 'DRAFT') {
          await context.query.Post.updateOne({ where: { id: item.id }, data: { status: 'IN_PROGRESS' } })
          const video_fullpath = path.join(path.resolve(__dirname, '..'), 'public/files', item.video_filename)
          const user = await context.query.User.findOne({ where: { id: item.authorId }, query: 'id wallet { publickey }' })
          const jwk = btoa(JSON.stringify({
            e: "AQAB",
            ext: true,
            kty: "RSA",
            n: user.wallet.publickey
          }))
          const res = await fetch(`${BASE_ARFLEET_CLIENT_URL}/store`, {
            method: 'POST',
            body: JSON.stringify({ path: video_fullpath, jwk }),
            headers: { 'Content-Type': 'application/json' }
          })
          const json = await res.json()
          await context.query.Post.updateOne({ where: { id: item.id }, data: { assignment: json, status: 'ASSIGNMENT' } })
        }
      }
    }
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
