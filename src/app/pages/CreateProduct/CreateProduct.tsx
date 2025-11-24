import { type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";

import PageLayout from "../../layouts/PageLayout";
import useNewsStore from "@/shared/stores/news.store";
import {
  createProductSchema,
  type CreateProductFormData
} from "@/shared/schemas/createProduct.schema";
import { createArticleFromFormData } from "@/shared/helpers/articleHelpers";
import { TextInputField, TextAreaField } from "@/components/FormFields";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const CreateProduct: FC = () => {
  const navigate = useNavigate();
  const addArticle = useNewsStore((s) => s.addArticle);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data: CreateProductFormData) => {
    const newArticle = createArticleFromFormData(data);
    addArticle(newArticle);
    navigate("/products");
  };

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
              <Link to='/products'>Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='max-w-2xl mx-auto'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>Create New Article</h2>
          <p className='text-gray-600'>
            Fill in the form to create a new article
          </p>
        </div>

        <div className='space-y-6'>
          <TextInputField
            id='title'
            label='Title'
            required
            placeholder='Enter article title (max 128 characters)'
            register={register}
            error={errors.title?.message as string | undefined}
          />

          <TextAreaField
            id='description'
            label='Description'
            required
            placeholder='Enter article description (max 1024 characters)'
            rows={6}
            register={register}
            error={errors.description?.message as string | undefined}
          />

          <TextInputField
            id='urlToImage'
            label='Image URL'
            required
            type='url'
            placeholder='https://example.com/image.jpg'
            register={register}
            error={errors.urlToImage?.message as string | undefined}
          />

          <div className='flex items-center gap-4 pt-4'>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className='flex-1'
            >
              {isSubmitting ? "Creating..." : "Create Article"}
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

export default CreateProduct;
