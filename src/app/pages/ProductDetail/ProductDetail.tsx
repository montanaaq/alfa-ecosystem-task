import { type FC, type MouseEvent } from "react";

import { useParams, useNavigate, Link } from "react-router";

import PageLayout from "../../layouts/PageLayout";

import { truncateWords } from "@/lib/utils";

import { useNewsArticles } from "@/services/hooks/useNewsArticles";

import { useFavoritesStore } from "@/shared/stores/favorites.store";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const ProductDetail: FC = () => {
  const { url: encodedUrl } = useParams<{ url: string }>();
  const navigate = useNavigate();

  const { visibleArticles: allArticles } = useNewsArticles();
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (!encodedUrl) {
    return (
      <PageLayout>
        <div className='text-center text-red-600'>Invalid article URL</div>
      </PageLayout>
    );
  }

  const url = decodeURIComponent(encodedUrl);
  const article = allArticles.find((a) => a.url === url);

  if (!article) {
    return (
      <PageLayout>
        <button
          onClick={() => navigate("/products")}
          className='mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700'
        >
          Back to Products
        </button>
        <div className='text-center text-gray-500'>Article not found</div>
      </PageLayout>
    );
  }

  function onToggleFavorite(e: MouseEvent, url: string) {
    e.stopPropagation();
    toggleFavorite(url);
  }

  return (
    <PageLayout>
      <Breadcrumb className='mb-6'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/products'>News</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{truncateWords(article.title)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='max-w-2xl mx-auto mb-8'>
        <ProductCard article={article} onToggleFavorite={onToggleFavorite} />
      </div>

      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6'>
        {article.description && (
          <p className='text-lg text-gray-700 mb-6'>{article.description}</p>
        )}

        {article.content && (
          <div className='prose prose-sm max-w-none mb-6'>
            <p className='text-gray-600 whitespace-pre-line'>
              {article.content}
            </p>
          </div>
        )}

        <div className='mt-6'>
          <a
            href={article.url}
            target='_blank'
            rel='noreferrer'
            className='inline-block'
          >
            <Button variant='default'>Read Full Article</Button>
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
