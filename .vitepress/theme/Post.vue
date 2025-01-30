<template>
<div class="PostContent">
  <div class="vp-doc">
    <Content/>
  </div>
</div>
</template>

<style>
.PostContent {
  max-width: 800px;
  margin: 0 auto 100px auto;
  padding: 20px;
}

.PostContent h1 {
  font-size: 2.5em;
  line-height: 1.05em;
  margin-top: 0.75em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.PostContent h2 {
  font-size: 2em;
  line-height: 1.05em;
  margin-top: 3em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.PostContent h3 {
  font-size: 1.5em;
  line-height: 1.05em;
  margin-top: 2em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.PostContent p {
  font-size: 16px;
  line-height: 28px;
}

.PostContent .custom-block {
  margin: 16px 0;
}

.PostContent .custom-block p:first-child {
    margin: 0;
}

.PostContent .custom-block p {
  padding: 0;
}

.PostContent ul,
.PostContent ol {
  margin: 0; /* Restore default margin */
  padding-left: 1.5em; /* Restore default indentation */
  list-style-position: outside; /* Default list style position */
}

.PostContent ul {
  list-style-type: disc; /* Default bullet style for unordered lists */
}

.PostContent ol {
  list-style-type: decimal; /* Default numbering style for ordered lists */
}

.PostContent a {
  color: #13B0EE;
  text-decoration: none;
}
</style>
