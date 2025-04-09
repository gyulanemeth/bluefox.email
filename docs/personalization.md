# Email personalization (merge tags)

Email personalization is essential for modern companies. You need to grab your customers' attention—otherwise, they won’t click or open your next email. Sending thoughtful, personalized messages increases the chances that your users will enjoy your emails.

At bluefox.email, we use [handlebars](https://handlebarsjs.com/) for personalization. This means you can include merge tags in your emails using the **&#123;&#123;mustacheSyntax&#125;&#125;** format.

There are two primary ways to refer to data in your emails:
- Send the data with your request
- Use data from bluefox.email

A straightforward way to personalize an email is by sending data with your API call. This is only available for transactional and triggered emails. For example, if you want to include a user's favorite animal, add a `favoriteAnimal` property to your request:

```json
...
"data": {
  "favoriteAnimal": "fox"
},
...
```

Within your email, you can then use the **&#123;&#123;favoriteAnimal&#125;&#125;** merge tag:
![Simple merge tag example in the editor.](./personalization-01.png)

As you might expect, the email sent will look like this:
![Simple merge tag example in the inbox.](./personalization-02.png)

You can also personalize emails using data stored in bluefox.email. This is explained in the next two sections: "Built-in merge-tags" and "Contact properties".



## Built-in merge-tags

There are a few built-in variables that you can use in your emails without sending them in your request. It means that these variables can also be used in campaigns.

### Contact's email address
The first example is the contact's email address:

```
{{contact.email}}
```
This variable is always available in all emails.

### Unsubscribe link
Every non-transactional email must have an unsubscribe link. You can use the following merge tag to put an unsubscribe link into your email:
```
{{unsubscribeLink}}
```
This variable is not available in transactional emails.

### Pause subscription link
Similarly, you can put a [pause subscription](/email-best-practices-for-saas/unsubscribe-and-pause-subscription) link into the email. When users click on this one, the unsubscribe option will be hidden on the subscription preferences page.
```
{{pauseSubscriptionLink}}
```
This variable is not available in transactional emails.

## Contact properties
Contact properties will also always be available without sending them in your request.

As you previously could see, there is a built-in contact property, and it's the contact's email address:
```
{{contact.email}}
```
Besides this, all of the contact properties are optional. You can [add or remove](/docs/projects/settings#contact-properties) as many as you want, and you can update the property values via [API calls](/docs/api/subscriber-list-management#update-subscriber) or you can edit them on the UI. // TODO INSERT LINK

You can reach the contact properties via the `contact` object, as you could previously see. So for example, if you defined a `firstName` property for your contacts, you will be able to refer to it with the following merge tag:

```
{{contact.firstName}}
```

## Text personalization

When it comes to personalization, probably the most important thing is to personalize texts. Besides typing in the merge tags themselves, while editing a text element, you can also click the merge tag button highlighted on the screenshot below.

![Editing a text element - merge tag icon highlighted.](./personalization-03.png)

It will open a dialog that contains all the possible built-in merge tags and the contact-related merge tags that you defined.

![Editing a text element - merge tag dialog opened.](./personalization-04.png)

You just need to click on the one you want to insert.

![Editing a text element - merge tag inserted.](./personalization-05.png)

You can also use merge tags in your links within your text. Open the link dialog by clicking on the highlighted icon:

![Editing a text element - link button highlighted.](./personalization-06.png)

You can see the merge tags icon highlighted on the right-hand side. That opens the same dialog that you saw previously. Keep in mind that you will need to change the protocol to "other" if the link inserted by your merge tag already contains a protocol.

![Editing a text element - link dialog opened.](./personalization-07.png)

If you want to refer to data that you send in the request body when you send a triggered or transactional email, you will still need to type in the merge tag yourself. Just follow the same object structure that you had in the request. So for example, if you send the following data:

```json
...
"body": {
  "parent": {
    "name": "Joe Doe"
  }
}
...
```
And you want to refer to the parent's name, then you will need to type in the following merge tag in your text element:
```
{{parent.name}}
```

## Button personalization

For button elements, you can set the `src` property with merge tags. Similarly to links in *text* elements, you have to set the protocol to "other" if the merged variable already contains the protocol, such as `https://`. Besides the link itself, you can also set the `title` attribute of the link. (Whenever someone hovers over the link, the title attribute will show up in a tooltip in your email.)

![Editing a button element - link settings shown.](./personalization-08.png)

## Image personalization

Similarly to buttons, you can customize the link around an image with merge tags. Besides that, you can also set the `alt` text of the image with merge tags. Alt text is great for accessibility—just think about it: screen readers can't read images, but they can read the alt text!

![Editing an image element - possible merge tags shown.](./personalization-09.png)

If you also need to personalize the image itself (for example, you want to show the profile picture of a user), you will need to use a "Dynamic Image". Dynamic images in the editor are just placeholders; their `src` is always set at send time by replacing a merge tag with a real link.

![Editing a dynamic image element - src merge tag.](./personalization-10.png)

You can drag 'n' drop a new dynamic image to the canvas from the left-hand side.

![Editor - dynamic image drag icon highlighted.](./personalization-11.png)

## Conditionals

You can create optional content for your recipients with conditionals. For example, if a subscriber is a premium user, you might show extra content for them, or you can even create geolocation-dependent content (or anything else that you can come up with).

In the screenshot below, the expression button is highlighted. That will open up the same dialog that merge tag buttons opened. (Note that in conditionals, you don't need to add the curly braces!)

![Editing a conditional - expression button highlighted.](./personalization-12.png)

As you can see, a conditional can contain complex layouts, not only basic elements.

You can drag conditionals from the left-hand side of the editor.

![Editor - conditional drag icon highlighted.](./personalization-13.png)

## Loops

With loops, you can iterate over an array of elements. It means that a section of a template can be repeated as many times as many elements your array contains. Your array can contain objects, and within the loop, you can refer to the actual object with the `this` keyword. For example, you can show multiple messages or articles. The expression you set for loops has to be the name of the array you want to iterate through. A loop in bluefox.email translates to an `each` in handlebars.

![Editing a loop - expression highlighted.](./personalization-14.png)

You can drag a loop element from the left-hand side of the editor:
![Editor - loop drag icon highlighted.](./personalization-15.png)

## Handlebars extensions

Since handlebars' default functionality is quite limited, we made some extensions to make your lives easier.

### each

We overrode the default behavior of `each` by adding `skip` and `limit`.

The example below skips the first two articles and only iterates through three items.
```
{{#each articles skip=2 limit=3}}
  <!-- something here -->
{{/each}}
```

It basically means that you can add the skip and limit values right in the expression of a loop element in bluefox.email, right after the array you iterate through.

![Editing a loop - expression with skip and limit.](./personalization-16.png)

### Logical operators

By default, it's quite limited what you can use in conditionals in handlebars. That is why we decided to add logical operators that you might be used to.

You can write your logical expressions in the expression input of any conditional elements:
![Editing a conditional - expression highlighted.](./personalization-17.png)

#### AND

The `AND` operator can have as many arguments as you want, not only two.

```
{{#if (AND condition1 condition2 condition3 ...)}}
{{/if}}
```

#### OR

Similarly, `OR` can have as many arguments as you want.

```
{{#if (OR condition1 condition2 condition3 ...)}}
  {{!-- Your code here --}}
{{/if}}
```

#### NOT

The `NOT` operator can only have one argument.

```
{{#if (NOT condition)}}
  {{!-- Your code here --}}
{{/if}}
```

#### EQ

The `EQ` operator uses JavaScript's `===` operator in the background. It means that it will only return true if the types of the operands are the same as well as their values. (It doesn't apply automatic type conversions.)

```
{{#if (EQ value1 value2)}}
  {{!-- Your code here --}}
{{/if}}
```

#### INCLUDES

The `INCLUDES` operator checks for a value in an array. It also uses the `===` operator, so it does not do automatic type conversions.

```
{{#if (INCLUDES array value)}}
  {{!-- Your code here --}}
{{/if}}
```

#### Combining logical operators

As you might have guessed by now, these operators can be combined. Here is an example:

```
{{#if (AND (EQ user.status "active") user.isPremium)}}
  something here...
{{/if}}
```

### String manipulation

We also included a few string manipulator functions, so you can make these transformations within your template and you don't need to refactor your backend if you ever need to apply these.

You can use all of the text manipulators wherever you can enter text:
![Editing a text element - inserting a text manipulator operator.](./personalization-18.png)

#### CAPITALIZE

If you need to convert all of the characters of a string to uppercase, then you can use the `CAPITALIZE` function.

```
{{CAPITALIZE string}}
```

#### TRUNCATE

With the `TRUNCATE` function, you can limit the length of a string, and it adds "..." to the end of the string. This is very useful when you don't know how long strings you’re going to pass to your triggered or transactional emails.

```
{{TRUNCATE text characterNum}}
```

