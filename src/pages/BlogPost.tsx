import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, MapPin, Flame, Phone, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from './blogData';
import { SocialShare } from '../components/SocialShare';
import { SEO } from '../components/SEO';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_OUTDOOR_EVENTS } from '../utils/constants';

function renderInlineContent(text: string): React.ReactNode {
  // Regex that captures [text](url), **bold**, and *italic*
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, anchor, href] = linkMatch;
      const isExternal = href.startsWith('http');
      return (
        <a
          key={index}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-brand hover:text-brand-light underline font-bold decoration-brand/60 hover:decoration-brand transition-colors inline-block"
        >
          {anchor}
        </a>
      );
    }

    // Bold: **text**
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-bold text-white">
          {boldMatch[1]}
        </strong>
      );
    }

    // Italic: *text*
    const italicMatch = part.match(/^\*(.*?)\*$/);
    if (italicMatch) {
      return (
        <em key={index} className="italic text-gray-300">
          {italicMatch[1]}
        </em>
      );
    }

    return part;
  });
}

function renderContentItem(paragraph: string, pIndex: number): React.ReactNode {
  // Markdown Table
  if (paragraph.includes('|') && paragraph.includes('\n')) {
    const lines = paragraph.trim().split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length >= 2 && lines.some((l) => l.includes('---'))) {
      const headerLine = lines[0];
      const dataLines = lines.slice(2);
      const cleanRow = (rowStr: string) => {
        const cells = rowStr.split('|').map((c) => c.trim());
        if (cells.length > 0 && cells[0] === '') cells.shift();
        if (cells.length > 0 && cells[cells.length - 1] === '') cells.pop();
        return cells;
      };

      const headers = cleanRow(headerLine);
      const rows = dataLines.map(cleanRow);

      return (
        <div key={pIndex} className="overflow-x-auto my-6 rounded-2xl border border-white/10 shadow-xl bg-black/40">
          <table className="w-full text-right border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-brand/20 border-b border-white/15 text-white">
                {headers.map((h, i) => (
                  <th key={i} className="p-3.5 sm:p-4 font-bold text-white whitespace-nowrap">
                    {renderInlineContent(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white/[0.04] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3.5 sm:p-4 text-gray-200">
                      {renderInlineContent(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  // Heading 3: ### Heading
  if (paragraph.startsWith('### ')) {
    return (
      <h3
        key={pIndex}
        className="font-display text-xl sm:text-2xl font-bold text-white pt-6 pb-2 border-r-4 border-brand pr-3 flex items-center gap-2"
      >
        {renderInlineContent(paragraph.slice(4))}
      </h3>
    );
  }

  // Numbered list item: 1. Text
  const numMatch = paragraph.match(/^(\d+)\.\s+(.*)$/);
  if (numMatch) {
    const [, num, itemContent] = numMatch;
    return (
      <div key={pIndex} className="flex items-start gap-3 my-2 pr-1">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/20 border border-brand/40 text-brand text-xs font-bold flex items-center justify-center mt-1 select-none">
          {num}
        </span>
        <p className="text-gray-200 text-base sm:text-lg leading-relaxed flex-1">
          {renderInlineContent(itemContent)}
        </p>
      </div>
    );
  }

  // Bullet list item: • or -
  if (paragraph.startsWith('• ') || paragraph.startsWith('- ')) {
    const itemContent = paragraph.slice(2);
    return (
      <div key={pIndex} className="flex items-start gap-3 my-2 pr-1">
        <span className="text-brand text-xl leading-none mt-1 select-none font-bold">•</span>
        <p className="text-gray-200 text-base sm:text-lg leading-relaxed flex-1">
          {renderInlineContent(itemContent)}
        </p>
      </div>
    );
  }

  // Italic callout: starts and ends with * and has length > 2
  if (paragraph.startsWith('*') && paragraph.endsWith('*') && paragraph.length > 2 && !paragraph.slice(1, -1).includes('*')) {
    return (
      <p
        key={pIndex}
        className="text-gray-300 italic text-base sm:text-lg leading-relaxed border-r-4 border-brand/60 pr-4 my-4 py-3 bg-white/[0.02] rounded-l-2xl"
      >
        {renderInlineContent(paragraph.slice(1, -1))}
      </p>
    );
  }

  // Standard paragraph
  return (
    <p
      key={pIndex}
      className="text-gray-200 text-base sm:text-lg leading-relaxed"
    >
      {renderInlineContent(paragraph)}
    </p>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-28 bg-gradient-to-b from-[#1A0000] to-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">מאמר לא נמצא</h1>
          <p className="text-gray-400 mb-6">המאמר שחיפשתם הועבר או שאינו קיים.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-colors"
          >
            חזרה לבלוג
          </Link>
        </div>
      </div>
    );
  }

  // Related posts
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.category === 'קייטרינג ואירועי חוץ'))
    .slice(0, 3);

  // Check if post has FAQs to add FAQPage schema
  const faqSection = post.sections.find((s) => s.title?.includes('שאלות נפוצות'));
  let faqSchema: Record<string, unknown> | null = null;
  if (faqSection) {
    const qas: { question: string; answer: string }[] = [];
    for (let i = 0; i < faqSection.content.length; i++) {
      const line = faqSection.content[i];
      const qMatch = line.match(/^\*\*(.*?)\?\*\*/);
      if (qMatch && i + 1 < faqSection.content.length) {
        const question = qMatch[1] + '?';
        const answer = faqSection.content[i + 1].replace(/^\*/, '').replace(/\*$/, '');
        qas.push({ question, answer });
        i++;
      }
    }

    if (qas.length > 0) {
      faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: qas.map((qa) => ({
          '@type': 'Question',
          name: qa.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: qa.answer,
          },
        })),
      };
    }
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.image ? `https://www.hadromit.co.il${post.image}` : undefined,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Restaurant',
      name: 'מסעדת הדרומית',
      url: 'https://www.hadromit.co.il',
      telephone: '079-674-4711',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.hadromit.co.il/blog/${post.slug}`,
    },
  };

  const isOutdoorRelated =
    post.category === 'קייטרינג ואירועי חוץ' ||
    post.slug.includes('outdoor') ||
    post.slug.includes('asado') ||
    post.slug.includes('grillman') ||
    post.slug.includes('meat');

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#1A0000] via-[#110000] to-black text-white">
      <SEO
        title={`${post.title} | הדרומית`}
        description={post.metaDescription || post.excerpt}
        keywords={post.metaKeywords || (post.tags ? post.tags.join(', ') : '')}
        canonicalUrl={`/blog/${post.slug}`}
        image={post.image}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb back */}
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>חזרה לבלוג הדרומית</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[45vh] sm:h-[55vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-brand text-white font-bold rounded-full text-xs">
                  {post.category}
                </span>
                {(post.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-black/60 backdrop-blur-md text-gray-200 rounded-full text-xs border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand" />
                  <span>{new Date(post.date).toLocaleDateString('he-IL')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand" />
                  <span>{post.author}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Share & Excerpt */}
        <div className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-medium mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-4">
            <span className="text-xs text-gray-400">שתפו את המאמר:</span>
            <SocialShare title={post.title} description={post.excerpt} />
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            {post.sections.map((section, index) => (
              <section key={index} className="bg-white/[0.03] rounded-3xl p-6 sm:p-8 border border-white/5">
                {section.title && (
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-5 text-brand">
                    {section.title}
                  </h2>
                )}
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) =>
                    renderContentItem(paragraph, pIndex)
                  )}
                </div>
                {section.image && (
                  <div className="relative rounded-2xl overflow-hidden my-6 border border-white/10">
                    <img
                      src={section.image}
                      alt={section.imageAlt || post.title}
                      loading="lazy"
                      className="w-full h-auto max-h-[480px] object-cover"
                    />
                    {section.imageCaption && (
                      <p className="text-xs sm:text-sm text-gray-400 mt-2 text-center p-2 bg-black/40">
                        {section.imageCaption}
                      </p>
                    )}
                  </div>
                )}
              </section>
            ))}

            {/* Contextual CTA Banner */}
            {isOutdoorRelated ? (
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand via-brand-dark to-brand-darker p-8 sm:p-10 text-white shadow-2xl">
                <div className="relative z-10 space-y-4 max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" />
                    אירועי חוץ · הדרומית מגיעה אליכם
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    רוצים משתה בשרים כזה אצלכם באירוע?
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    אנחנו מגיעים עם גרילים, מעשנות עצי אלון, נתחי אנטריקוט ואסאדו מיושנים כשר חלק למהדרין ישירות לשטח שלכם בדרום ובמרכז.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      to="/outdoor-events"
                      className="px-6 py-3.5 bg-white text-brand font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm"
                    >
                      לפרטים והרכבת תפריט בשרים
                    </Link>
                    <a
                      href={WHATSAPP_OUTDOOR_EVENTS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg text-sm"
                    >
                      וואטסאפ מהיר לגרילמן
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-3xl p-8 border border-white/10 text-center">
                <h3 className="font-display text-2xl font-bold mb-3">רוצים לחוות בעצמכם?</h3>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm sm:text-base">
                  בואו לבקר אותנו במסעדת הדרומית במתחם ישפרו סנטר בבאר שבע או הזמינו אירוע פרטי בחדרי ה-VIP.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>צור קשר והזמנות</span>
                  </Link>
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                  >
                    <span>לתפריט המסעדה המלא</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="pt-10 border-t border-white/10">
                <h3 className="font-display text-2xl font-bold text-white mb-6">
                  עוד מאמרים שיעניינו אתכם
                </h3>
                <div className="grid sm:grid-cols-3 gap-5">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.id}
                      to={`/blog/${rPost.slug}`}
                      className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-brand/30 transition-all flex flex-col"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={rPost.image}
                          alt={rPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <h4 className="font-display font-bold text-white group-hover:text-brand transition-colors line-clamp-2 text-sm mb-2">
                          {rPost.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                          <span>{rPost.readTime}</span>
                          <ChevronRight className="w-3.5 h-3.5 rotate-180 text-brand" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </article>
    </div>
  );
}