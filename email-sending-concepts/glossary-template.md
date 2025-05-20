---
title: "Concept Name | BlueFox Email"
description: "Concise description of the concept."
thumbnail: /assets/glossary/concept-share.webp

layout: post
category: glossary
lastUpdated: true
published: 2025-05-19
sidebar: false

head:
  - - meta
    - name: description
      content: "Concise description of the concept."
  - - meta
    - property: og:title
      content: "Concept Name | BlueFox Email"
  - - meta
    - property: og:description
      content: "Concise description of the concept."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/concept-share.webp
  - - meta
    - property: og:url
      content: "https://bluefox.email/email-sending-concepts/concept-name"
  - - meta
    - name: twitter:card
      content: "summary_large_image"
  - - meta
    - name: twitter:title
      content: "Concept Name | BlueFox Email"
  - - meta
    - name: twitter:description
      content: "Concise description of the concept."
---

# Concept Name

<div class="page-nav">
  <div class="page-nav-title">On This Page</div>
  <div class="page-nav-items">
    <a href="#section-1">Section 1</a>
    <a href="#section-2">Section 2</a>
  </div>
</div>

<!-- Navigation script -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get all sections with IDs that match our navigation
  const sections = document.querySelectorAll('h2[id]');
  const navLinks = document.querySelectorAll('.page-nav-items a');
  
  // Handle smooth scrolling for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update active state manually on click
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
        
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Intersection Observer to detect which section is visible
  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -70% 0px',
    threshold: 0
  };
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = '#' + entry.target.id;
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
          if (navLink.getAttribute('href') === currentId) {
            navLink.classList.add('active');
          }
        });
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Set initial active state based on URL hash or first section
  if (window.location.hash) {
    const initialLink = document.querySelector(`.page-nav-items a[href="${window.location.hash}"]`);
    if (initialLink) {
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      initialLink.classList.add('active');
    }
  } else if (sections.length > 0 && navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }
});
</script>

<!-- Include the standard navigation styles -->
<style>
.page-nav {
  position: fixed;
  right: 1.5rem;
  top: 9rem;
  width: 12rem;
  border-left: 1px solid #e2e8f0;
  padding-left: 12px;
  font-size: 0.875rem;
  z-index: 10;
}

.dark .page-nav {
  border-left: 1px solid #2d3748;
}

.page-nav-title {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.75rem;
}

.page-nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.page-nav-items a {
  color: #64748b;
  text-decoration: none;
  padding: 3px 0;
  position: relative;
  transition: color 0.2s, transform 0.2s;
}

.page-nav-items a:hover {
  color: #13B0EE;
  transform: translateX(3px);
}

.page-nav-items a.active {
  color: #13B0EE;
  font-weight: 500;
  transform: translateX(3px);
}

.page-nav-items a:before {
  content: "";
  position: absolute;
  top: 0;
  left: -13px;
  width: 1px;
  height: 100%;
  background: transparent;
  transition: background-color 0.2s;
}

.page-nav-items a:hover:before {
  background-color: #13B0EE;
}

.page-nav-items a.active:before {
  background-color: #13B0EE;
  width: 2px;
}

/* Responsive adjustments */
@media (max-width: 1280px) {
  .page-nav {
    right: 0.5rem;
  }
}

/* Hide on small screens */
@media (max-width: 1024px) {
  .page-nav {
    display: none;
  }
}
</style>

Introduction text for the concept.

## <a id="section-1"></a>Section 1

Content for section 1.

## <a id="section-2"></a>Section 2

Content for section 2.

## <a id="related-concepts"></a>Related Concepts

- [Related Concept 1](/email-sending-concepts/related-concept-1)
- [Related Concept 2](/email-sending-concepts/related-concept-2)
