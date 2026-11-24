# StoryNest

StoryNest is a full-stack MEVN blogging platform where people can publish ideas, explore writing by topic, and join conversations through comments.

The application includes a Vue 3 frontend, an Express API, MongoDB persistence, and JWT authentication.

## Features

- User registration, login, and logout
- JWT-based authentication with persistent sessions
- Password hashing with bcrypt
- Create, read, update, and delete blog posts
- Topic selection when creating or editing a post
- Filter posts by topic
- Three-line post previews with full article pages
- Authenticated commenting
- Author-only post editing
- Author or administrator post deletion
- Administrator post management page
- Responsive desktop and mobile layouts
- Curated homepage topic gallery

## Writing Topics

- Personal journal
- Food and recipes
- Travel
- Photography
- Business and news
- Creative writing
- Podcast

## Demo Accounts

These credentials are intended only for local demonstration.

| Role | Email | Password |
| --- | --- | --- |
| Administrator | `ay@mail.com` | `addi1234` |
| Normal user | `alli@mail.com` | `alli1234` |

## Permissions

| Action | Public | User | Author | Admin |
| --- | :---: | :---: | :---: | :---: |
| View posts | Yes | Yes | Yes | Yes |
| Register and log in | Yes | Yes | Yes | Yes |
| Create posts | No | Yes | Yes | Yes |
| Add comments | No | Yes | Yes | Yes |
| Edit a post | No | No | Own post | No |
| Delete a post | No | No | Own post | Any post |

## API Endpoints

### Users

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/users/register` | Public | Create an account |
| POST | `/users/login` | Public | Log in and receive a token |
| GET | `/users/details` | Authenticated | Load the current user |

### Posts

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/posts` | Public | Get all posts |
| GET | `/posts?category=Travel` | Public | Get posts from one topic |
| GET | `/posts/:id` | Public | Get one post |
| POST | `/posts` | Authenticated | Create a post |
| PATCH | `/posts/:id` | Author only | Update a post |
| DELETE | `/posts/:id` | Author or admin | Delete a post |
| POST | `/posts/:id/comments` | Authenticated | Add a comment |

## Data Models

### User

| Field | Type | Description |
| --- | --- | --- |
| `email` | String | Required and unique |
| `username` | String | Required and unique |
| `password` | String | Required and stored as a hash |
| `isAdmin` | Boolean | Defaults to `false` |

### Post

| Field | Type | Description |
| --- | --- | --- |
| `title` | String | Required post title |
| `content` | String | Required post content |
| `category` | String | Selected writing topic |
| `authorId` | ObjectId | User who created the post |
| `authorUsername` | String | Display name of the author |
| `createdOn` | Date | Automatically generated timestamp |
| `comments` | Array | Embedded comments |

### Comment

| Field | Type | Description |
| --- | --- | --- |
| `userId` | ObjectId | User who added the comment |
| `username` | String | Display name of the commenter |
| `comment` | String | Required comment text |
| `createdOn` | Date | Automatically generated timestamp |
