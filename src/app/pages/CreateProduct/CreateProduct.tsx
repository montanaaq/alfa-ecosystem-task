import { type FC } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import PageLayout from "../../layouts/PageLayout";

import { CATEGORIES } from "@/shared/constants/categories.const";
import { useUserArticlesStore } from "@/shared/stores/user-articles.store";
import { createArticleFromFormData } from "@/shared/helpers/articleHelpers";
import {
  createProductSchema,
  type CreateProductFormData
} from "@/shared/schemas/createProduct.schema";

import { Button } from "@/components/ui/button";
import { TextInputField, TextAreaField } from "@/components/FormFields";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from "@/components/ui/select";
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
  const addArticle = useUserArticlesStore((s) => s.addArticle);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    mode: "onBlur"
  });

  const category = watch("category");

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
          <div className='flex flex-col gap-2'>
            <label htmlFor='category' className='text-sm font-medium'>
              Category
            </label>

            <Select
              value={category}
              onValueChange={(val) =>
                setValue("category", val, { shouldValidate: true })
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

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
