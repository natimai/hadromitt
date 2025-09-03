import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin, Clock, Accessibility, Youtube, Video, Heart, Code, Shield, FileText, Scale, Cookie, Settings, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { CookieSettings } from './CookieSettings';

export function Footer() {
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };



  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-[#1A0000] via-[#2A0000] to-black text-white overflow-hidden"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image with parallax effect */}
        <motion.div
          initial={{ opacity: 0.08, scale: 1.1 }}
          animate={{
            opacity: [0.08, 0.12, 0.08],
            scale: [1.1, 1.05, 1.1],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0 bg-[url('/gallery/BarAharon-3131 Large.jpeg')] bg-cover bg-center"
        />
        
        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0000]/95 via-[#2A0000]/90 to-black/98" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0000]/60 via-transparent to-[#1A0000]/60" />
        
        {/* Animated geometric patterns */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(255,0,0,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,100,100,0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,100,100,0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(255,0,0,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,100,100,0.05) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/6 w-1 h-1 bg-[#FF0000]/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white/40 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#FF6666]/20 rounded-full"
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.8, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: 4
            }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description - Enhanced */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-6 md:col-span-1">
            <Link to="/">
              <motion.div className="relative inline-block group">
                {/* Multi-layer glow effects */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-[#FF0000]/30 via-[#FF6666]/20 to-[#FF0000]/30 rounded-full blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-white/20 to-[#FF0000]/40 rounded-full blur-lg"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1.1, 0.9, 1.1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Logo container with glass effect */}
                <motion.div className="relative p-4 bg-gradient-to-br from-white/10 via-black/20 to-black/30 backdrop-blur-xl rounded-2xl border border-white/20 group-hover:border-[#FF0000]/40 transition-all duration-500">
                  <motion.img
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      filter: "brightness(1.2) drop-shadow(0_0_20px_rgba(255,0,0,0.6))"
                    }}
                    src="/logo.svg"
                    alt="הדרומית - מסעדה מומלצת בבאר שבע"
                    className="relative h-16 mx-auto md:mr-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  />
                  
                  {/* Sparkle effects */}
                  <motion.div
                    className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-[#FF6666] rounded-full"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1
                    }}
                  />
                </motion.div>
              </motion.div>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3"
            >
              <motion.p 
                className="text-gray-200 text-lg leading-relaxed font-medium"
                animate={{
                  color: ["rgb(229, 231, 235)", "rgb(248, 250, 252)", "rgb(229, 231, 235)"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                מסעדה מומלצת בבאר שבע
              </motion.p>
              <p className="text-gray-300 text-base leading-relaxed">
                חוויה קולינרית מיוחדת עם בשרים כשר חלק איכותיים
              </p>
            </motion.div>
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  {/* Glowing background */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-[#FF0000]/20 to-[#FF6666]/20 rounded-xl blur-lg"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="relative bg-gradient-to-br from-white/10 via-black/20 to-black/30 backdrop-blur-xl rounded-xl p-3 border border-white/20 group-hover:border-[#FF0000]/50 transition-all duration-500 flex flex-col items-center">
                    <motion.img 
                      src="/039-kosher.svg" 
                      alt="תעודת כשרות חלק" 
                      className="h-12 w-auto object-contain"
                      animate={{
                        filter: [
                          "brightness(1) saturate(1)",
                          "brightness(1.1) saturate(1.2)",
                          "brightness(1) saturate(1)"
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.span 
                      className="mt-2 text-xs font-medium"
                      animate={{
                        color: ["rgb(156, 163, 175)", "rgb(229, 231, 235)", "rgb(156, 163, 175)"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      כשר חלק
                    </motion.span>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  {/* Glowing background */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl blur-lg"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  />
                  
                  <div className="relative bg-gradient-to-br from-white/10 via-black/20 to-black/30 backdrop-blur-xl rounded-xl p-3 border border-white/20 group-hover:border-blue-400/50 transition-all duration-500 flex flex-col items-center">
                    <motion.img 
                      src="/people-wheelchair.svg" 
                      alt="נגיש לנכים" 
                      className="h-12 w-auto object-contain"
                      animate={{
                        filter: [
                          "brightness(1) saturate(1)",
                          "brightness(1.1) saturate(1.1)",
                          "brightness(1) saturate(1)"
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                      }}
                    />
                    <motion.span 
                      className="mt-2 text-xs font-medium"
                      animate={{
                        color: ["rgb(156, 163, 175)", "rgb(147, 197, 253)", "rgb(156, 163, 175)"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    >
                      נגיש לנכים
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info - Enhanced */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-6 md:col-span-1">
            <motion.h3 
              className="text-xl font-semibold mb-6 relative"
              animate={{
                color: ["rgb(255, 0, 0)", "rgb(255, 102, 102)", "rgb(255, 0, 0)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              פרטי התקשרות
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF0000] to-transparent"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.h3>
            
            <motion.div className="space-y-5">
              <motion.a
                href="tel:0796744711"
                whileHover={{ 
                  scale: 1.08, 
                  x: [0, 3, -3, 3, -3, 0],
                  boxShadow: "0_8px_25px_-8px_rgba(255,0,0,0.4)"
                }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center justify-center md:justify-end group p-3 rounded-xl bg-gradient-to-r from-white/5 to-black/20 backdrop-blur-sm border border-white/10 hover:border-[#FF0000]/30 transition-all duration-300"
              >
                {/* Background glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <Phone size={22} className="ml-3 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium relative z-10">079-674-4711</span>
              </motion.a>
              
              <motion.a
                href="tel:0507557055"
                whileHover={{ 
                  scale: 1.08, 
                  x: [0, 3, -3, 3, -3, 0],
                  boxShadow: "0_8px_25px_-8px_rgba(255,0,0,0.4)"
                }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center justify-center md:justify-end group p-3 rounded-xl bg-gradient-to-r from-white/5 to-black/20 backdrop-blur-sm border border-white/10 hover:border-[#FF0000]/30 transition-all duration-300"
              >
                {/* Background glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <Truck size={22} className="ml-3 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium relative z-10">הדרומית עד הבית: 050-7557055</span>
              </motion.a>
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0_8px_25px_-8px_rgba(255,0,0,0.3)"
                }}
                className="relative flex items-center justify-center md:justify-end group p-3 rounded-xl bg-gradient-to-r from-white/5 to-black/20 backdrop-blur-sm border border-white/10 hover:border-[#FF0000]/30 transition-all duration-300"
              >
                {/* Background glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <MapPin size={22} className="ml-3 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10 flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium relative z-10 text-right">רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</span>
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0_8px_25px_-8px_rgba(255,0,0,0.3)"
                }}
                className="relative flex items-start justify-center md:justify-end group p-3 rounded-xl bg-gradient-to-r from-white/5 to-black/20 backdrop-blur-sm border border-white/10 hover:border-[#FF0000]/30 transition-all duration-300"
              >
                {/* Background glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <Clock size={22} className="ml-3 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10 flex-shrink-0 mt-1" />
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium relative z-10 text-right space-y-1">
                  <div>א'-ד': 12:00-23:00</div>
                  <div>ה': 12:00-00:00</div>
                  <div>מוצ"ש: שעה לאחר צאת השבת עד 00:00</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Social Links - Enhanced */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-6 md:col-span-1">
            <motion.h3 
              className="text-xl font-semibold mb-6 relative"
              animate={{
                color: ["rgb(255, 0, 0)", "rgb(255, 102, 102)", "rgb(255, 0, 0)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              עקבו אחרינו
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF0000] to-transparent"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.h3>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-5">
              <motion.a
                href="https://www.instagram.com/hadromit/?hl=he"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, rotate: 15, y: -8 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
                aria-label="עקבו אחרינו באינסטגרם"
              >
                {/* Multi-layer glow */}
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-xl"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#FF0000]/40 to-pink-500/40 rounded-full blur-md opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative p-4 bg-gradient-to-br from-white/10 via-black/20 to-black/30 backdrop-blur-xl rounded-full border border-white/20 group-hover:border-pink-400/50 transition-all duration-500">
                  <Instagram size={26} className="relative text-[#FF0000] group-hover:text-pink-300 transition-colors duration-300" />
                </div>
              </motion.a>
              
              <motion.a
                href="https://www.facebook.com/hadromit/?locale=he_IL"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, rotate: -15, y: -8 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
                aria-label="עקבו אחרינו בפייסבוק"
              >
                {/* Multi-layer glow */}
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-full blur-xl"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [360, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#FF0000]/40 to-blue-500/40 rounded-full blur-md opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative p-4 bg-gradient-to-br from-white/10 via-black/20 to-black/30 backdrop-blur-xl rounded-full border border-white/20 group-hover:border-blue-400/50 transition-all duration-500">
                  <Facebook size={26} className="relative text-[#FF0000] group-hover:text-blue-300 transition-colors duration-300" />
                </div>
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@Hadromit_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, rotate: 15, y: -8 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
                aria-label="הצטרפו אלינו ביוטיוב"
              >
                {/* Multi-layer glow */}
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-full blur-xl"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#FF0000]/40 to-red-500/40 rounded-full blur-md opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative p-4 bg-gradient-to-br from-white/10 via-black/20 to-black/30 backdrop-blur-xl rounded-full border border-white/20 group-hover:border-red-400/50 transition-all duration-500">
                  <Youtube size={26} className="relative text-[#FF0000] group-hover:text-red-300 transition-colors duration-300" />
                </div>
              </motion.a>
              
              <motion.a
                href="https://www.tiktok.com/@hadromit_?lang=he-IL"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, rotate: -15, y: -8 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
                aria-label="עקבו אחרינו בטיקטוק"
              >
                {/* Multi-layer glow */}
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-gray-800/30 to-black/30 rounded-full blur-xl"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [360, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#FF0000]/40 to-gray-600/40 rounded-full blur-md opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative p-4 bg-gradient-to-br from-white/10 via-black/20 to-black/30 backdrop-blur-xl rounded-full border border-white/20 group-hover:border-gray-400/50 transition-all duration-500">
                  <Video size={26} className="relative text-[#FF0000] group-hover:text-gray-300 transition-colors duration-300" />
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Legal Links - Enhanced */}
          <motion.div variants={itemVariants} className="text-center md:text-right space-y-6 md:col-span-1">
            <motion.h3 
              className="text-xl font-semibold mb-6 relative"
              animate={{
                color: ["rgb(255, 0, 0)", "rgb(255, 102, 102)", "rgb(255, 0, 0)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              מידע נוסף
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF0000] to-transparent"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </motion.h3>
            
            <div className="flex flex-col items-center md:items-end space-y-4">
              <motion.div whileHover={{ scale: 1.05, x: -3 }} className="w-fit">
              <Link 
                to="/accessibility"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group p-2 rounded-lg hover:bg-white/5"
              >
                  <Accessibility className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium">הצהרת נגישות</span>
              </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, x: -3 }} className="w-fit">
              <Link 
                to="/privacy"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group p-2 rounded-lg hover:bg-white/5"
              >
                  <Shield className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium">מדיניות פרטיות</span>
              </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, x: -3 }} className="w-fit">
              <Link 
                to="/terms"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group p-2 rounded-lg hover:bg-white/5"
              >
                  <Scale className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium">תנאי שימוש</span>
              </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, x: -3 }} className="w-fit">
              <Link 
                to="/cookies"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group p-2 rounded-lg hover:bg-white/5"
              >
                  <Cookie className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium">מדיניות עוגיות</span>
              </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, x: -3 }} className="w-fit">
                <button
                  onClick={() => setIsCookieSettingsOpen(true)}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group p-2 rounded-lg hover:bg-white/5"
                >
                  <Settings className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium">הגדרות עוגיות</span>
                </button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, x: -3 }} className="w-fit">
              <Link 
                to="/catering"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group p-2 rounded-lg hover:bg-white/5"
              >
                  <Truck className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium">הדרומית עד הבית</span>
              </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, x: -3 }} className="w-fit">
              <Link 
                to="/sitemap"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group p-2 rounded-lg hover:bg-white/5"
              >
                  <FileText className="w-5 h-5 text-[#FF0000] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span className="font-medium">מפת האתר</span>
              </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative mt-12 pt-8 border-t border-[#1A0000] text-center space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} הדרומית. כל הזכויות שמורות.
            </div>
            <div className="text-gray-400 text-sm">
              רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע | טל: 079-674-4711
            </div>
          </div>
          <motion.div 
            className="flex items-center justify-center gap-2 text-sm text-gray-500"
            whileHover={{ scale: 1.05 }}
          >
            <span>נבנה באהבה</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                transition: { duration: 1, repeat: Infinity }
              }}
            >
              <Heart size={16} className="text-[#FF0000]" />
            </motion.div>
            <span>על ידי</span>
            <a 
              href="https://nati-maimon.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FF0000] hover:text-white transition-colors duration-300 flex items-center gap-1"
            >
              <Code size={16} />
              <span>נתי מימון</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <CookieSettings 
        isOpen={isCookieSettingsOpen} 
        onClose={() => setIsCookieSettingsOpen(false)} 
      />
    </motion.footer>
  );
}