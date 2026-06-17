import Hero from '../components/Hero';

import ProductSection from '../components/ProductSection';

import headphonesProducts from '../data/headphonesProducts';
import earbudsProducts from '../data/earbudsProducts';
import earphonesProducts from '../data/earphonesProducts';
import speakersProducts from '../data/speakersProducts';

import laptopchargersProducts from '../data/laptopchargersProducts';
import laptopProducts from '../data/laptopProducts';

import phonechargersProducts from '../data/phonechargersProducts.json';
import carchargersProducts from '../data/carchargersProducts.json';
import powerbankProducts from '../data/powerbankProducts.json';

import tabletProducts from '../data/tabletProducts.json';

import infinixProducts from '../data/infinixProducts.json';
import iphoneProducts from '../data/iphoneProducts.json';
import samsungProducts from '../data/samsungProducts.json';
import tecnoProducts from '../data/tecnoProducts.json';
import oppoProducts from '../data/oppoProducts.json';
import redmiProducts from '../data/redmiProducts.json';
import neonProducts from '../data/neonProducts.json';

import phoneCaseProducts from '../data/phoneCaseProducts.json';
import screenprotectorsProducts from '../data/screenprotectorsProducts.json';
import clocksProducts from '../data/clocksProducts.json';
import flashdisksProducts from '../data/flashdisksProducts.json';
import memorycardsProducts from '../data/memorycardsProducts.json';
import watchProducts from '../data/watchProducts.json';
import addonsProducts from '../data/addonsProducts.json';

export default function Home() {
  return (
    <>
      <Hero />
      {/* Smartphones */}

      <ProductSection
        title="iPhone Offers"
        products={iphoneProducts.slice(0, 5)}
        path="/iphone"
        basePath="/iphone"
      />

      <ProductSection
        title="Tecno Offers"
        products={tecnoProducts.slice(0, 5)}
        path="/tecno"
        basePath="/tecno"
      />

      <ProductSection
        title="Infinix Offers"
        products={infinixProducts.slice(0, 5)}
        path="/infinix"
        basePath="/infinix"
      />

      <ProductSection
        title="Samsung Offers"
        products={samsungProducts.slice(0, 5)}
        path="/samsung"
        basePath="/samsung"
      />
      <ProductSection
        title="Oppo Offers"
        products={oppoProducts.slice(0, 5)}
        path="/oppo"
        basePath="/oppo"
      />
      <ProductSection
        title="Redmi Offers"
        products={redmiProducts.slice(0, 5)}
        path="/redmi"
        basePath="/redmi"
      />
      <ProductSection
        title="Neon Offers"
        products={neonProducts.slice(0, 5)}
        path="/neon"
        basePath="/neon"
      />
      {/* Audio */}

      <ProductSection
        title="Headphones Offers"
        products={headphonesProducts.slice(0, 5)}
        path="/headphones"
        basePath="/headphones"
      />

      <ProductSection
        title="Earphones Offers"
        products={earphonesProducts.slice(0, 5)}
        path="/earphones"
        basePath="/earphones"
      />

      <ProductSection
        title="Earbuds Offers"
        products={earbudsProducts.slice(0, 5)}
        path="/earbuds"
        basePath="/earbuds"
      />

      
      <ProductSection
        title="Speakers Offers"
        products={speakersProducts.slice(0, 5)}
        path="/speakers"
        basePath="/speakers"
      />
      {/* Chargers */}

      <ProductSection
        title="Laptop Chargers Offers"
        products={laptopchargersProducts.slice(0, 5)}
        path="/laptop-chargers"
        basePath="/laptop-chargers"
      />

      <ProductSection
        title="Phone Chargers Offers"
        products={phonechargersProducts.slice(0, 5)}
        path="/phone-chargers"
        basePath="/phone-chargers"
      />

      <ProductSection
        title="Car Chargers Offers"
        products={carchargersProducts.slice(0, 5)}
        path="/car-chargers"
        basePath="/car-chargers"
      />

      <ProductSection
        title="Power Bank Offers"
        products={powerbankProducts.slice(0, 5)}
        path="/powerbanks"
        basePath="/powerbanks"
      />
      {/* Laptops & Tablets */}

      <ProductSection
        title="Laptops Offers"
        products={laptopProducts.slice(0, 5)}
        path="/laptops"
        basePath="/laptops"
      />

      <ProductSection
        title="Tablets Offers"
        products={tabletProducts.slice(0, 5)}
        path="/tablets"
        basePath="/tablets"
      />
      {/* Accessories */}
      <ProductSection
        title="Phone Cases Offers"
        products={phoneCaseProducts.slice(0, 5)}
        path="/phone-cases"
        basePath="/phone-cases"
      />
      <ProductSection
        title="Screen Protectors Offers"
        products={screenprotectorsProducts.slice(0, 5)}
        path="/screen-protectors"
        basePath="/screen-protectors"
      />
      <ProductSection
        title="Clocks Offers"
        products={clocksProducts.slice(0, 5)}
        path="/clocks"
        basePath="/clocks"
      />
      <ProductSection
        title="Addons Offers"
        products={addonsProducts.slice(0, 5)}
        path="/addons"
        basePath="/addons"
      />
      <ProductSection
        title="Flashdisks Offers"
        products={flashdisksProducts.slice(0, 5)}
        path="/flashdisks"
        basePath="/flashdisks"
      />
      <ProductSection
        title="Memory Cards Offers"
        products={memorycardsProducts.slice(0, 5)}
        path="/memorycards"
        basePath="/memorycards"
      />
      <ProductSection
        title="Watches Offers"
        products={watchProducts.slice(0, 5)}
        path="/watches"
        basePath="/watches"
      />
    </>
  );
}