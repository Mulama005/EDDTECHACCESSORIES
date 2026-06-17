import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import AdminRoute from "./components/AdminRoute";
import CookieConsent from './components/CookieConsent';
import './styles/App.css';

// Layout & utility components
const SearchResults  = lazy(() => import("./components/SearchResults"));
const About          = lazy(() => import('./components/About'));
const Services       = lazy(() => import('./components/Services'));

// Pages
const Home           = lazy(() => import('./Pages/Home'));

// Auth
const Login          = lazy(() => import('./Pages/Auth/Login'));
const Register       = lazy(() => import('./Pages/Auth/Register'));

// Phones
const Iphone         = lazy(() => import('./Pages/Phones/Iphone'));
const IphoneDetail   = lazy(() => import('./Pages/Phones/IphoneDetail'));
const Tecno          = lazy(() => import('./Pages/Phones/Tecno'));
const TecnoDetail    = lazy(() => import('./Pages/Phones/TecnoDetail'));
const Infinix        = lazy(() => import('./Pages/Phones/Infinix'));
const InfinixDetail  = lazy(() => import('./Pages/Phones/InfinixDetail'));
const Samsung        = lazy(() => import('./Pages/Phones/Samsung'));
const SamsungDetail  = lazy(() => import('./Pages/Phones/SamsungDetail'));
const Oppo           = lazy(() => import('./Pages/Phones/Oppo'));
const OppoDetail     = lazy(() => import('./Pages/Phones/OppoDetail'));
const Redmi          = lazy(() => import('./Pages/Phones/Redmi'));
const RedmiDetail    = lazy(() => import('./Pages/Phones/RedmiDetail'));
const Neon           = lazy(() => import('./Pages/Phones/Neon'));
const NeonDetail     = lazy(() => import('./Pages/Phones/NeonDetail'));

// Accessories
const PhoneCase             = lazy(() => import('./Pages/Accessories/PhoneCases/Phonecase'));
const PhoneCaseDetail       = lazy(() => import('./Pages/Accessories/PhoneCases/PhoneCaseDetail'));
const ScreenProtectors      = lazy(() => import('./Pages/Accessories/ScreenProtectors/ScreenProtector'));
const ScreenProtectorDetail = lazy(() => import('./Pages/Accessories/ScreenProtectors/ScreenProtectorDetail'));
const Clock                 = lazy(() => import('./Pages/Accessories/Clocks/Clock'));
const ClockDetail           = lazy(() => import('./Pages/Accessories/Clocks/ClockDetail'));
const Flashdisk             = lazy(() => import('./Pages/Accessories/Flashdisks/Flashdisk'));
const FlashdiskDetail       = lazy(() => import('./Pages/Accessories/Flashdisks/FlashdiskDetail'));
const Memorycard            = lazy(() => import('./Pages/Accessories/Memorycards/Memorycard'));
const MemorycardDetail      = lazy(() => import('./Pages/Accessories/Memorycards/MemorycardDetail'));
const Watch                 = lazy(() => import('./Pages/Accessories/Watches/Watch'));
const WatchDetail           = lazy(() => import('./Pages/Accessories/Watches/WatchDetail'));

// Laptops & Tablets
const Laptop        = lazy(() => import('./Pages/Laptop&Tablets/Laptop'));
const LaptopDetail  = lazy(() => import('./Pages/Laptop&Tablets/LaptopDetail'));
const Tablet        = lazy(() => import('./Pages/Laptop&Tablets/Tablet'));
const TabletDetail  = lazy(() => import('./Pages/Laptop&Tablets/TabletDetail'));

// Chargers
const LaptopChargers      = lazy(() => import('./Pages/Chargers/LaptopChargers'));
const LaptopChargerDetail = lazy(() => import('./Pages/Chargers/LaptopChargersDetail'));
const PhoneChargers       = lazy(() => import('./Pages/Chargers/PhoneChargers'));
const PhoneChargerDetail  = lazy(() => import('./Pages/Chargers/PhoneChargersDetail'));
const CarChargers         = lazy(() => import('./Pages/Chargers/CarCharger'));
const CarChargersDetail   = lazy(() => import('./Pages/Chargers/CarChargerDetail'));
const PowerBank           = lazy(() => import('./Pages/Chargers/PowerBank'));
const PowerBankDetail     = lazy(() => import('./Pages/Chargers/PowerBankDetail'));
const Addons              = lazy(() => import('./Pages/Accessories/Addons/Addons'));
const AddonsDetail        = lazy(() => import('./Pages/Accessories/Addons/AddonsDetail'));

// Audio
const Speakers        = lazy(() => import("./Pages/Audio/Speakers"));
const SpeakersDetail  = lazy(() => import("./Pages/Audio/SpeakersDetail"));
const Headphones      = lazy(() => import('./Pages/Audio/Headphones'));
const HeadphonesDetail = lazy(() => import('./Pages/Audio/HeadphonesDetail'));
const Earbuds         = lazy(() => import('./Pages/Audio/Earbuds'));
const EarbudsDetail   = lazy(() => import('./Pages/Audio/EarbudsDetail'));
const Earphones       = lazy(() => import('./Pages/Audio/Earphones'));
const EarphonesDetail = lazy(() => import('./Pages/Audio/EarphonesDetail'));

// Order & Contact
const Order        = lazy(() => import('./Pages/Order'));
const OrderSuccess = lazy(() => import('./Pages/OrderSuccess'));
const ContactUs    = lazy(() => import('./Pages/ContactUs/ContactUs'));

// Privacy & Terms
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsUse      = lazy(() => import('./components/TermsUse'));

// Admin
const AdminOrders   = lazy(() => import("./pages/AdminDashboard/AdminOrders"));
const AdminCampaigns = lazy(() => import("./pages/AdminDashboard/AdminCampaigns"));
const AdminMessages  = lazy(() => import("./pages/AdminDashboard/AdminMessages"));
const AdminConsents  = lazy(() => import("./pages/AdminDashboard/AdminConsents"));

// ─────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
  return null;
}

const Loader = (
  <div style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>
    Loading...
  </div>
);

// ─────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <CategoryBar />
        <SearchBar />
        <main>
          <Suspense fallback={Loader}>
            <Routes>

              {/* Home */}
              <Route path="/"                   element={<Home />} />

              {/* Auth */}
              <Route path="/login"              element={<Login />} />
              <Route path="/register"           element={<Register />} />

              {/* Search */}
              <Route path="/search"             element={<SearchResults />} />

              {/* ── Admin — Protected ── */}
              <Route path="/admin/orders"    element={<AdminRoute><AdminOrders /></AdminRoute>} />
              <Route path="/admin/campaigns" element={<AdminRoute><AdminCampaigns /></AdminRoute>} />
              <Route path="/admin/messages"  element={<AdminRoute><AdminMessages /></AdminRoute>} />
              <Route path="/admin/consents"  element={<AdminRoute><AdminConsents /></AdminRoute>} />

              {/* ── Phones ── */}
              <Route path="/iphone"             element={<Iphone />} />
              <Route path="/iphone/:id"         element={<IphoneDetail />} />
              <Route path="/tecno"              element={<Tecno />} />
              <Route path="/tecno/:id"          element={<TecnoDetail />} />
              <Route path="/samsung"            element={<Samsung />} />
              <Route path="/samsung/:id"        element={<SamsungDetail />} />
              <Route path="/oppo"               element={<Oppo />} />
              <Route path="/oppo/:id"           element={<OppoDetail />} />
              <Route path="/redmi"              element={<Redmi />} />
              <Route path="/redmi/:id"          element={<RedmiDetail />} />
              <Route path="/neon"               element={<Neon />} />
              <Route path="/neon/:id"           element={<NeonDetail />} />
              <Route path="/infinix"            element={<Infinix />} />
              <Route path="/infinix/:id"        element={<InfinixDetail />} />

              {/* ── Accessories ── */}
              <Route path="/phone-cases"           element={<PhoneCase />} />
              <Route path="/phone-cases/:id"       element={<PhoneCaseDetail />} />
              <Route path="/screen-protectors"     element={<ScreenProtectors />} />
              <Route path="/screen-protectors/:id" element={<ScreenProtectorDetail />} />
              <Route path="/clocks"                element={<Clock />} />
              <Route path="/clocks/:id"            element={<ClockDetail />} />
              <Route path="/flashdisks"            element={<Flashdisk />} />
              <Route path="/flashdisks/:id"        element={<FlashdiskDetail />} />
              <Route path="/memorycards"           element={<Memorycard />} />
              <Route path="/memorycards/:id"       element={<MemorycardDetail />} />
              <Route path="/watches"               element={<Watch />} />
              <Route path="/watches/:id"           element={<WatchDetail />} />
              <Route path="/addons"               element={<Addons />} />
              <Route path="/addons/:id"           element={<AddonsDetail />} />

              {/* ── Laptops & Tablets ── */}
              <Route path="/laptops"            element={<Laptop />} />
              <Route path="/laptops/:id"        element={<LaptopDetail />} />
              <Route path="/tablets"            element={<Tablet />} />
              <Route path="/tablets/:id"        element={<TabletDetail />} />

              {/* ── Chargers ── */}
              <Route path="/laptop-chargers"       element={<LaptopChargers />} />
              <Route path="/laptop-chargers/:id"   element={<LaptopChargerDetail />} />
              <Route path="/phone-chargers"        element={<PhoneChargers />} />
              <Route path="/phone-chargers/:id"    element={<PhoneChargerDetail />} />
              <Route path="/car-chargers"          element={<CarChargers />} />
              <Route path="/car-chargers/:id"      element={<CarChargersDetail />} />
              <Route path="/powerbank"             element={<PowerBank />} />
              <Route path="/powerbank/:id"         element={<PowerBankDetail />} />

              

              {/* ── Audio ── */}
              <Route path="/speakers"           element={<Speakers />} />
              <Route path="/speakers/:id"       element={<SpeakersDetail />} />
              <Route path="/headphones"         element={<Headphones />} />
              <Route path="/headphones/:id"     element={<HeadphonesDetail />} />
              <Route path="/earbuds"            element={<Earbuds />} />
              <Route path="/earbuds/:id"        element={<EarbudsDetail />} />
              <Route path="/earphones"          element={<Earphones />} />
              <Route path="/earphones/:id"      element={<EarphonesDetail />} />

              {/* ── Order ── */}
              <Route path="/order"              element={<Order />} />
              <Route path="/order-success"      element={<OrderSuccess />} />

              {/* ── Other ── */}
              <Route path="/contact"            element={<ContactUs />} />
              <Route path="/about"              element={<About />} />
              <Route path="/services"           element={<Services />} />

              {/* ── Legal ── */}
              <Route path="/privacy-policy"     element={<PrivacyPolicy />} />
              <Route path="/terms-use"          element={<TermsUse />} />

            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}