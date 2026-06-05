import Hero from '../components/Hero';

import ProductSection from '../components/ProductSection';

import headphonesProducts from '../data/headphonesProducts';
import earbudsProducts from '../data/earbudsProducts';
import earphonesProducts from '../data/earphonesProducts';
import speakersProducts from '../data/speakersProducts';

import laptopchargersProducts from '../data/laptopchargersProducts';
import laptopProducts from '../data/laptopProducts';

import phonechargersProducts from '../data/phonechargersProducts.json';
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

export default function Home() {
  return (
    <>
      <Hero />

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

      {/* ADD THIS SECTION */}
      <ProductSection
        title="Speakers Offers"
        products={speakersProducts.slice(0, 5)}
        path="/speakers"
        basePath="/speakers"
      />

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
        title="Power Bank Offers"
        products={powerbankProducts.slice(0, 5)}
        path="/powerbanks"
        basePath="/powerbanks"
      />

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
    </>
  );
}