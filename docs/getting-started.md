# Getting started with bluefox.email

- prerequisites
  - AWS
  - SES - at least sandbox
- create a project

register
create a project

## Create email lists
 
::: tip Optional step
This is an optional step. You can skip it, and do it later.
:::

In order to send [triggered emails](/docs/projects/triggered-emails) or [campaigns](/docs/projects/campaigns), you will have to create [subscriber lists](/docs/projects/subscriber-lists). (You could also call it contact list or email list.)

If you are only planning to send [transactional emails](/docs/projects/transactional-emails), you can skip this step.

## Save your API key

::: tip Optional step
This is an optional step. You can skip it, and do it later.
:::

[API keys](/docs/projects/settings#api-keys) are used for four different things:
 - sending transactional emails
 - sending triggered emails
 - subscriber list management
 - bounce and complaint hooks

 ![A screenshot of the project creation wizard's API key step.](https://placehold.co/800x600/EEE/31343C)

We create one API key for you, that you can copy and save for later use. Later, you can optionally create multiple API keys.

When the project is created, you will be able to use this API key to set up [bounce and complaints hooks in AWS SNS](/articles/handling-bounces-and-complaints-with-aws-sns).

## AWS Settings

::: tip Optional step
This is an optional step. You can skip it, and do it later.
:::

If you want to send out emails with bluefox.email, you will have to provide your AWS credentials: and `Access key` and the corresponding `Secret access key`. This access key should only have access to AWS SES with only a certain sending email address, that you also have to set up at this step.

::: warning AWS too complicated? We got your back!
If you are not sure how to set up AWS SES, please read our [guide](/articles/how-to-send-emails-with-aws-ses).
:::

![A screenshot of the project creation wizard's AWS credentials step.](https://placehold.co/800x600/EEE/31343C)

::: danger We take security very seriously
Don't worry, we save your credentials encrypted, so even in the unlikely event of data leakage, your credentials are safe with us.
:::


## Domain whitelist

 ::: tip Optional step
 This is an optional step. You can skip it, and do it later.
 :::

 If you are planning to use our API from the client side, you will have to set up your domain whitelist, otherwise you will get CORS errors on your end.

![A screenshot of the project creation wizard's domain whitelist step.](https://placehold.co/800x600/EEE/31343C)

