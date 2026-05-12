import Hero from '../components/Hero';

import ProductSection from '../components/ProductSection';
import  headphonesProducts  from '../data/headphonesProducts';
import  earbudsProducts  from '../data/earbudsProducts';
import  earphonesProducts  from '../data/earphonesProducts';
import  laptopchargersProducts  from '../data/laptopchargersProducts';
import  laptopProducts from '../data/laptopProducts';
import  phonechargersProducts  from '../data/phonechargersProducts';
import  powerbankProducts  from '../data/powerbankProducts';
import  tabletProducts  from '../data/tabletProducts';
import  infinixProducts  from '../data/infinixProducts';
import  iphoneProducts  from '../data/iphoneProducts.json';
import  samsungProducts  from '../data/samsungProducts';
import  tecnoProducts  from '../data/tecnoProducts';



export default function Home() {
  return (
    <>


      <Hero />
      
      
      <ProductSection 
        title="iPhone Offers" 
        products={iphoneProducts.slice(0, 5)}
        path="/iphone" 
      />

      <ProductSection 
        title="Tecno Offers" 
        products={tecnoProducts.slice(0, 5)} 
        path="/tecno" 
      />

      {/* 2. Removed the extra [] brackets so .map() works correctly */}
      <ProductSection 
        title="Infinix Offers" 
        products={infinixProducts.slice(0, 5)} 
        path="/infinix" 
      />

      <ProductSection 
        title="Samsung Offers" 
        products={samsungProducts.slice(0, 5)} 
        path="/samsung" 
      />

      <ProductSection 
        title="Headphones Offers" 
        products={headphonesProducts.slice(0, 5)} 
        path="/headphones" 
      />
      <ProductSection 
        title="Earphones Offers" 
        products={earphonesProducts.slice(0, 5)}
        path="/earphones" 
      />
      <ProductSection
        title="Earbuds Offers"
        products={earbudsProducts.slice(0, 5)}
        path="/earbuds"
      />
      <ProductSection
        title="Laptop Chargers Offers"
        products={laptopchargersProducts.slice(0, 5)}
        path="/laptop-chargers"
      />
      <ProductSection
        title="Phone Chargers Offers"
        products={phonechargersProducts.slice(0, 5)}
        path="/phone-chargers"
      />
      <ProductSection
        title="Power Bank Offers"
        products={powerbankProducts.slice(0, 5)}
        path="/powerbank"
      />
      <ProductSection
        title="Laptops Offers"
        products={laptopProducts.slice(0, 5)}
        path="/laptop"
      />
      <ProductSection
        title="Tablets Offers"
        products={tabletProducts.slice(0, 5)}
        path="/tablet"
      />
    </>
  );
}