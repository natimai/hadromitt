import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, ArrowLeft, Star, ThumbsUp, MapPin } from 'lucide-react';
import { blogPosts } from './blogData';

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">מאמר לא נמצא</h1>
          <Link to="/blog" className="text-[#FF0000] hover:text-[#CC0000]">חזרה לבלוג</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[60vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000] via-[#1A0000]/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#FF0000]/10 text-[#FF0000] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(post.date).toLocaleDateString('he-IL')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {post.sections.map((section, index) => (
              <section key={index} className="mb-12">
                {section.title && (
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                )}
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
                {section.image && (
                  <div className="relative rounded-xl overflow-hidden my-8">
                    <img
                      src={section.image}
                      alt={section.imageAlt || post.title}
                      className="w-full h-auto"
                    />
                    {section.imageCaption && (
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        {section.imageCaption}
                      </p>
                    )}
                  </div>
                )}
              </section>
            ))}

            {/* Call to Action */}
            <div className="bg-white/5 rounded-xl p-6 mt-12">
              <h3 className="text-xl font-bold mb-4">רוצים לחוות בעצמכם?</h3>
              <p className="text-gray-300 mb-6">
                בואו לבקר אותנו במסעדת הדרומית ותגלו בעצמכם את החוויה המיוחדת שלנו.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  <span>צור קשר</span>
                </Link>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <span>לתפריט המלא</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#FF0000] hover:text-[#CC0000] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>חזרה לבלוג</span>
          </Link>
        </div>
      </article>
    </div>
  );
}