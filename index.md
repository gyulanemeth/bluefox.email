---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Beautiful emails for modern companies.
  text: Powered by your own AWS SES.
  tagline: Send consistent and beautiful transactional, triggered, & marketing emails that your customers will love.
  actions:
    - theme: brand
      text: Sign up
      link: https://app.bluefox.email/accounts/create-account
    - theme: alt
      text: Why?
      link: /why
---
<script setup>
  function resetGame() {
    document.getElementById('found-1').checked = false
    document.getElementById('found-2').checked = false
    document.getElementById('found-3').checked = false
    document.getElementById('found-4').checked = false
    document.getElementById('found-5').checked = false
    document.getElementById('found-6').checked = false

    document.getElementById('c-1-1').checked = false
    document.getElementById('c-1-2').checked = false
    document.getElementById('c-1-3').checked = false
    document.getElementById('c-2-1').checked = false
    document.getElementById('c-2-2').checked = false
    document.getElementById('c-2-3').checked = false
    document.getElementById('c-3-1').checked = false
    document.getElementById('c-3-2').checked = false
    document.getElementById('c-3-3').checked = false
    document.getElementById('c-4-1').checked = false
    document.getElementById('c-4-2').checked = false
    document.getElementById('c-4-3').checked = false
  }
</script>
<style>
  .VPHero .container {
    display: block;
  }

  .VPHero .main {
    width: 100% !important;
    max-width: unset !important;
    text-align: center;
    display: block !important;
  }
  .VPHero .main .name {
    width: 100% !important;
    max-width: unset !important;
  }

  .VPHero .main .text {
    width: 100% !important;
    max-width: unset !important;
    font-size: 26px;
    line-height: 32px;
  }
  .VPHero .main .tagline {
    width: 100% !important;
    max-width: unset !important;
  }

  .VPHero .main .actions {
    width: 100% !important;
    max-width: unset !important;
    justify-content: center !important;
  }

  .VPHero .main .image {
    width: 100% !important;
    max-width: 100% !important;
    display: block !important;
  }

  .VPButton {
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s !important;
    text-decoration: none !important;
  }

  .VPButton.medium {
      border-radius: 20px;
      padding: 0 20px;
      line-height: 38px;
      font-size: 14px;
  }

  .VPButton.brand {
      border-color: var(--vp-button-brand-border);
      color: var(--vp-button-brand-text);
      background-color: var(--vp-button-brand-bg);
  }

  .VPButton.brand:hover {
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-hover-bg);
  }

  .VPButton.alt {
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-bg);
  }

  .VPButton.alt:hover {
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-hover-bg);
  }


  .VPFeatures .title {
    font-size: 20px !important;
  }
  .VPFeatures .details {
    font-size: 16px !important;
  }

  .VPImage {
    max-width: 100% !important;
    max-height: 100% !important;
  }

  .memory-game-wrapper {
    width: 100%;
  }

  .memory-game-wrapper .content {
    width: 320px;
  }

  .memory-game-wrapper form table {
    all: unset;
    display: table;
    border-collapse: separate;
    border-spacing: 10px;
    margin: 0 auto;
  }
  .memory-game-wrapper form tr {
    all: unset;
    display: table-row;
    background-color: unset !important;
  }

  .memory-game-wrapper form td {
    all: unset;
    display: table-cell;
    border: none;
    border-collapse: collapse;
  }




  .c {
    height: 180px;
    width: 180px;
  }

  .c label {
    display: block;
  }
  input {
    display: none;
  }
  .card {
    width: 180px;
    height: 180px;
    padding: 35px;
    border: 1px solid #dddddd;
    border-radius: 20px;
    background: #fafafa;
  }

  .card-back {
    filter: grayscale(100%);
    transition: all 0.5s ease;
  }

  .card-back:hover {
    border: 1px solid #13B0EE;
    filter: grayscale(0%);
  }

  .card-1, .card-2, .card-3, .card-4, .card-5, .card-6 {
    display: none;
  }

  .found-1, .found-2, .found-3, .found-4, .found-5, .found-6 {
    display: none;
  }

  .next {
    display: none;
  }

  .reset, .reset-1, .reset-2, .reset-3, .reset-4, .reset-5, .reset-6 {
    display: none;
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
  }

  #win {
    display: none;
    width: 580px;
    margin: 0 auto;
  }

  .win-card {
    margin-top: 30px;
    border-radius: 20px;
    color: white;
    padding: 30px;
    text-align: center;

    background: linear-gradient(-45deg,#392C91 10%,#13B0EE 90%)
  }

  .win-card-actions {
    display: flex;
    justify-content: center;
  }

  #found-1:checked ~ form .card-1 { display: block; }
  #found-1:checked ~ form .label-1 { display: none; }
  #found-2:checked ~ form .card-2 { display: block; }
  #found-2:checked ~ form .label-2 { display: none; }
  #found-3:checked ~ form .card-3 { display: block; }
  #found-3:checked ~ form .label-3 { display: none; }
  #found-4:checked ~ form .card-4 { display: block; }
  #found-4:checked ~ form .label-4 { display: none; }
  #found-5:checked ~ form .card-5 { display: block; }
  #found-5:checked ~ form .label-5 { display: none; }
  #found-6:checked ~ form .card-6 { display: block; }
  #found-6:checked ~ form .label-6 { display: none; }

  #c-1-1:checked ~ .m .sl-1-1 { display: none; }
  #c-1-1:checked ~ .m .si-1-1 { display: block; }
  #c-1-2:checked ~ .m .sl-1-2 { display: none; }
  #c-1-2:checked ~ .m .si-1-2 { display: block; }
  #c-1-3:checked ~ .m .sl-1-3 { display: none; }
  #c-1-3:checked ~ .m .si-1-3 { display: block; }

  #c-2-1:checked ~ .m .sl-2-1 { display: none; }
  #c-2-1:checked ~ .m .si-2-1 { display: block; }
  #c-2-2:checked ~ .m .sl-2-2 { display: none; }
  #c-2-2:checked ~ .m .si-2-2 { display: block; }
  #c-2-3:checked ~ .m .sl-2-3 { display: none; }
  #c-2-3:checked ~ .m .si-2-3 { display: block; }

  #c-3-1:checked ~ .m .sl-3-1 { display: none; }
  #c-3-1:checked ~ .m .si-3-1 { display: block; }
  #c-3-2:checked ~ .m .sl-3-2 { display: none; }
  #c-3-2:checked ~ .m .si-3-2 { display: block; }
  #c-3-3:checked ~ .m .sl-3-3 { display: none; }
  #c-3-3:checked ~ .m .si-3-3 { display: block; }

  #c-4-1:checked ~ .m .sl-4-1 { display: none; }
  #c-4-1:checked ~ .m .si-4-1 { display: block; }
  #c-4-2:checked ~ .m .sl-4-2 { display: none; }
  #c-4-2:checked ~ .m .si-4-2 { display: block; }
  #c-4-3:checked ~ .m .sl-4-3 { display: none; }
  #c-4-3:checked ~ .m .si-4-3 { display: block; }

  /* cell 1-1 */
  #c-1-1:checked ~ #c-1-2:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-1-2:checked ~ .selector { display: none; }
  #c-1-1:checked ~ #c-1-3:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-1-3:checked ~ .selector { display: none; }

  #c-1-1:checked ~ #c-2-1:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-2-1:checked ~ .selector { display: none; }
  #c-1-1:checked ~ #c-2-2:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-2-2:checked ~ .selector { display: none; }
  #c-1-1:checked ~ #c-2-3:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-2-3:checked ~ .selector { display: none; }

  #c-1-1:checked ~ #c-3-1:checked ~ .found-1 { display: block; }
  #c-1-1:checked ~ #c-3-1:checked ~ .selector { display: none; }
  #c-1-1:checked ~ #c-3-2:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-3-2:checked ~ .selector { display: none; }
  #c-1-1:checked ~ #c-3-3:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-3-3:checked ~ .selector { display: none; }

  #c-1-1:checked ~ #c-4-1:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-1-1:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-1-1:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-1-1:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 1-2 */
  #c-1-2:checked ~ #c-1-3:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-1-3:checked ~ .selector { display: none; }

  #c-1-2:checked ~ #c-2-1:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-2-1:checked ~ .selector { display: none; }
  #c-1-2:checked ~ #c-2-2:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-2-2:checked ~ .selector { display: none; }
  #c-1-2:checked ~ #c-2-3:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-2-3:checked ~ .selector { display: none; }

  #c-1-2:checked ~ #c-3-1:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-3-1:checked ~ .selector { display: none; }
  #c-1-2:checked ~ #c-3-2:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-3-2:checked ~ .selector { display: none; }
  #c-1-2:checked ~ #c-3-3:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-3-3:checked ~ .selector { display: none; }

  #c-1-2:checked ~ #c-4-1:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-1-2:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-1-2:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-1-2:checked ~ #c-4-3:checked ~ .found-2 { display: block; }
  #c-1-2:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 1-3 */
  #c-1-3:checked ~ #c-2-1:checked ~ .reset { display: block; }
  #c-1-3:checked ~ #c-2-1:checked ~ .selector { display: none; }
  #c-1-3:checked ~ #c-2-2:checked ~ .reset { display: block; }
  #c-1-3:checked ~ #c-2-2:checked ~ .selector { display: none; }
  #c-1-3:checked ~ #c-2-3:checked ~ .reset { display: block; }
  #c-1-3:checked ~ #c-2-3:checked ~ .selector { display: none; }

  #c-1-3:checked ~ #c-3-1:checked ~ .reset { display: block; }
  #c-1-3:checked ~ #c-3-1:checked ~ .selector { display: none; }
  #c-1-3:checked ~ #c-3-2:checked ~ .reset { display: block; }
  #c-1-3:checked ~ #c-3-2:checked ~ .selector { display: none; }
  #c-1-3:checked ~ #c-3-3:checked ~ .found-4 { display: block; }
  #c-1-3:checked ~ #c-3-3:checked ~ .selector { display: none; }

  #c-1-3:checked ~ #c-4-1:checked ~ .reset { display: block; }
  #c-1-3:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-1-3:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-1-3:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-1-3:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-1-3:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 2-1 */
  #c-2-1:checked ~ #c-2-2:checked ~ .reset { display: block; }
  #c-2-1:checked ~ #c-2-2:checked ~ .selector { display: none; }
  #c-2-1:checked ~ #c-2-3:checked ~ .found-5 { display: block; }
  #c-2-1:checked ~ #c-2-3:checked ~ .selector { display: none; }

  #c-2-1:checked ~ #c-3-1:checked ~ .reset { display: block; }
  #c-2-1:checked ~ #c-3-1:checked ~ .selector { display: none; }
  #c-2-1:checked ~ #c-3-2:checked ~ .reset { display: block; }
  #c-2-1:checked ~ #c-3-2:checked ~ .selector { display: none; }
  #c-2-1:checked ~ #c-3-3:checked ~ .reset { display: block; }
  #c-2-1:checked ~ #c-3-3:checked ~ .selector { display: none; }

  #c-2-1:checked ~ #c-4-1:checked ~ .reset { display: block; }
  #c-2-1:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-2-1:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-2-1:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-2-1:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-2-1:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 2-2 */
  #c-2-2:checked ~ #c-2-3:checked ~ .reset { display: block; }
  #c-2-2:checked ~ #c-2-3:checked ~ .selector { display: none; }

  #c-2-2:checked ~ #c-3-1:checked ~ .reset { display: block; }
  #c-2-2:checked ~ #c-3-1:checked ~ .selector { display: none; }
  #c-2-2:checked ~ #c-3-2:checked ~ .reset { display: block; }
  #c-2-2:checked ~ #c-3-2:checked ~ .selector { display: none; }
  #c-2-2:checked ~ #c-3-3:checked ~ .reset { display: block; }
  #c-2-2:checked ~ #c-3-3:checked ~ .selector { display: none; }

  #c-2-2:checked ~ #c-4-1:checked ~ .found-3 { display: block; }
  #c-2-2:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-2-2:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-2-2:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-2-2:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-2-2:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 2-3 */
  #c-2-3:checked ~ #c-3-1:checked ~ .reset { display: block; }
  #c-2-3:checked ~ #c-3-1:checked ~ .selector { display: none; }
  #c-2-3:checked ~ #c-3-2:checked ~ .reset { display: block; }
  #c-2-3:checked ~ #c-3-2:checked ~ .selector { display: none; }
  #c-2-3:checked ~ #c-3-3:checked ~ .reset { display: block; }
  #c-2-3:checked ~ #c-3-3:checked ~ .selector { display: none; }

  #c-2-3:checked ~ #c-4-1:checked ~ .reset { display: block; }
  #c-2-3:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-2-3:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-2-3:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-2-3:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-2-3:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 3-1 */
  #c-3-1:checked ~ #c-3-2:checked ~ .reset { display: block; }
  #c-3-1:checked ~ #c-3-2:checked ~ .selector { display: none; }
  #c-3-1:checked ~ #c-3-3:checked ~ .reset { display: block; }
  #c-3-1:checked ~ #c-3-3:checked ~ .selector { display: none; }

  #c-3-1:checked ~ #c-4-1:checked ~ .reset { display: block; }
  #c-3-1:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-3-1:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-3-1:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-3-1:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-3-1:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 3-2 */
  #c-3-2:checked ~ #c-3-3:checked ~ .reset { display: block; }
  #c-3-2:checked ~ #c-3-3:checked ~ .selector { display: none; }

  #c-3-2:checked ~ #c-4-1:checked ~ .reset { display: block; }
  #c-3-2:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-3-2:checked ~ #c-4-2:checked ~ .found-6 { display: block; }
  #c-3-2:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-3-2:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-3-2:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 3-3 */
  #c-3-3:checked ~ #c-4-1:checked ~ .reset { display: block; }
  #c-3-3:checked ~ #c-4-1:checked ~ .selector { display: none; }
  #c-3-3:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-3-3:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-3-3:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-3-3:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 4-1 */
  #c-4-1:checked ~ #c-4-2:checked ~ .reset { display: block; }
  #c-4-1:checked ~ #c-4-2:checked ~ .selector { display: none; }
  #c-4-1:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-4-1:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* cell 4-2 */
  #c-4-2:checked ~ #c-4-3:checked ~ .reset { display: block; }
  #c-4-2:checked ~ #c-4-3:checked ~ .selector { display: none; }

  /* handling found reset */
  #found-1:checked ~ form #c-1-1:checked ~ .found-1 { display: none; }
  #found-1:checked ~ form #c-1-1:checked ~ .reset-1 { display: block; }

  #found-2:checked ~ form #c-1-2:checked ~ .found-2 { display: none; }
  #found-2:checked ~ form #c-1-2:checked ~ .reset-2 { display: block; }

  #found-3:checked ~ form #c-2-2:checked ~ .found-3 { display: none; }
  #found-3:checked ~ form #c-2-2:checked ~ .reset-3 { display: block; }

  #found-4:checked ~ form #c-1-3:checked ~ .found-4 { display: none; }
  #found-4:checked ~ form #c-1-3:checked ~ .reset-4 { display: block; }

  #found-5:checked ~ form #c-2-1:checked ~ .found-5 { display: none; }
  #found-5:checked ~ form #c-2-1:checked ~ .reset-5 { display: block; }

  #found-6:checked ~ form #c-3-2:checked ~ .found-6 { display: none; }
  #found-6:checked ~ form #c-3-2:checked ~ .reset-6 { display: block; }

  #found-1:checked ~ #found-2:checked ~ #found-3:checked ~ #found-4:checked ~ #found-5:checked ~ #found-6:checked ~ form #win {
    display: block;
  }

  @media (max-width: 599px) {
    .c {
      height: 90px;
      width: 90px;
    }
    .card {
      width: 90px;
      height: 90px;
      padding: 20px;
      border: 1px solid #dddddd;
      border-radius: 20px;
      background: #fafafa;
    }
  }
</style>

<p style="text-align: center;">Wanna know more? Solve our memory game below! It's a CSS-only interactive email!</p>

<div class="memory-game-wrapper">
  <input id="found-1" type="checkbox" />
  <input id="found-2" type="checkbox" />
  <input id="found-3" type="checkbox" />
  <input id="found-4" type="checkbox" />
  <input id="found-5" type="checkbox" />
  <input id="found-6" type="checkbox" />
  
  <form>
    <input id="c-1-1" type="checkbox" />
    <input id="c-1-2" type="checkbox" />
    <input id="c-1-3" type="checkbox" />
    <input id="c-2-1" type="checkbox" />
    <input id="c-2-2" type="checkbox" />
    <input id="c-2-3" type="checkbox" />
    <input id="c-3-1" type="checkbox" />
    <input id="c-3-2" type="checkbox" />
    <input id="c-3-3" type="checkbox" />
    <input id="c-4-1" type="checkbox" />
    <input id="c-4-2" type="checkbox" />
    <input id="c-4-3" type="checkbox" />
    <input id="reset" type="reset" value="reset" />
    <table class="selector m">
      <tr>
        <td class="c"><label for="c-1-1" class="sl-1-1 label-1"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-1 si-1-1" src="/assets/card-palette.png"/></td>
        <td class="c"><label for="c-1-2" class="sl-1-2 label-2"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-2 si-1-2" src="/assets/card-editor.png"/></td>
        <td class="c"><label for="c-1-3" class="sl-1-3 label-4"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-4 si-1-3" src="/assets/card-broken-email.png"/></td>
      </tr>
      <tr>
        <td class="c"><label for="c-2-1" class="sl-2-1 label-5"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-5 si-2-1" src="/assets/card-puzzle.png"/></td>
        <td class="c"><label for="c-2-2" class="sl-2-2 label-3"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-3 si-2-2" src="/assets/card-chart.png"/></td>
        <td class="c"><label for="c-2-3" class="sl-2-3 label-5"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-5 si-2-3" src="/assets/card-puzzle.png"/></td>
      </tr>
      <tr>
        <td class="c"><label for="c-3-1" class="sl-3-1 label-1"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-1 si-3-1" src="/assets/card-palette.png"/></td>
        <td class="c"><label for="c-3-2" class="sl-3-2 label-6"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-6 si-3-2" src="/assets/card-mailbox.png"/></td>
        <td class="c"><label for="c-3-3" class="sl-3-3 label-4"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-4 si-3-3" src="/assets/card-broken-email.png"/></td>
      </tr>
      <tr>
        <td class="c"><label for="c-4-1" class="sl-4-1 label-3"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-3 si-4-1" src="/assets/card-chart.png"/></td>
        <td class="c"><label for="c-4-2" class="sl-4-2 label-6"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-6 si-4-2" src="/assets/card-mailbox.png"/></td>
        <td class="c"><label for="c-4-3" class="sl-4-3 label-2"><img class="card card-back" src="/assets/bluefoxemail-logo3.png"/></label><img class="card card-2 si-4-3" src="/assets/card-editor.png"/></td>
      </tr>
    </table>
    <label class="reset m" for="reset">
      <table>
        <tr>
          <td class="c"><img class="sl-1-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-1-1" src="/assets/card-palette.png"/></td>
          <td class="c"><img class="sl-1-2 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-1-2" src="/assets/card-editor.png"/></td>
          <td class="c"><img class="sl-1-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-1-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td class="c"><img class="sl-2-1 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-1" src="/assets/card-puzzle.png"/></td>
          <td class="c"><img class="sl-2-2 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-2-2" src="/assets/card-chart.png"/></td>
          <td class="c"><img class="sl-2-3 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-3" src="/assets/card-puzzle.png"/></td>
        </tr>
        <tr>
          <td class="c"><img class="sl-3-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-3-1" src="/assets/card-palette.png"/></td>
          <td class="c"><img class="sl-3-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-3-2" src="/assets/card-mailbox.png"/></td>
          <td class="c"><img class="sl-3-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-3-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td class="c"><img class="sl-4-1 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-4-1" src="/assets/card-chart.png"/></td>
          <td class="c"><img class="sl-4-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-4-2" src="/assets/card-mailbox.png"/></td>
          <td class="c"><img class="sl-4-3 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-4-3" src="/assets/card-editor.png"/></td>
        </tr>
      </table>
    </label>
    <label class="found-1 m" for="found-1">
      <table>
        <tr>
          <td class="c"><img class="sl-1-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-1-1" src="/assets/card-palette.png"/></td>
          <td class="c"><img class="sl-1-2 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-1-2" src="/assets/card-editor.png"/></td>
          <td class="c"><img class="sl-1-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-1-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td class="c"><img class="sl-2-1 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-1" src="/assets/card-puzzle.png"/></td>
          <td class="c"><img class="sl-2-2 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-2-2" src="/assets/card-chart.png"/></td>
          <td class="c"><img class="sl-2-3 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-3" src="/assets/card-puzzle.png"/></td>
        </tr>
        <tr>
          <td class="c"><img class="sl-3-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-3-1" src="/assets/card-palette.png"/></td>
          <td class="c"><img class="sl-3-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-3-2" src="/assets/card-mailbox.png"/></td>
          <td class="c"><img class="sl-3-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-3-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td class="c"><img class="sl-4-1 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-4-1" src="/assets/card-chart.png"/></td>
          <td class="c"><img class="sl-4-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-4-2" src="/assets/card-mailbox.png"/></td>
          <td class="c"><img class="sl-4-3 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-4-3" src="/assets/card-editor.png"/></td>
        </tr>
      </table>
    </label>
    <label class="reset-1" for="reset">
      <div>Found:</div>
      <img class="card" src="/assets/card-palette.png"/>
      Design systems
    </label>
    <label class="found-2 m" for="found-2">
      <table>
        <tr>
          <td><img class="sl-1-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-1-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-1-2 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-1-2" src="/assets/card-editor.png"/></td>
          <td><img class="sl-1-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-1-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-2-1 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-1" src="/assets/card-puzzle.png"/></td>
          <td><img class="sl-2-2 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-2-2" src="/assets/card-chart.png"/></td>
          <td><img class="sl-2-3 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-3" src="/assets/card-puzzle.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-3-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-3-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-3-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-3-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-3-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-3-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-4-1 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-4-1" src="/assets/card-chart.png"/></td>
          <td><img class="sl-4-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-4-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-4-3 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-4-3" src="/assets/card-editor.png"/></td>
        </tr>
      </table>
    </label>
    <label class="reset-2" for="reset">
      <div>Found:</div>
      <img class="card" src="/assets/card-editor.png"/>
      Pixel perfect email designs with the best email editor!
    </label>
    <label class="found-3 m" for="found-3">
      <table>
        <tr>
          <td><img class="sl-1-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-1-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-1-2 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-1-2" src="/assets/card-editor.png"/></td>
          <td><img class="sl-1-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-1-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-2-1 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-1" src="/assets/card-puzzle.png"/></td>
          <td><img class="sl-2-2 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-2-2" src="/assets/card-chart.png"/></td>
          <td><img class="sl-2-3 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-3" src="/assets/card-puzzle.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-3-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-3-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-3-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-3-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-3-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-3-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-4-1 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-4-1" src="/assets/card-chart.png"/></td>
          <td><img class="sl-4-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-4-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-4-3 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-4-3" src="/assets/card-editor.png"/></td>
        </tr>
      </table>
    </label>
    <label class="reset-3" for="reset">
      <div>Found:</div>
      <img class="card" src="/assets/card-chart.png"/>
      Analytics, subscription preferences page.
    </label>
    <label class="found-4 m" for="found-4">
      <table>
        <tr>
          <td><img class="sl-1-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-1-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-1-2 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-1-2" src="/assets/card-editor.png"/></td>
          <td><img class="sl-1-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-1-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-2-1 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-1" src="/assets/card-puzzle.png"/></td>
          <td><img class="sl-2-2 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-2-2" src="/assets/card-chart.png"/></td>
          <td><img class="sl-2-3 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-3" src="/assets/card-puzzle.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-3-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-3-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-3-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-3-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-3-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-3-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-4-1 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-4-1" src="/assets/card-chart.png"/></td>
          <td><img class="sl-4-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-4-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-4-3 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-4-3" src="/assets/card-editor.png"/></td>
        </tr>
      </table>
    </label>
    <label class="reset-4" for="reset">
      <div>Found:</div>
      <img class="card" src="/assets/card-broken-email.png"/>
      No more rendering issues!
    </label>
    <label class="found-5 m" for="found-5">
      <table>
        <tr>
          <td><img class="sl-1-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-1-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-1-2 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-1-2" src="/assets/card-editor.png"/></td>
          <td><img class="sl-1-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-1-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-2-1 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-1" src="/assets/card-puzzle.png"/></td>
          <td><img class="sl-2-2 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-2-2" src="/assets/card-chart.png"/></td>
          <td><img class="sl-2-3 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-3" src="/assets/card-puzzle.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-3-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-3-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-3-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-3-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-3-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-3-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-4-1 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-4-1" src="/assets/card-chart.png"/></td>
          <td><img class="sl-4-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-4-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-4-3 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-4-3" src="/assets/card-editor.png"/></td>
        </tr>
      </table>
    </label>
    <label class="reset-5" for="reset">
      <div>Found:</div>
      <img class="card" src="/assets/card-puzzle.png"/>
      Easy integrations
    </label>
    <label class="found-6 m" for="found-6">
      <table>
        <tr>
          <td><img class="sl-1-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-1-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-1-2 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-1-2" src="/assets/card-editor.png"/></td>
          <td><img class="sl-1-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-1-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-2-1 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-1" src="/assets/card-puzzle.png"/></td>
          <td><img class="sl-2-2 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-2-2" src="/assets/card-chart.png"/></td>
          <td><img class="sl-2-3 card label-5 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-5 si-2-3" src="/assets/card-puzzle.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-3-1 card label-1 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-1 si-3-1" src="/assets/card-palette.png"/></td>
          <td><img class="sl-3-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-3-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-3-3 card label-4 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-4 si-3-3" src="/assets/card-broken-email.png"/></td>
        </tr>
        <tr>
          <td><img class="sl-4-1 card label-3 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-3 si-4-1" src="/assets/card-chart.png"/></td>
          <td><img class="sl-4-2 card label-6 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-6 si-4-2" src="/assets/card-mailbox.png"/></td>
          <td><img class="sl-4-3 card label-2 card-back" src="/assets/bluefoxemail-logo3.png"/><img class="card card-2 si-4-3" src="/assets/card-editor.png"/></td>
        </tr>
      </table>
    </label>
    <label class="reset-6" for="reset">
      <div>Found:</div>
      <img class="card" src="/assets/card-mailbox.png"/>
    </label>
    <div id="win">
      <div class="win-card">
        <p><strong>Congrats! You won!</strong></p><p>Why don't you sign up or do the memory game again?</p>
        <div class="win-card-actions">
          <a class="VPButton medium brand" href="https://app.bluefox.email/accounts/create-account" target="_blank" rel="noreferrer">Sign up</a>
          <a class="VPButton medium alt" href="#" style="margin-left: 20px" @click="resetGame()">Restart</a>
        </div>
      </div>
    </div>
  </form>
</div>
