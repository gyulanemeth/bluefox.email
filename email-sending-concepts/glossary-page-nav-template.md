# Glossary Page Navigation Template

This file contains code for adding a simple, elegant "On This Page" navigation to glossary detail pages.

## How to Use

1. Copy the section below and paste it right after your main heading (# Title) in a glossary page
2. Update the links to match the heading IDs in your article
3. Make sure all your headings have proper ID attributes like `<a id="section-name"></a>`

```
<div class="page-nav">
  <div class="page-nav-title">On This Page</div>
  <div class="page-nav-items">
    <!-- Update these links to match your headings -->
    <a href="#section-1">Section 1</a>
    <a href="#section-2">Section 2</a>
    <a href="#section-3">Section 3</a>
    <a href="#section-4">Section 4</a>
    <a href="#section-5">Section 5</a>
  </div>
</div>

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

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get all section headings
  const headings = document.querySelectorAll('h2[id]');
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
        
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Highlight the active section during scroll
  window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    headings.forEach(heading => {
      if (heading.offsetTop <= scrollPosition) {
        current = '#' + heading.id;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Trigger scroll event once on load
  window.dispatchEvent(new Event('scroll'));
});
</script>
```

## Heading IDs

Remember to add ID attributes to all your headings that you want to link to from the navigation:

```
## <a id="section-name"></a>Your Section Title
```

## Custom Styling

You can customize the appearance by modifying the CSS in the style section.
