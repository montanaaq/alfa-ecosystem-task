import { type FC, type MouseEvent } from "react";

import PageLayout from "../../layouts/PageLayout";

import useNewsData from "@/services/hooks/useNewsData";

import type { IArticle } from "@/shared/types/types";
import useNewsStore from "@/shared/stores/news.store";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import ProductCard from "@/components/ProductCard/ProductCard";
import CategorySelector from "@/components/CategorySelector/CategorySelector";
import { Link, useNavigate } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useNewsArticles } from "@/services/hooks/useNewsArticles";
import SearchField from "@/components/SearchField/SearchField";

const Products: FC = () => {
  const { loading, error } = useNewsData();
  const navigate = useNavigate();

  const filter = useNewsStore((s) => s.filter);
  const setFilter = useNewsStore((s) => s.setFilter);
  const toggleFavorite = useNewsStore((s) => s.toggleFavorite);
  const removeArticle = useNewsStore((s) => s.removeArticle);

  const { visibleArticles } = useNewsArticles();

  function onDelete(e: MouseEvent, url: string) {
    e.stopPropagation();
    removeArticle(url);
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
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h2 className='text-2xl font-semibold mr-4'>News</h2>
          <div className='flex items-center gap-2'>
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "favorites" ? "default" : "ghost"}
              onClick={() => setFilter("favorites")}
            >
              Favorites
            </Button>
            <CategorySelector />
          </div>
        </div>
        <SearchField />
        <Button variant='outline' onClick={() => navigate("/create-product")}>
          Create New Article
        </Button>
      </div>

      {loading && <Spinner />}
      {error && (
        <div className='rounded bg-red-100 p-4 text-red-700'>
          Error: {error.message}
        </div>
      )}

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {visibleArticles.map((article: IArticle) => (
          <ProductCard
            key={article.url}
            article={article}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {!loading && visibleArticles.length === 0 && (
        <div className='text-center text-gray-500 mt-6'>
          {filter === "favorites"
            ? "No favorite articles yet. Add some by clicking the heart icon!"
            : "No articles found"}
        </div>
      )}
    </PageLayout>
  );
};

export default Products;
