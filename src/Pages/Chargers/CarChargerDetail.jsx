import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/ProductDetail';
import carchargersProducts from '../../data/carchargersProducts.json';

const carChargerProducts = carchargersProducts;

export default function CarChargerDetail() {
  const { id } = useParams();
  const product = carChargerProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = carChargerProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/car-chargers"
    />
  );
}
