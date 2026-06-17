import { useParams } from 'react-router-dom';
import ProductDetail from '../../../components/ProductDetail';
import addonsProducts from '../../../data/addonsProducts.json';

export default function AddonsDetail() {
  const { id } = useParams();
  const product = addonsProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = addonsProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/addons"
    />
  );
}
