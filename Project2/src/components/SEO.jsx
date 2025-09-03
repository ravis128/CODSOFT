import React, { useEffect } from 'react';

const setOrUpdateMeta = (name, content, attr = 'name') => {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const removePrevJsonLd = (id) => {
  const prev = document.getElementById(id);
  if (prev && prev.parentNode) {
    prev.parentNode.removeChild(prev);
  }
};

const SEO = ({ title, description, canonical, ogImage, jsonLd, noindex = false }) => {
  useEffect(() => {
    if (title) document.title = title;
    setOrUpdateMeta('description', description);
    setOrUpdateMeta('og:title', title, 'property');
    setOrUpdateMeta('og:description', description, 'property');
    if (ogImage) setOrUpdateMeta('og:image', ogImage, 'property');
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
    setOrUpdateMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow');

    // JSON-LD
    const scriptId = 'seo-jsonld';
    removePrevJsonLd(scriptId);
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, ogImage, JSON.stringify(jsonLd), noindex]);

  return null;
};

export default SEO;



