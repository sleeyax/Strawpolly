# Strawpolly
Strawpoll/voting application, written in Angular. Backend can be found [here](https://github.com/sleeyax/Strawpolly-api).

## General information
The main purpose of this app is to provide a private space for you and your friends to
vote on polls.

## Friends
Every user (let's call them members) can add a friend by their email address. If no member with that email exists, an email will be sent containing a link to create a new account.

These are the currently available 'friendship states':

**Pending**

A friend request has been sent and is waiting for approval.

**Accepted**

Friend request has been approved. You are now friends!

**Declined**

Your friend request has been denied. The other member must either approve your request or remove it in order for you to submit a new request. 

**Blocked**

You have been blocked by another member. Any action related to that member will be impossible, unless the block has been lifted.

