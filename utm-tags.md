---
title: UTM Bridge
description: Internal bridge page
layout: false
---

<div style="display:none"></div>

<script>
(function () {
  const appOrigin = import.meta.env.VITE_BLUEFOX_APP_URL
  if (typeof window === 'undefined') {
    return
  }
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? decodeURIComponent(match[2]) : null
  }
  const payload = JSON.parse(getCookie('utmTags') || '[]')
  window.parent.postMessage(
    { type: 'WEBSITE_COOKIE_STORAGE', payload: payload },
    appOrigin
  )
})()
</script>
