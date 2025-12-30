import { motion } from 'framer-motion';
import { Star, ExternalLink, MessageCircle } from 'lucide-react';

export function ReviewPlatforms(): JSX.Element {
  const platforms = [
    {
      name: 'Google',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ),
      url: 'https://www.google.com/search?q=%D7%94%D7%93%D7%A8%D7%95%D7%9E%D7%99%D7%AA+%D7%91%D7%90%D7%A8+%D7%A9%D7%91%D7%A2',
      rating: 4.8,
      reviews: '500+',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://www.facebook.com/hadromit/?locale=he_IL',
      rating: 4.9,
      reviews: '300+',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      url: 'https://wa.me/972796744711?text=%D7%A9%D7%9C%D7%95%D7%9D,%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%9E%D7%A7%D7%95%D7%9D',
      rating: null,
      reviews: 'צור קשר',
      color: 'from-green-500 to-green-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-[#1A0000] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF0000] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF0000] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            מה הלקוחות שלנו אומרים?
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            אנחנו גאים בביקורות המצוינות שלנו ברחבי הרשת
          </p>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-[#FF0000]/20 px-6 py-3 rounded-full backdrop-blur-sm">
              <Star className="w-6 h-6 text-[#FF0000] fill-[#FF0000]" />
              <span className="text-white text-xl font-bold">4.8</span>
              <span className="text-gray-300">ממוצע ביקורות</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <MessageCircle className="w-6 h-6 text-[#FF0000]" />
              <span className="text-white text-xl font-bold">800+</span>
              <span className="text-gray-300">ביקורות</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:border-[#FF0000]/50 transition-all duration-300 overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className={`p-4 bg-gradient-to-br ${platform.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <div className="text-white">
                      {platform.icon}
                    </div>
                  </div>
                </div>

                {/* Platform name */}
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  {platform.name}
                </h3>

                {/* Rating */}
                {platform.rating && (
                  <div className="flex justify-center items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(platform.rating!)
                              ? 'text-[#FF0000] fill-[#FF0000]'
                              : 'text-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-bold text-xl">{platform.rating}</span>
                  </div>
                )}

                {/* Reviews count */}
                <p className="text-gray-300 text-center mb-6">
                  {platform.reviews} {platform.rating ? 'ביקורות' : ''}
                </p>

                {/* CTA Button */}
                <div className="flex items-center justify-center gap-2 text-[#FF0000] group-hover:text-white transition-colors duration-300">
                  <span className="font-semibold">
                    {platform.rating ? 'צפה בביקורות' : 'שלח הודעה'}
                  </span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform duration-300" />
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF0000]/10 rounded-bl-full"></div>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 text-lg mb-6">
            נהנת מהחוויה שלך אצלנו?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300"
            onClick={() => window.open('https://www.google.com/search?q=%D7%94%D7%93%D7%A8%D7%95%D7%9E%D7%99%D7%AA+%D7%91%D7%90%D7%A8+%D7%A9%D7%91%D7%A2', '_blank')}
          >
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 fill-white" />
              <span>תן לנו ביקורת</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
