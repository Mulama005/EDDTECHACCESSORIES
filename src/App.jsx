import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Iphone from './Pages/Phones/Iphone';
import IphoneDetail from './Pages/Phones/IphoneDetail';
import Tecno from './Pages/Phones/Tecno';
import TecnoDetail from './Pages/Phones/TecnoDetail';
import Infinix from './Pages/Phones/Infinix';
import InfinixDetail from './Pages/Phones/InfinixDetail';
import Samsung from './Pages/Phones/Samsung';
import SamsungDetail from './Pages/Phones/SamsungDetail';
import Headphones from './Pages/Accessories/Headphones';
import HeadphonesDetail from './Pages/Accessories/HeadphonesDetail';
import Earbuds from './Pages/Accessories/Earbuds';
import EarbudsDetail from './Pages/Accessories/EarbudsDetail';
import Earphones from './Pages/Accessories/Earphones';
import EarphonesDetail from './Pages/Accessories/EarphonesDetail';
import Laptop from './Pages/Laptop&Tablets/Laptop';
import LaptopDetail from './Pages/Laptop&Tablets/LaptopDetail';
import Tablet from './Pages/Laptop&Tablets/Tablet';
import TabletDetail from './Pages/Laptop&Tablets/TabletDetail';
import LaptopChargers from './Pages/Chargers/LaptopChargers';
import LaptopChargerDetail from './Pages/Chargers/LaptopChargersDetail';
import PhoneChargers from './Pages/Chargers/PhoneChargers';
import PhoneChargerDetail from './Pages/Chargers/PhoneChargersDetail';
import PowerBank from './Pages/Chargers/PowerBank';
import PowerBankDetail from './Pages/Chargers/PowerBankDetail';
import Speakers from "./pages/audio/Speakers";
import SpeakersDetail from "./pages/audio/SpeakersDetail";
import Order from './Pages/Order';
import OrderSuccess from './Pages/OrderSuccess';
import ContactUs from './Pages/ContactUs/ContactUs';
import AdminOrders from "./pages/AdminDashboard/AdminOrders";
import AdminCampaigns from "./pages/AdminDashboard/AdminCampaigns";
import AdminMessages from "./pages/AdminDashboard/AdminMessages";
import SearchResults from "./components/SearchResults";
import About from './components/About';
import Services from './components/Services';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import AdminRoute from "./components/AdminRoute";


import './styles/App.css';


export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <CategoryBar />
        <SearchBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Protected routes */}
            <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
          />
          <Route
          path="/admin/campaigns"
          element={
            <AdminRoute>
              <AdminCampaigns />
            </AdminRoute>
          }

          />

          <Route
          path="/admin/messages"
          element={
          <AdminRoute>
            <AdminMessages />
            </AdminRoute>
          }
          />
          
          
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Searchbar */}
            <Route path="/search" element={<SearchResults />} />
            
            {/* Phones */}
            <Route path="/iphone" element={<Iphone />} />
            <Route path="/iphone/:id" element={<IphoneDetail />} />
            <Route path="/tecno" element={<Tecno />} />
            <Route path="/tecno/:id" element={<TecnoDetail />} />
            <Route path="/samsung" element={<Samsung />} />
            <Route path="/samsung/:id" element={<SamsungDetail />} />
            <Route path="/infinix" element={<Infinix />} />
            <Route path="/infinix/:id" element={<InfinixDetail />} />
            {/* accessories */}
            <Route path="/headphones" element={<Headphones />} />
            <Route path="/headphones/:id" element={<HeadphonesDetail />} />
            <Route path="/earbuds" element={<Earbuds />} />
            <Route path="/earbuds/:id" element={<EarbudsDetail />} />
            <Route path="/earphones" element={<Earphones />} />
            <Route path="/earphones/:id" element={<EarphonesDetail />} />
            {/* laptops & tablets */}
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/laptop/:id" element={<LaptopDetail />} />
            <Route path="/tablet" element={<Tablet />} />
            <Route path="/tablet/:id" element={<TabletDetail />} />
            {/* chargers */}
            <Route path="/laptop-chargers" element={<LaptopChargers />} />
            <Route path="/laptop-chargers/:id" element={<LaptopChargerDetail />} />
            <Route path="/phone-chargers" element={<PhoneChargers />} />
            <Route path="/phone-chargers/:id" element={<PhoneChargerDetail />} />
            <Route path="/powerbank" element={<PowerBank />} />
            <Route path="/powerbank/:id" element={<PowerBankDetail />} />
            {/* audio */}
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/speakers/:id" element={<SpeakersDetail />} />

            {/* Order */}
            <Route path="/order" element={<Order />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            {/* Contact Us */}
            <Route path="/contact" element={<ContactUs />} />
            {/* About Us */}
            <Route path="/about" element={<About />} />
              {/* Services */}
            <Route path="/services" element={<Services />} />
            

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}