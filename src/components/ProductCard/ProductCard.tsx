import { type FC, type MouseEvent } from "react";
import { useNavigate } from "react-router";
import { Heart, Trash, Settings } from "lucide-react";

import { dateFormatter } from "@/lib/utils";
import type { IArticle } from "@/shared/types/types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { useFavoritesStore } from "@/shared/stores/favorites.store";

interface ProductCardProps {
  article: IArticle;
  onDelete?: (e: MouseEvent, url: string) => void;
  onToggleFavorite: (e: MouseEvent, url: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  article,
  onDelete,
  onToggleFavorite
}) => {
  const navigate = useNavigate();

  const favorites = useFavoritesStore((s) => s.favorites);

  function onOpenArticle(url: string) {
    const encoded = encodeURIComponent(url);
    navigate(`/products/${encoded}`);
  }

  function onEditArticle(e: MouseEvent, url: string) {
    e.stopPropagation();
    const encoded = encodeURIComponent(url);
    navigate(`/products/edit/${encoded}`);
  }

  const isLiked = (url: string) => {
    return Boolean(favorites[url]);
  };

  const canEdit = article.source?.id === "custom";

  return (
    <Card
      className='flex flex-col overflow-hidden cursor-pointer min-h-full hover:bg-neutral-100 transition-colors duration-100'
      onClick={() => onOpenArticle(article.url)}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title ?? "article"}
          className='h-60 w-full object-cover'
          draggable={false}
        />
      )}

      <CardHeader className='flex-1'>
        <CardTitle className='line-clamp-2'>{article.title}</CardTitle>
        <CardDescription className='line-clamp-3'>
          {article.description}
        </CardDescription>
      </CardHeader>

      <CardContent className='text-sm text-gray-600'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='font-medium'>{article.source.name}</span>
            <span>•</span>
            <span>
              {article.publishedAt ? dateFormatter(article.publishedAt) : ""}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <button
              aria-label='Like'
              onClick={(e) => onToggleFavorite(e, article.url)}
              className='rounded p-1 hover:bg-gray-100'
              title={isLiked(article.url) ? "Unlike" : "Like"}
            >
              <Heart
                size={18}
                className={
                  isLiked(article.url) ? "text-red-600" : "text-gray-600"
                }
                fill={isLiked(article.url) ? "currentColor" : "none"}
              />
            </button>
            {canEdit && (
              <button
                aria-label='Edit'
                onClick={(e) => onEditArticle(e, article.url)}
                className='rounded p-1 hover:bg-gray-100'
                title='Edit'
              >
                <Settings className='text-gray-600' size={18} />
              </button>
            )}
            {onDelete && (
              <button
                aria-label='Delete'
                onClick={(e) => onDelete(e, article.url)}
                className='rounded p-1 hover:bg-gray-100'
                title='Delete'
              >
                <Trash className='text-gray-600' size={18} />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
