# Creating a new project

You can create a new project by clicking on the `Create Project` button on the top-left corner of the projects view.
![A screenshot of the projects view.](https://placehold.co/800x600/EEE/31343C)

## Select a theme

First, you have to select a theme for your project. We offer multiple built-in themes, but you can also [create your own](/docs/themes).
![A screenshot of the project creation wizard's theme selection step.](https://placehold.co/800x600/EEE/31343C)

You can preview the themes to figure which you like the most.
![A screenshot of the project creation wizard's theme preview.](https://placehold.co/800x600/EEE/31343C)

::: warning
The theme of a project cannot be changed. If you have created a project with a theme, then it will stay as it is **forever**. If you need to change the theme of your emails, we suggest to create a new project with another theme.
:::

## Set the theme parameters

::: tip Optional step
This is an optional step. You can skip it, and do it later.
:::

Each theme has parameters with which you can customize its look and feel. These can be colors, images, font families, links, and texts.

![A screenshot of the project creation wizard's theme parameters settings step.](https://placehold.co/800x600/EEE/31343C)

There are **required** theme parameters, that you have to set up during project creation. These are for example: logo, primary, secondary colors, etc. **Optional** parameters cannot be set up at this step, but you can modify them later on. Some examples for optional parameters are neutral colors, such as dark or light grey.

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

## Populate project

Optionally, you can populate your projects with templates from the theme or you can create them from zero.

![A screenshot of the project creation wizard's last step about populating the project with emails.](https://placehold.co/800x600/EEE/31343C)

