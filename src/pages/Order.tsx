import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, MapPin, Phone, Calendar, CheckCircle } from 'lucide-react';
import { gtagEvent } from '../utils/gtag';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export default function Order(): JSX.Element {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('takeaway');
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrderSubmit = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('אנא מלא את השדות הנדרשים');
      return;
    }

    gtagEvent('order_placed', 'conversion', 'order_system', {
      order_type: orderType,
      items_count: selectedItems.length,
      total_value: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });

    setOrderPlaced(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#1A0000] to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-6">
              <ShoppingCart className="w-16 h-16 text-[#FF0000]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              הזמנת מקום ומנות
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              הזמן מקום במסעדה או קח איתך את המנות האהובות שלך
            </p>
          </motion.div>

          {!orderPlaced ? (
            <>
              {/* Order Type Selection */}
              <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">סוג הזמנה</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setOrderType('dine-in')}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      orderType === 'dine-in'
                        ? 'border-[#FF0000] bg-[#FF0000]/20 text-white'
                        : 'border-gray-600 hover:border-[#FF0000] text-gray-300'
                    }`}
                  >
                    <Calendar className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-lg font-semibold">הזמנת מקום</div>
                    <div className="text-sm">אוכל במסעדה</div>
                  </button>

                  <button
                    onClick={() => setOrderType('takeaway')}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      orderType === 'takeaway'
                        ? 'border-[#FF0000] bg-[#FF0000]/20 text-white'
                        : 'border-gray-600 hover:border-[#FF0000] text-gray-300'
                    }`}
                  >
                    <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-lg font-semibold">איסוף עצמי</div>
                    <div className="text-sm">הזמנה ואיסוף מהמסעדה</div>
                  </button>

                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      orderType === 'delivery'
                        ? 'border-[#FF0000] bg-[#FF0000]/20 text-white'
                        : 'border-gray-600 hover:border-[#FF0000] text-gray-300'
                    }`}
                  >
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-lg font-semibold">משלוח</div>
                    <div className="text-sm">משלוח עד הבית</div>
                  </button>
                </div>
              </motion.div>

              {/* Customer Information */}
              <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">פרטים אישיים</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">שם מלא *</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:border-[#FF0000] focus:outline-none text-white"
                      placeholder="הכנס שם מלא"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">טלפון *</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:border-[#FF0000] focus:outline-none text-white"
                      placeholder="050-123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">אימייל</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:border-[#FF0000] focus:outline-none text-white"
                      placeholder="example@email.com"
                    />
                  </div>
                  {(orderType === 'delivery') && (
                    <div>
                      <label className="block text-sm font-medium mb-2">כתובת משלוח</label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:border-[#FF0000] focus:outline-none text-white"
                        placeholder="רחוב, עיר, מיקוד"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">הערות מיוחדות</label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:border-[#FF0000] focus:outline-none text-white resize-none"
                    rows={3}
                    placeholder="הערות על ההזמנה, אלרגיות, בקשות מיוחדות..."
                  />
                </div>
              </motion.div>

              {/* Order Summary & Submit */}
              <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-2">סיכום הזמנה</h3>
                    <p className="text-gray-300">
                      {orderType === 'dine-in' && 'הזמנת מקום במסעדה'}
                      {orderType === 'takeaway' && 'איסוף עצמי מהמסעדה'}
                      {orderType === 'delivery' && 'משלוח עד הבית'}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      אנחנו נחזור אליך תוך 30 דקות לאישור ההזמנה
                    </p>
                  </div>
                  <button
                    onClick={handleOrderSubmit}
                    className="bg-[#FF0000] hover:bg-[#CC0000] text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5" />
                    שלח הזמנה
                  </button>
                </div>
              </motion.div>
            </>
          ) : (
            /* Order Confirmation */
            <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">ההזמנה התקבלה בהצלחה!</h2>
              <p className="text-xl text-gray-300 mb-6">
                תודה על בחירתך במסעדת הדרומית
              </p>
              <div className="bg-black/30 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3">פרטי ההזמנה:</h3>
                <p className="text-gray-300"><strong>שם:</strong> {customerInfo.name}</p>
                <p className="text-gray-300"><strong>טלפון:</strong> {customerInfo.phone}</p>
                <p className="text-gray-300"><strong>סוג הזמנה:</strong> {
                  orderType === 'dine-in' ? 'הזמנת מקום' :
                  orderType === 'takeaway' ? 'איסוף עצמי' : 'משלוח'
                }</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>נחזור אליך תוך 30 דקות</span>
              </div>
            </motion.div>
          )}

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">זקוק לעזרה?</h2>
            <p className="text-gray-300 mb-4">
              יש לך שאלות? אנחנו כאן לעזור!
            </p>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                טלפון: 079-674-4711
              </p>
              <p className="text-gray-300">דוא"ל: info@hadromit.co.il</p>
              <p className="text-gray-300">כתובת: רח׳ צבי טאוב, מתחם ישפרו סנטר, באר-שבע</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
