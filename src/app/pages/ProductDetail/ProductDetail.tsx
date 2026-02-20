import type { FC, MouseEvent } from 'react';

import { useNavigate, useParams } from 'react-router';
import BreadcrumbNav from '@/components/BreadcrumbNav/BreadcrumbNav';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Button } from '@/components/ui/button';
import { truncateWords } from '@/lib/utils';
import { useNewsArticles } from '@/shared/hooks/useNewsArticles';
import { useFavoritesStore } from '@/shared/stores/favorites.store';
import PageLayout from '../../layouts/PageLayout';

const ProductDetail: FC = () => {
    const { url: encodedUrl } = useParams<{ url: string }>();
    const navigate = useNavigate();

    const { visibleArticles: allArticles } = useNewsArticles();
    const toggleFavorite = useFavoritesStore(s => s.toggleFavorite);

    if (!encodedUrl) {
        return (
            <PageLayout>
                <div className="text-center text-red-600">
                    Invalid article URL
                </div>
            </PageLayout>
        );
    }

    const url = decodeURIComponent(encodedUrl);
    const article = allArticles.find(a => a.url === url);

    if (!article) {
        return (
            <PageLayout>
                <Button
                    onClick={() => navigate('/products')}
                    className="mb-6 flex items-center gap-2 text-blue-600 bg-transparent hover:text-blue-700 hover:bg-transparent"
                >
                    Back to Products
                </Button>
                <div className="text-center text-gray-500">
                    Article not found
                </div>
            </PageLayout>
        );
    }

    function onToggleFavorite(e: MouseEvent, url: string) {
        e.stopPropagation();
        toggleFavorite(url);
    }

    return (
        <PageLayout>
            <BreadcrumbNav
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: truncateWords(article.title) }
                ]}
            />

            <div className="max-w-2xl mx-auto mb-8">
                <ProductCard
                    article={article}
                    onToggleFavorite={onToggleFavorite}
                />
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
                {article.description && (
                    <p className="text-lg text-gray-700 mb-6">
                        {article.description}
                    </p>
                )}

                {article.content && (
                    <div className="prose prose-sm max-w-none mb-6">
                        <p className="text-gray-600 whitespace-pre-line">
                            {article.content}
                        </p>
                    </div>
                )}

                <div className="mt-6">
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block"
                    >
                        <Button variant="default">Read Full Article</Button>
                    </a>
                </div>
            </div>
        </PageLayout>
    );
};

export default ProductDetail;
