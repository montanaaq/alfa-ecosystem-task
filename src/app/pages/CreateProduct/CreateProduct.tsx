import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import PageLayout from '@/app/layouts/PageLayout';
import BreadcrumbNav from '@/components/BreadcrumbNav/BreadcrumbNav';
import CategorySelector from '@/components/CategorySelector/CategorySelector';
import { TextAreaField, TextInputField } from '@/components/FormFields';
import { Button } from '@/components/ui/button';
import { createArticleFromFormData } from '@/shared/helpers/articleHelpers';
import {
    type CreateProductFormData,
    createProductSchema
} from '@/shared/schemas/createProduct.schema';
import { useUserArticlesStore } from '@/shared/stores/user-articles.store';

const CreateProduct: FC = () => {
    const navigate = useNavigate();
    const addArticle = useUserArticlesStore(s => s.addArticle);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isSubmitting }
    } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema),
        mode: 'onBlur'
    });

    const category = getValues('category');

    const onSubmit = async (data: CreateProductFormData) => {
        const newArticle = createArticleFromFormData(data);
        addArticle(newArticle);
        navigate('/products');
    };

    return (
        <PageLayout>
            <BreadcrumbNav
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Create Product' }
                ]}
            />

            <div className="max-w-2xl mx-auto flex flex-col gap-4">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">
                        Create New Article
                    </h2>
                    <p className="text-gray-600">
                        Fill in the form to create a new article
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-sm font-medium">
                        Category
                    </label>

                    <CategorySelector
                        useStore={false}
                        value={category}
                        onValueChange={val =>
                            setValue('category', val, {
                                shouldValidate: true
                            })
                        }
                    />

                    {errors.category && (
                        <p className="text-sm text-red-500">
                            {errors.category.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <TextInputField
                        id="title"
                        label="Title"
                        required
                        placeholder="Enter article title (max 128 characters)"
                        register={register}
                        error={errors.title?.message as string | undefined}
                    />

                    <TextAreaField
                        id="description"
                        label="Description"
                        required
                        placeholder="Enter article description (max 1024 characters)"
                        rows={6}
                        register={register}
                        error={
                            errors.description?.message as string | undefined
                        }
                    />

                    <TextInputField
                        id="urlToImage"
                        label="Image URL"
                        required
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        register={register}
                        error={errors.urlToImage?.message as string | undefined}
                    />

                    <div className="flex items-center gap-4 pt-4">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Article'}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => navigate('/products')}
                            className="flex-1"
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
