import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Search, Flame, ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';
import { blogPosts, BlogCategory } from './blogData';
import { SEO } from '../components/SEO';

const CATEGORIES: BlogCategory[] = [
  'הכל',
  'קייטרינג ואירועי חוץ',
  'מדריכי בשר וגריל',
  'אירועים במסעדה',
  'מאחורי הקלעים',
  'מדריכים וצרכנות'
];

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('הכל');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'הכל' || post.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(query))) ||
        (post.metaKeywords && post.metaKeywords.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    if (selectedCategory !== 'הכל' && selectedCategory !== 'קייטרינג ואירועי חוץ') {
      return null;
    }
    if (searchQuery.trim()) return null;
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, [selectedCategory, searchQuery]);

  const remainingPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#1A0000] via-[#120000] to-black text-white">
      <SEO
        title="בלוג בשרים, גריל ואירועי חוץ | מסעדת הדרומית"
        description="מדריכי בשרים מקיפים, סודות צלייה ועישון אסאדו, טיפים לקייטרינג בשרים לאירועי חוץ, גרילמן לשטח ומאחורי הקלעים של מסעדת הדרומית."
        keywords="קייטרינג בשרים לאירועי חוץ, בלוג בשרים, אסאדו לאירועים, גרילמן, נתחי בשר מיושנים, מדריכי בשר, מסעדת בשרים כשרה"
        canonicalUrl="/blog"
        image="/gallery/BarAharon-3565-2 Large.jpeg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-sm text-brand font-semibold mb-4">
            <Flame className="w-4 h-4 text-brand" />
            תרבות בשר, גריל ואירועים
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
            הבלוג הקולינרי של <span className="text-brand">הדרומית</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            סודות העישון והגריל, מדריכים מקצועיים לקייטרינג בשרים בשטח, חישוב כמויות וטיפים מהשפים שלנו.
          </p>
        </motion.div>

        {/* Search & Categories Bar */}
        <div className="space-y-6 mb-12">
          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש מאמר (למשל: אסאדו, גרילמן, אירועי חוץ, סטייק)..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pr-12 pl-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-brand transition-colors text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                נקה
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand text-white shadow-lg shadow-brand/30 scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-black/90 via-black/70 to-transparent border border-white/10 group">
              <div className="grid lg:grid-cols-12 gap-0 items-center">
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1A0000] via-transparent to-transparent opacity-90 lg:opacity-60" />
                </div>
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand text-white text-xs font-bold rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      כתבה מומלצת
                    </span>
                    <span className="text-xs text-brand font-medium">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-brand transition-colors leading-snug">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-5 text-xs text-gray-400 pt-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand" />
                      {new Date(featuredPost.date).toLocaleDateString('he-IL')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-brand" />
                      {featuredPost.author}
                    </span>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-dark transition-colors text-sm group-hover:translate-x-[-4px]"
                    >
                      <span>לקריאת המדריך המלא</span>
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {remainingPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white/5 rounded-3xl overflow-hidden hover:bg-white/10 border border-white/5 hover:border-brand/30 transition-all duration-300 flex flex-col justify-between"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md text-brand rounded-full text-xs font-semibold border border-white/10">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="font-display text-xl font-bold mb-3 text-white group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand" />
                          {new Date(post.date).toLocaleDateString('he-IL')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand" />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center justify-between text-brand text-sm font-semibold hover:text-white transition-colors"
                  >
                    <span>קרא עוד</span>
                    <ChevronRight className="w-4 h-4 rotate-180 group-hover:translate-x-[-4px] transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/5">
            <Flame className="w-12 h-12 text-brand mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-bold mb-2">לא נמצאו כתבות מתאימות</h3>
            <p className="text-gray-400 mb-6 text-sm">
              נסו לשנות את מילות החיפוש או לבחור קטגוריה אחרת
            </p>
            <button
              onClick={() => {
                setSelectedCategory('הכל');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-dark transition-colors"
            >
              הצג את כל הכתבות
            </button>
          </div>
        )}

        {/* Outdoor Catering Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand/20 via-brand/10 to-transparent border border-brand/30 p-8 sm:p-12 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand text-white rounded-full text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              הדרומית מגיעה אליכם
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white">
              מתכננים אירוע בשרים בטבע או בגינה?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              גרילמנים מקצועיים, מעשנות עצי אלון, נתחי אנטריקוט ואסאדו מיושנים כשר חלק. אנחנו מביאים את כל הציוד והבשרים ישירות לשטח שלכם.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/outdoor-events"
                className="btn-brand text-base py-3 px-6"
              >
                למידע והזמנת אירועי חוץ
              </Link>
              <Link
                to="/outdoor-events#quote"
                className="btn-outline-light text-base py-3 px-6"
              >
                קבלו הצעת מחיר מהירה
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}