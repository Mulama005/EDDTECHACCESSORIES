import { useParams } from 'react-router-dom';
import  tabletProducts  from '../../data/tabletProducts';
import ProductDetail from '../../components/ProductDetail';

export default function TabletDetail() {
  const { id } = useParams();
  const product = tabletProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = tabletProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/tablets"
    />
  );
}