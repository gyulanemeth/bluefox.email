---
title: Account Roles | BlueFox Email documentation
description: Learn about account roles in BlueFox Email. Understand the differences between User and Admin roles, and how to manage client access with Editor and Viewer permissions.
head:
  - - meta
    - name: description
      content: Learn about account roles in BlueFox Email. Understand the differences between User and Admin roles, and how to manage client access with Editor and Viewer permissions.
  - - meta
    - property: og:title
      content: Account Roles | BlueFox Email documentation
  - - meta
    - property: og:description
      content: Learn about account roles in BlueFox Email. Understand the differences between User and Admin roles, and how to manage client access with Editor and Viewer permissions.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/account-roles
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Account Roles | BlueFox Email documentation
  - - meta
    - name: twitter:description
      content: Learn about account roles in BlueFox Email. Understand the differences between User and Admin roles, and how to manage client access with Editor and Viewer permissions.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Account Users

BlueFox Email uses a role-based access control system to manage permissions within your account. Understanding these roles helps you control who can access your projects and what actions they can perform.

## Role Overview

There are three account roles in bluefox.email:

- **Admin**: Account administrator with full control over projects, user and client access management.
- **User**: Standard account member with access to projects and email themes and they can also view other account users and clients but with no administrative privileges.
- **Client**: A special role assigned to users who need access to specific projects with defined permissions. It can be either a editor access or just view only access.

You can find your account roles settings in **Account Users** tab. 

![bluefox email account users](./account-users-side-menu.webp)

Here you can easily manager your user roles and client access levels.
![bluefox email account user roles](./account-user-roles.webp)

## Member Invitations and role creation

To invite a member to your BlueFox Email account, first make sure that you are a **admin**. Only admins are allowed to invite new members. 

Check the **Invite New Member** button in top left corner of the **Account Users** tab.

![bluefox email invite new member](./account-invite-new-member.webp)

After that you will be presented with a form. You can see the account for which you are inviting the member and you will need to enter :
- **Email Address**: The email address of the member you want to invite.
- **Confirm Email Address**: Re-enter the email address to confirm.
- **Role**: Select the role for the member. You can choose between **User**, **Client**, and **Admin** roles.

![bluefox email invite member form](./account-invite-member-form.webp)

If you select the **Client** role, you will be presented with additional options to set the **Client Access Level**. You will need to select the **project** for which you want to grant access and then you have to choose between:

- **Editor Access**: Full control over the assigned project.
- **Viewer Access**: Read-only access to the assigned project.

![bluefox email client access level](./account-invite-client-access-level.webp)

## Understanding Roles and Permissions

### Admin Role

Admin role is designed for account administrators who need full control over the BlueFox Email account

You can identify an admin by the **Admin** label below there avatar and also in **Account Users** tab.
![bluefox email admin role](./account-admin-role-label.webp)

Admins have the ability to manage basically everything, user roles, client access levels, projects, email themes and account settings.

### User Role 

User role is designed for standard members of your BlueFox Email account. Users have access to projects, email themes and view only access to account user section, they can create projects and can perform tasks based on their permissions.

You can identify a user by the **User** label below there avatar and also in **Account Users** tab.

![bluefox email user role](./account-user-role-label.webp)

Users are managed by Admins and don't have access to any of the account-wide settings.

### Client Access Levels

Client access levels determine what a client can do within a specific project. There are two levels of client access:

- **Editor Access**: Clients with editor access have full control over the assigned project. They can create, edit, and delete campaigns, automations. They can also manage subscriber lists and contacts, view analytics, and send emails.

- **Viewer Access**: Clients with viewer access have read-only access to the assigned project. They can view campaigns, automations, templates, analytics, and subscriber lists, but cannot make any changes or send emails.

You can identify a client by the **Client** label below there avatar and also in **Account Users** tab.
![bluefox email client role](./account-client-role-label.webp)

You can also identify the project access level of a client through this label. 
![bluefox email client project access level](./account-client-project-access-level-label.webp)

and the access level is indicated next to the **Client** label.
![bluefox email client access level label](./account-client-access-level-label.webp)

## Summary

| Role | Permissions |
|------|-------------|
| **User** | Access to projects only, restricted to any account related settings|
| **Admin** | Full account access, manage projects, and control team member permissions |
| **Editor** (Client Access) | Full project control: create, edit, delete, and send |
| **Viewer** (Client Access) | Read-only project access: view and analyze only |
