import React, { useState, useEffect } from 'react';
import { User, Coffee, Calendar, Mail, Home, Menu, LogOut, Plus, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const CafeManagementSystem = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState('customer');

  // Sample data
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Espresso', price: 3.50, category: 'Coffee', description: 'Rich and bold espresso shot' },
    { id: 2, name: 'Cappuccino', price: 4.25, category: 'Coffee', description: 'Perfect blend of espresso and steamed milk' },
    { id: 3, name: 'Croissant', price: 2.75, category: 'Pastry', description: 'Fresh buttery croissant' },
    { id: 4, name: 'Caesar Salad', price: 8.50, category: 'Food', description: 'Fresh romaine lettuce with caesar dressing' }
  ]);

  const [reservations, setReservations] = useState([
    { id: 1, customerName: 'John Doe', date: '2024-05-25', time: '14:00', guests: 2, status: 'confirmed' },
    { id: 2, customerName: 'Jane Smith', date: '2024-05-26', time: '18:30', guests: 4, status: 'pending' }
  ]);

  // Admin credentials (hardcoded)
  const adminCredentials = { username: 'admin', password: 'admin123' };

  const LoginModal = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      setError('');

      if (loginType === 'admin') {
        if (credentials.username === adminCredentials.username && 
            credentials.password === adminCredentials.password) {
          setUser({ type: 'admin', username: credentials.username });
          setCurrentPage('dashboard');
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        // Customer login - simplified (just check if username is provided)
        if (credentials.username) {
          setUser({ type: 'customer', username: credentials.username });
        } else {
          setError('Please enter a username');
        }
      }
      
      if (!error) {
        setShowLoginModal(false);
        setCredentials({ username: '', password: '' });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-96">
          <h2 className="text-2xl font-bold mb-6">Login as {loginType}</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            {loginType === 'admin' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <nav className="bg-amber-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Coffee className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Cafe Bliss</h1>
        </div>
        
        <div className="flex space-x-6">
          {user?.type !== 'admin' && (
            <>
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center space-x-1 hover:text-amber-200 ${currentPage === 'home' ? 'text-amber-200' : ''}`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => setCurrentPage('menu')}
                className={`flex items-center space-x-1 hover:text-amber-200 ${currentPage === 'menu' ? 'text-amber-200' : ''}`}
              >
                <Menu className="h-4 w-4" />
                <span>Menu</span>
              </button>
              <button
                onClick={() => setCurrentPage('reservation')}
                className={`flex items-center space-x-1 hover:text-amber-200 ${currentPage === 'reservation' ? 'text-amber-200' : ''}`}
              >
                <Calendar className="h-4 w-4" />
                <span>Reservation</span>
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`flex items-center space-x-1 hover:text-amber-200 ${currentPage === 'contact' ? 'text-amber-200' : ''}`}
              >
                <Mail className="h-4 w-4" />
                <span>Contact</span>
              </button>
            </>
          )}
          
          {user?.type === 'admin' && (
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center space-x-1 hover:text-amber-200 ${currentPage === 'dashboard' ? 'text-amber-200' : ''}`}
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <button
                onClick={() => { setLoginType('customer'); setShowLoginModal(true); }}
                className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700"
              >
                Customer Login
              </button>
              <button
                onClick={() => { setLoginType('admin'); setShowLoginModal(true); }}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
              >
                Admin Login
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Welcome, {user.username}</span>
              <button
                onClick={() => { setUser(null); setCurrentPage('home'); }}
                className="flex items-center space-x-1 px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

//   const HomePage = () => (
//     <div className="container mx-auto px-4 py-8">
//       <div className="text-center mb-12">
//         <h1 className="text-5xl font-bold text-amber-800 mb-4">Welcome to Cafe Bliss</h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Experience the perfect blend of exceptional coffee, delicious food, and warm atmosphere. 
//           Your neighborhood cafe where every moment is blissful.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8 mb-12">
//         <div className="text-center p-6 bg-white rounded-lg shadow-md">
//           <Coffee className="h-16 w-16 text-amber-600 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Premium Coffee</h3>
//           <p className="text-gray-600">Freshly roasted beans from around the world, crafted by expert baristas.</p>
//         </div>
//         <div className="text-center p-6 bg-white rounded-lg shadow-md">
//           <Menu className="h-16 w-16 text-amber-600 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Delicious Food</h3>
//           <p className="text-gray-600">From fresh pastries to hearty meals, we have something for every taste.</p>
//         </div>
//         <div className="text-center p-6 bg-white rounded-lg shadow-md">
//           <Calendar className="h-16 w-16 text-amber-600 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Easy Reservations</h3>
//           <p className="text-gray-600">Book your table in advance for a guaranteed perfect dining experience.</p>
//         </div>
//       </div>

//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Visit Us Today</h2>
//         <p className="text-lg text-gray-600 mb-8">Open daily from 7:00 AM to 10:00 PM</p>
//         <button
//           onClick={() => setCurrentPage('menu')}
//           className="px-8 py-3 bg-amber-600 text-white text-lg font-semibold rounded-lg hover:bg-amber-700 transition duration-300"
//         >
//           View Our Menu
//         </button>
//       </div>
//     </div>
//   );


const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample images - in a real app, these would be actual cafe photos
  const sliderImages = [
    {
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: 'Cozy cafe interior with warm lighting',
      caption: 'Warm & Welcoming Atmosphere'
    },
    {
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: 'Beautifully crafted latte art',
      caption: 'Artisan Coffee Creations'
    },
    {
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: 'Fresh pastries and desserts',
      caption: 'Fresh Daily Pastries'
    },
    {
      url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: 'Friends enjoying coffee together',
      caption: 'Perfect Place to Connect'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Welcome to Cafe Bliss
            </h1>
            <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl mx-auto">
              Experience the perfect blend of exceptional coffee, delicious food, and warm atmosphere.
              Your neighborhood cafe where every moment is blissful.
            </p>
            <button
              onClick={() => setCurrentPage('menu')}
              className="px-8 py-4 bg-amber-600 text-white text-lg font-semibold rounded-lg hover:bg-amber-700 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              Explore Our Menu
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <Coffee className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Premium Coffee</h3>
            <p className="text-gray-600">Freshly roasted beans from around the world, crafted by expert baristas.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <Menu className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Delicious Food</h3>
            <p className="text-gray-600">From fresh pastries to hearty meals, we have something for every taste.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <Calendar className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Easy Reservations</h3>
            <p className="text-gray-600">Book your table in advance for a guaranteed perfect dining experience.</p>
          </div>
        </div>

        {/* Image Slider Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Experience Cafe Bliss</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl">
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold drop-shadow-lg">{image.caption}</h3>
                  </div>
                </div>
              ))}
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            {/* Dot Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition duration-300 ${
                    index === currentSlide ? 'bg-amber-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-amber-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Visit Us Today</h2>
          <p className="text-lg text-gray-600 mb-8">Open daily from 7:00 AM to 10:00 PM</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('menu')}
              className="px-8 py-3 bg-amber-600 text-white text-lg font-semibold rounded-lg hover:bg-amber-700 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              View Our Menu
            </button>
            <button
              onClick={() => setCurrentPage('reservation')}
              className="px-8 py-3 bg-white text-amber-600 text-lg font-semibold rounded-lg border-2 border-amber-600 hover:bg-amber-50 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              Make a Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



  const MenuPage = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">Our Menu</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <span className="text-lg font-bold text-amber-600">${item.price}</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ReservationPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      date: '',
      time: '',
      guests: 1
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newReservation = {
        id: reservations.length + 1,
        customerName: formData.name,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        status: 'pending'
      };
      setReservations([...reservations, newReservation]);
      setFormData({ name: '', date: '', time: '', guests: 1 });
      alert('Reservation submitted successfully!');
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">Make a Reservation</h1>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Number of Guests</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700"
            >
              Make Reservation
            </button>
          </form>
        </div>
      </div>
    );
  };

  const ContactPage = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">123 Coffee Street, Brew City, BC 12345</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">info@cafebliss.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 7:00 AM - 10:00 PM<br />
                Saturday - Sunday: 8:00 AM - 11:00 PM
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('menu');
    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', price: '', category: '', description: '' });

    const handleAddItem = (e) => {
      e.preventDefault();
      const item = {
        id: menuItems.length + 1,
        ...newItem,
        price: parseFloat(newItem.price)
      };
      setMenuItems([...menuItems, item]);
      setNewItem({ name: '', price: '', category: '', description: '' });
    };

    const handleDeleteItem = (id) => {
      setMenuItems(menuItems.filter(item => item.id !== id));
    };

    const updateReservationStatus = (id, status) => {
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status } : res
      ));
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">Admin Dashboard</h1>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('menu')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'menu' 
                    ? 'border-amber-500 text-amber-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Menu Management
              </button>
              <button
                onClick={() => setActiveTab('reservations')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reservations' 
                    ? 'border-amber-500 text-amber-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reservations
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'menu' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
              <form onSubmit={handleAddItem} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="submit"
                  className="col-span-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="inline h-4 w-4 mr-2" />
                  Add Item
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Current Menu Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map(item => (
                        <tr key={item.id} className="border-t">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.category}</td>
                          <td className="px-4 py-2">${item.price}</td>
                          <td className="px-4 py-2">{item.description}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Reservation Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Customer</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Time</th>
                      <th className="px-4 py-2 text-left">Guests</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(reservation => (
                      <tr key={reservation.id} className="border-t">
                        <td className="px-4 py-2">{reservation.customerName}</td>
                        <td className="px-4 py-2">{reservation.date}</td>
                        <td className="px-4 py-2">{reservation.time}</td>
                        <td className="px-4 py-2">{reservation.guests}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            reservation.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : reservation.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {reservation.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                              className="text-green-600 hover:text-green-800 text-xs"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              className="text-red-600 hover:text-red-800 text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };



  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'menu': return <MenuPage />;
      case 'reservation': return <ReservationPage />;
      case 'contact': return <ContactPage />;
      case 'dashboard': return <AdminDashboard />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {renderCurrentPage()}
      {showLoginModal && <LoginModal />}
    </div>
  );
};

export default CafeManagementSystem;
