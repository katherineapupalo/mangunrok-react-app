"use client"
import { Facebook, Instagram, Mail, MapPin, Menu as MenuIcon, Minus, Phone, Plus, ShoppingCart, Trash2, Twitter, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export default function MangunrokRestaurant() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const menuItems = {
    appetizers: [
      { name: 'Gyoza (Pork or Veggie)', price: 8 },
      { name: 'Spring Rolls (4 pcs)', price: 7 },
      { name: 'Edamame with Sea Salt', price: 6 },
      { name: 'Takoyaki (Octopus Balls)', price: 10 }
    ],
    mains: [
      { name: 'Tonkotsu Ramen', price: 16 },
      { name: 'Curry with Rice', price: 14 },
      { name: 'Korean BBQ Beef Bowl', price: 18 },
      { name: 'Teriyaki Salmon Bento', price: 20 }
    ],
    sushi: [
      { name: 'California Roll (8 pcs)', price: 12 },
      { name: 'Spicy Tuna Roll', price: 14 },
      { name: 'Dragon Roll', price: 16 },
      { name: 'Sashimi Platter', price: 22 }
    ]
  };

  const slides = [
    { img: 'https://images.unsplash.com/photo-1572830191837-0b705965d1a8?q=80&w=1548&auto=format&fit=crop', caption: 'Fresh Tonkotsu Ramen' },
    { img: 'https://images.unsplash.com/photo-1596463059283-da257325bab8?q=80&w=1740&auto=format&fit=crop', caption: 'Traditional Bento Boxes' },
    { img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1450&auto=format&fit=crop', caption: 'Premium Sushi Selection' },
    { img: 'https://images.unsplash.com/photo-1638502521795-89107ac5e246?q=80&w=1740&auto=format&fit=crop', caption: 'Handmade Dumplings' },
    { img: 'https://images.unsplash.com/photo-1746256856691-032ecff4240f?q=80&w=1740&auto=format&fit=crop', caption: 'Authentic Curry Rice' },
    { img: 'https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg', caption: 'Beautiful Interior' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const addToCart = (name: string, price: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === name);
      if (existing) {
        return prevCart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { name, price, quantity: 1 }];
    });
  };

  const updateQuantity = (index: number, change: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const item = newCart[index];
      if (!item) return prevCart;
      item.quantity += change;
      if (item.quantity <= 0) {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    if (cart.length > 0 && window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemsList = cart.map(item => `${item.name} (x${item.quantity})`).join('\n');
    alert(`Thank you for your order!\n\nItems:\n${itemsList}\n\nTotal: $${total.toFixed(2)}\n\nWe'll prepare your order shortly!`);
    setCart([]);
    setIsCartOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-stone-900 to-stone-800 border-b-4 border-red-700 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-2xl font-bold text-red-700">
              🏮 <span>Mangunrok</span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8">
              {['home', 'menu', 'about', 'contact'].map(item => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-amber-100 hover:text-red-700 font-medium transition-colors relative group"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-700 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-amber-100 hover:text-red-700 transition-all hover:scale-110"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-stone-900">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-red-700"
              >
                {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {['home', 'menu', 'about', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 text-amber-100 hover:bg-stone-700 hover:text-red-700 transition-colors"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Cart Modal */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setIsCartOpen(false)}
        >
          <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border-4 border-red-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-red-700">
              <h3 className="text-2xl font-bold text-stone-900">🛒 Your Cart</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-stone-900 hover:text-red-700 transition-all hover:rotate-90"
              >
                <X size={32} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                Your cart is empty. Add some delicious items!
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl border border-amber-200 shadow-md">
                      <div className="flex-1">
                        <div className="font-semibold text-stone-900">{item.name}</div>
                        <div className="text-red-700 font-bold">${item.price.toFixed(2)} each</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(index, -1)}
                            className="bg-stone-900 text-amber-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-all hover:scale-110"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold min-w-[30px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, 1)}
                            className="bg-stone-900 text-amber-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-all hover:scale-110"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-700 hover:text-red-900 transition-all hover:scale-125"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-xl p-4 mb-4 text-center">
                  <div className="text-amber-100 text-sm mb-1">Total Amount</div>
                  <div className="text-red-700 text-3xl font-bold">${totalPrice.toFixed(2)}</div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-3 border-2 border-stone-900 text-stone-900 font-semibold rounded-full hover:bg-stone-900 hover:text-amber-100 transition-all"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={checkout}
                    className="flex-1 py-3 bg-red-700 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all border-2 border-red-700"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-[550px] relative bg-cover bg-center flex items-center justify-center text-center text-amber-100 px-4 border-b-4 border-red-700"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.55), rgba(20, 12, 10, 0.55)), url('https://cdn.vox-cdn.com/uploads/chorus_asset/file/4269647/2015-11-12-roku-005.0.jpg')`
        }}
      >
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">
            Mangunrok Asian Bistro
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience Authentic Asian Flavors with a Modern Twist
          </p>
          <button
            onClick={() => scrollToSection('menu')}
            className="inline-block px-10 py-4 bg-gradient-to-r from-stone-900 to-stone-800 text-red-700 font-semibold text-lg rounded-full border-2 border-red-700 hover:bg-red-700 hover:text-stone-900 transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            Discover Menu
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-stone-900 mb-12">
          🍜 Our Menu 🍜
        </h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Appetizers */}
          <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 border-2 border-red-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all relative">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-stone-900 via-red-700 to-stone-900 rounded"></div>
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-6">🥟 Appetizers</h3>
            {menuItems.appetizers.map((item, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                  <span className="text-gray-800">{item.name}</span>
                  <span className="text-stone-900 font-bold text-lg">${item.price}</span>
                </div>
                <button
                  onClick={() => addToCart(item.name, item.price)}
                  className="w-full mt-2 py-2 bg-red-700 text-white font-semibold rounded-full hover:bg-stone-900 transition-all hover:-translate-y-1"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Main Dishes */}
          <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 border-2 border-red-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all relative">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-stone-900 via-red-700 to-stone-900 rounded"></div>
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-6">🍜 Main Dishes</h3>
            {menuItems.mains.map((item, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                  <span className="text-gray-800">{item.name}</span>
                  <span className="text-stone-900 font-bold text-lg">${item.price}</span>
                </div>
                <button
                  onClick={() => addToCart(item.name, item.price)}
                  className="w-full mt-2 py-2 bg-red-700 text-white font-semibold rounded-full hover:bg-stone-900 transition-all hover:-translate-y-1"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Sushi & Rolls */}
          <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 border-2 border-red-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all relative">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-stone-900 via-red-700 to-stone-900 rounded"></div>
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-6">🍱 Sushi & Rolls</h3>
            {menuItems.sushi.map((item, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                  <span className="text-gray-800">{item.name}</span>
                  <span className="text-stone-900 font-bold text-lg">${item.price}</span>
                </div>
                <button
                  onClick={() => addToCart(item.name, item.price)}
                  className="w-full mt-2 py-2 bg-red-700 text-white font-semibold rounded-full hover:bg-stone-900 transition-all hover:-translate-y-1"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-4 bg-amber-100">
        <h2 className="text-4xl font-bold text-center text-stone-900 mb-12">
          🏮 Gallery 🏮
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-red-700">
            <div className="relative h-[500px] bg-black">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    idx === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.img}
                    alt={slide.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 text-white text-2xl font-semibold text-center">
                    {slide.caption}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-amber-100 text-stone-900 rounded-full w-12 h-12 flex items-center justify-center border-2 border-red-700 hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
            >
              ◀
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-100 text-stone-900 rounded-full w-12 h-12 flex items-center justify-center border-2 border-red-700 hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
            >
              ▶
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full border-2 border-stone-900 transition-all ${
                  idx === currentSlide ? 'bg-red-700 scale-125' : 'bg-amber-200 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-stone-900 mb-12">
          🏮 Our Story 🏮
        </h2>
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-amber-50 rounded-3xl p-10 border-2 border-red-700 shadow-xl text-center text-lg leading-relaxed">
          <p className="mb-6">
            Welcome to Mangunrok, where traditional Asian cuisine meets contemporary dining. 
            Since 2016, we've been dedicated to bringing the authentic flavors of Japan, Korea, 
            and China to your table with a modern twist.
          </p>
          <p className="mb-6">
            Our chefs combine time-honored recipes with fresh, locally-sourced ingredients to 
            create dishes that honor tradition while embracing innovation. From our signature 
            Tonkotsu Ramen to our expertly crafted sushi rolls, every dish tells a story of 
            passion and precision.
          </p>
          <p>
            Step into our tranquil space adorned with traditional Asian décor, where the aroma 
            of fresh ingredients and the peaceful ambiance transport you to the heart of Asia. 
            Join us for an unforgettable culinary journey!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-amber-100">
        <h2 className="text-4xl font-bold text-center text-stone-900 mb-12">
          🏮 Visit Us 🏮
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-700 h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.654543485502!2d-73.9863304!3d40.7476264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a8f913666b%3A0x2d2adcb5bc0150f8!2sFood%20Gallery%2032!5e0!3m2!1sen!2sus!4v1759802027959!5m2!1sen!2sus"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              alert('Thank you for your message! We\'ll get back to you soon.');
              (e.target as HTMLFormElement).reset();
            }}
            className="space-y-6"
          >
            <div>
              <label className="block font-semibold text-stone-900 mb-2">Name</label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 border-2 border-red-700 rounded-2xl focus:outline-none focus:border-stone-900 transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-900 mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-red-700 rounded-2xl focus:outline-none focus:border-stone-900 transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-900 mb-2">Message</label>
                <textarea
                required
                placeholder="Your message or reservation request"
                rows={5}
                className="w-full px-4 py-3 border-2 border-red-700 rounded-2xl focus:outline-none focus:border-stone-900 transition-all resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-stone-900 to-stone-800 text-red-700 font-semibold text-lg rounded-full border-2 border-red-700 hover:bg-red-700 hover:text-stone-900 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-stone-900 text-amber-100 py-12 px-4 border-t-4 border-red-700">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-4">Connect With Us</h3>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 bg-amber-100 text-stone-900 rounded-full flex items-center justify-center border-2 border-red-700 hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-4">Business Hours</h3>
            <div className="space-y-2 text-sm">
              <p className="border-b border-amber-900/30 pb-2">Monday - Thursday: 11:30 AM - 10:00 PM</p>
              <p className="border-b border-amber-900/30 pb-2">Friday - Saturday: 11:30 AM - 11:00 PM</p>
              <p>Sunday: 12:00 PM - 9:00 PM</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-4">Location</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MapPin size={18} /> 11 W 32nd St, New York, NY 10001
              </p>
              <p className="flex items-center gap-2">
                <Phone size={18} /> (555) 789-0123
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} /> info@mangunrok.com
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}