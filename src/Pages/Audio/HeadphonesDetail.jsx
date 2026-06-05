import { useParams } from 'react-router-dom';
import  headphonesProducts  from '../../data/headphonesProducts';
import ProductDetail from '../../components/ProductDetail';

export default function HeadphonesDetail() {
  const { id } = useParams();
  const product = headphonesProducts.find(p => p.id === Number(id));

  if (!product) {
    return <p style={{ padding: '40px 24px', color: 'var(--text-secondary)' }}>Product not found.</p>;
  }

  const relatedProducts = headphonesProducts.filter(p => p.id !== product.id);

  return (
    <ProductDetail
      product={product}
      relatedProducts={relatedProducts}
      basePath="/headphones"
    />
  );
}