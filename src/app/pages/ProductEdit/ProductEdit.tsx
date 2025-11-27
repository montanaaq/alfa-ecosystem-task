import { type FC, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import PageLayout from "../../layouts/PageLayout";

import { useUserArticlesStore } from "@/shared/stores/user-articles.store";
import {
  createProductSchema,
  type CreateProductFormData
} from "@/shared/schemas/createProduct.schema";

import { Button } from "@/components/ui/button";
import TextInputField from "@/components/FormFields/TextInputField";
import TextAreaField from "@/components/FormFields/TextAreaField";
import CategorySelector from "@/components/CategorySelector/CategorySelector";
import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";

const ProductEdit: FC = () => {
  const navigate = useNavigate();
  const { url } = useParams<{ url: string }>();

  const getArticleByUrl = useUserArticlesStore((s) => s.getArticleByUrl);
  const updateArticle = useUserArticlesStore((s) => s.updateArticle);

  const decodedUrl = url ? decodeURIComponent(url) : "";
  const article = getArticleByUrl(decodedUrl);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    mode: "onBlur",
    defaultValues: article
      ? {
          title: article.title || "",
          description: article.description || "",
          urlToImage: article.urlToImage || "",
          category: article.category || ""
        }
      : undefined
  });

  useEffect(() => {
    if (!article) {
      navigate("/products");
    }
  }, [article, navigate]);

  const category = getValues("category");

  const canEditCategory = article?.source?.id === "custom";

  const onSubmit = async (data: CreateProductFormData) => {
    if (!article) return;

    const updatedArticle = {
      ...article,
      title: data.title,
      description: data.description,
      urlToImage: data.urlToImage,
      category: canEditCategory ? data.category : article.category,
      content: data.description
    };

    updateArticle(decodedUrl, updatedArticle);
    navigate("/products");
  };

  if (!article) {
    return null;
  }

  return (
    <PageLayout>
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Edit Product" }
        ]}
      />

      <div className='max-w-2xl mx-auto'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>Edit Article</h2>
          <p className='text-gray-600'>Update the article information below</p>
        </div>

        <div className='space-y-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='category' className='text-sm font-medium'>
              Category{" "}
              {!canEditCategory && (
                <span className='text-gray-500'>(read-only)</span>
              )}
            </label>

            <div
              className={
                !canEditCategory ? "opacity-50 pointer-events-none" : ""
              }
            >
              <CategorySelector
                value={category}
                onValueChange={(val) =>
                  setValue("category", val, { shouldValidate: true })
                }
                useStore={false}
              />
            </div>

            {errors.category && (
              <p className='text-sm text-red-500'>{errors.category.message}</p>
            )}
          </div>

          <TextInputField
            id='title'
            label='Title'
            required
            placeholder='Enter article title (max 128 characters)'
            register={register}
            error={errors.title?.message}
          />

          <TextAreaField
            id='description'
            label='Description'
            required
            placeholder='Enter article description (max 1024 characters)'
            rows={6}
            register={register}
            error={errors.description?.message}
          />

          <TextInputField
            id='urlToImage'
            label='Image URL'
            required
            type='url'
            placeholder='https://example.com/image.jpg'
            register={register}
            error={errors.urlToImage?.message}
          />

          <div className='flex items-center gap-4 pt-4'>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className='flex-1'
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>

            <Button
              variant='outline'
              onClick={() => navigate("/products")}
              className='flex-1'
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductEdit;
