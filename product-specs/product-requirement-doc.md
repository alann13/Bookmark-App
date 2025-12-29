# Product Requirements Document

A web application to manage your bookmarks. 

## Workflows

- Sign in and sign up from the homepage. Then be redirected to the application page.
- Logged in users will be able to view and manage their bookmarks through offered features
- Logging out will redirect to landing page
- When creating a bookmark, A button will open a modal for the creation of a bookmark. Bookmarks are created from the main application page. 
- handling errors with creating / editing a bookmark:
  - title, description, and url are required fields
  - url must be a valid url
- Dropdown options for managing a bookmark
  - Visit: open a new tab in the browser.
  - Copy url: copy url to the clipboard
  - Pin: pin the bookmark card to the top of the grid list
  - Edit: open a modal to edit a bookmark
  - Archive: archives the bookmark

## Features / UI
- A bookmark card displays a title, their link, description, tags, pin button, dropdown options to manage the bookmark, visited count, last visited time, created date
- Bookmarks can be archived or unarchived
- User can filter bookmark cards by clicking one or many checkboxes of tags.
- Users can only see the bookmarks they create
- Bookmarks can only be edited or deleted by the user who created it
- App has a dark and light theme
- Bookmarks can be sorted by recently added, recently visited, most visited
- Bookmarks can be pinned. Archived bookmarks cannot be pinned
- Tablet and mobile have a toggled side bar menu
- Perfoming an action will show a toast
- Visiting a bookmark from app will increase the visited_count 
- Tags can optionally be created by the bookmarks

## Types

### Bookmark
- A bookmark contains a title, description, url, tags, created_at, last_visited, visited_count
- Tagging a bookmark is optional

### Tag
- A simple word tag
- Serves to organize bookmarks

### User
- A user has a username, an email, and their list of bookmarks

## Figma Link
Provide these links to your ide LLM if you have MCP wired.

- Design system: https://www.figma.com/design/0L8cBZjDl7KlEfLml4I7lU/bookmark-manager-app?m=dev
- Designs: https://www.figma.com/design/0L8cBZjDl7KlEfLml4I7lU/bookmark-manager-app?m=dev

## Toast actions
Performing an action within the app will show a toast message based on the following:

- Creating a bookmark -> Bookmark added successfully.
- Editing a bookmark - > Changes saved.
- Copying link to clipboard -> Link copied to clipboard.
- Pinning a bookmark -> Bookmark pinned to top.
- Archiving a bookmark -> Bookmark archived.
- Restoring a bookmark -> Bookmark restored.
- Deleting a bookmark -> Bookmark deleted.

## Modal dialog action

- Archiving and unarchiving bookmarks will show a dialog confirmation UI
- Deleting a bookmark will show a dialog confirmation UI