import { GlobalProps } from "@/App";
import { useNavigate } from "react-router-dom";
import Routes from "@/navigations/routes";
import CommonNavbar from "@/components/admin/navbar/CommonNavbar";
import SizeBox from "@/components/SizeBox";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import DialogBox from "@/components/DialogBox";
import { Close } from "@mui/icons-material";
import CategoryMenu from "@/components/admin/product/category/CategoryMenu";
import CategoryCardComponent from "@/components/admin/product/category/CategoryCardComponent";
import { ProductCategoryCreateErrRes } from "@/networks/mutations/admin/product_category/create";
import { ProductCategoryUpdateErrRes } from "@/networks/mutations/admin/product_category/update";
import { ProductSubCategoryUpdateErrRes } from "@/networks/mutations/admin/product_sub_category/update";
import SubCategoryDeleteConfirm from "@/components/admin/product/category/model_box/SubCategoryDeleteConfirm";
import SubCategoryUpdate from "@/components/admin/product/category/model_box/SubCategoryUpdate";
import SubCategoryCreate from "@/components/admin/product/category/model_box/SubCategoryCreate";
import CategoryUpdate from "@/components/admin/product/category/model_box/CategoryUpdate";
import CategoryDeleteConfirm from "@/components/admin/product/category/CategoryDeleteConfirm";
import CategoryCreate from "@/components/admin/product/category/CategoryCreate";
import { product_category } from "@/types/product/product_category";

const ProductCategoryScreen = ({ setIsAdmin, mutations, categories, setCategories }: GlobalProps) => {
    const navigate = useNavigate();

    const [categoryData,setCategoryData] = useState<Array<product_category>>(categories);

    const [openSearch, setOpenSearch] = useState<boolean>(false);

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    //search product category
    const [searchCategory, setSearchCategory] = useState<string>("");
    const [categroyDataCount, setCategroyDataCount] = useState<number>(0);

    // Create Category
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryCreateErr, setCategoryCreateErr] = useState<string>("");
    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState<boolean>(false);

    // Update Category
    const [productCategoryId, setProductCategoryId] = useState<number>(0); // for update
    const [openUpdateCategoryDialog, setOpenUpdateCategoryDialog] = useState<boolean>(false);

    //sub cat create
    const [subCategoryName, setSubCategoryName] = useState<string>("");
    const [subCategoryNameErr, setSubCategoryNameErr] = useState<string>("");
    const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState<boolean>(false);

    //update sub cat
    const [openUpdateSubCategoryDialog, setOpenUpdateSubCategoryDialog] = useState<boolean>(false);
    const [productSubCategoryId, setProductSubCategoryId] = useState<number>(0);

    //delete sub cat
    const [openDeleteSubCategoryDialog, setOpenDeleteSubCategoryDialog] = useState<boolean>(false);

    // const keydownListener = (event: KeyboardEvent) => {
    //     // do action
    //     if (event.key === "Enter") {
    //       //  searchProductCategory();
    //         if(openSearch) {
    //             searchProductCategory();
    //         }
    //         if(openCreateCategoryDialog) {
    //             createNewCategoryAction();
    //         }
    //         if(openUpdateCategoryDialog) {
    //             updateCategoryAction();
    //         }
    //         if(openSubCategoryDialog) {
    //             createSubCatAction();
    //         }
    //         if(openUpdateSubCategoryDialog) {
    //             updateSubCategoryAction();
    //         }
    //     }
    // }

    useEffect(() => {
        setCategroyDataCount(categories.length);
        // if (openSearch || openCreateCategoryDialog || openUpdateCategoryDialog || 
        //     openSubCategoryDialog || openUpdateSubCategoryDialog) {
        //     // add listener
        //     window.addEventListener("keydown", keydownListener);
        // }
        // return () => {
        //     // remove listener
        //     window.removeEventListener("keydown", keydownListener);
        // }
    },[]);


    const deleteCategoryAction = (product_category_id: number) => {
        mutations.admin.productCategory.delete({ product_category_id })
            .then(() => {
                setConfirmDelete(false);
                const updatedCategories = categories.filter(({ product_category_id: pId }) => pId !== product_category_id);
                setCategories(updatedCategories);
                setCategoryData(updatedCategories);
                setCategroyDataCount(categories.length);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // update category
    const updateCategoryAction = () => {
        setCategoryCreateErr("");
        if (categoryName) {
            mutations.admin.productCategory.update({ product_category_name: categoryName, id: productCategoryId })
                .then(() => {
                    const updatedCategories = categories.map(cat =>
                        cat.product_category_id === productCategoryId ? { ...cat, product_category_name: categoryName } : cat
                    )
                    setCategories(updatedCategories);
                    setCategoryData(updatedCategories);
                    setOpenUpdateCategoryDialog(false);

                })
                .catch((err: ProductCategoryUpdateErrRes) => {
                    setCategoryCreateErr(err.message);

                })
        }
        else {
            setCategoryCreateErr("商品カテゴリー名を入力してください。");
        }
    }

    // create category
    const createNewCategoryAction = () => {
        setCategoryCreateErr("");
        if (categoryName) {
            // api call with mutation
            mutations.admin.productCategory.create({ name: categoryName })
                .then((ans) => {
                    setOpenCreateCategoryDialog(false);
                    setCategoryName("");
                    setCategories([...categories, ans.data]);
                    setCategoryData([...categories, ans.data]);
                    setCategroyDataCount(categories.length);
                })
                .catch((err: ProductCategoryCreateErrRes) => {
                    setCategoryCreateErr(err.message);

                })
        } else {
            setCategoryCreateErr("商品カテゴリー名を入力してください。");
        }
    }
    // End Create Category

    // create Sub Category
    const createSubCatAction = () => {
        setSubCategoryNameErr("");
        if (subCategoryName) {
            mutations.admin.productSubCategory.create({ name: subCategoryName, product_category_id: productCategoryId })
                .then((ans) => {
                    setOpenSubCategoryDialog(false);
                    setSubCategoryName("");
                    const updatedCategories = categories.map((cat) => {
                        return cat.product_category_id === productCategoryId ? { ...cat, product_sub_category: [...cat.product_sub_category, ans.data] } : cat
                    });
                    setCategories(updatedCategories);
                    setCategoryData(updatedCategories);
                })
                .catch((err: ProductSubCategoryUpdateErrRes) => {
                    setSubCategoryNameErr(err.message);
                })

        } else {
            setSubCategoryNameErr("商品サブカテゴリー名を入力してください。");
        }
    }

    // update sub category
    const updateSubCategoryAction = () => {
        setSubCategoryNameErr("");
        if (subCategoryName) {
            mutations.admin.productSubCategory.update({ name: subCategoryName, id: productSubCategoryId })
                .then(() => {
                    const updatedCategories = categories.map((cat) => {
                        if (cat.product_category_id === productCategoryId) {
                            // update cat
                            const updatedSubCategories = cat.product_sub_category.map(subCat => {
                                return subCat.product_sub_category_id === productSubCategoryId ? { ...subCat, name: subCategoryName } : subCat
                            });
                            return { ...cat, product_sub_category: updatedSubCategories };
                        } else {
                            return cat;
                        }
                    })
                    setCategories(updatedCategories);
                    setCategoryData(updatedCategories);

                })
                .catch((err: ProductSubCategoryUpdateErrRes) => {
                    setSubCategoryNameErr(err.message);
                })
        }
        else {
            setSubCategoryNameErr("商品サブカテゴリー名を入力してください");
        }
    }
    //delete Sub Category Action
    const deleteSubCategoryAction = (product_sub_category_id: number) => {
        mutations.admin.productSubCategory.delete(product_sub_category_id)
            .then(() => {
                setOpenDeleteSubCategoryDialog(false);
                const updatedCategories = categories.map((cat => {
                    if (cat.product_category_id === productCategoryId) {
                        const updatedSubCategories = cat.product_sub_category.filter(
                            ({ product_sub_category_id: subId }) => subId !== product_sub_category_id
                        );
                        return { ...cat, product_sub_category: updatedSubCategories };
                    } else {
                        return cat;
                    }
                }))
                setCategories(updatedCategories);
                setCategoryData(updatedCategories);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const breadcrubItems = [
        {
            title: "メニュー",
            action: () => {
                navigate(Routes.ADMIN.HOME);

            },
        },
        {
            title: "商品カテゴリ一覧",
            action: () => { },
        },
    ];

    const closeAction = () => {
        setOpenCreateCategoryDialog(false);
        setOpenUpdateCategoryDialog(false);
        setOpenUpdateSubCategoryDialog(false);
        setOpenSubCategoryDialog(false);
        setOpenDeleteSubCategoryDialog(false);
        setOpenSearch(false);
        setSearchCategory("");
        setCategoryName("");
        setCategoryCreateErr("");
        setSubCategoryName("");
        setSubCategoryNameErr("");
    }

    const searchProductCategory = () => {
        mutations.admin.productCategory.get(searchCategory)
            .then((ans) => {
                setCategoryData(ans.data);
                setCategroyDataCount(ans.data.length);
                setOpenSearch(false);
                setSearchCategory("");
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
            <CommonNavbar setIsAdmin={setIsAdmin} breadcrubItems={breadcrubItems} />

            <SizeBox h={95} />

            <CategoryMenu title={`商品カテゴリ一覧（${categroyDataCount}個）`} openDialog={setOpenSearch}
                createAction={() => setOpenCreateCategoryDialog(true)} />

            <SizeBox h={10} />

            <div className="mx-[25px] grid grid-cols-4 gap-[45px]">
                {/* productCategories categories */}
                {categoryData.map(({ product_category_id, product_category_name, product_sub_category }) => {
                    return <CategoryCardComponent key={product_category_id}
                        product_category_id={product_category_id}
                        product_category_name={product_category_name}
                        setConfirmDelete={setConfirmDelete}
                        setProductCategoryId={setProductCategoryId}
                        setCategoryName={setCategoryName}
                        setOpen={setOpenUpdateCategoryDialog}
                        setOpenSubCat={setOpenSubCategoryDialog}
                        setSubCategoryName={setSubCategoryName}
                        setOpenUpdateSubCategoryDialog={setOpenUpdateSubCategoryDialog}
                        product_sub_category={product_sub_category}
                        setProductSubCategoryId={setProductSubCategoryId}
                        setOpenDeleteSubCategoryDialog={setOpenDeleteSubCategoryDialog} />
                })}
            </div>
            <SizeBox h={100} />

            {/* Add Category Dialog */}
            <CategoryCreate
                open={openCreateCategoryDialog}
                setOpen={setOpenCreateCategoryDialog}
                closeAction={closeAction}
                categoryName={categoryName}
                categoryNameErr={categoryCreateErr}
                setCategoryName={setCategoryName}
                createCatAction={createNewCategoryAction}

            />

            {/* Search Category Dialog */}
            <DialogBox open={openSearch} setOpen={setOpenSearch} size="xs">
                {/* Title */}
                <div className="flex flex-row">
                    <div className="flex-1 my-[20px] text-[25px] text-center text-blue-800">検索</div>
                    <Close onClick={closeAction} className="text-black w-[50px] h-[50px] nav mt-[30px] mr-[40px]" />
                </div>
                <hr></hr>
                {/* Body */}
                <div className="flex flex-row pt-10 ml-[30px] mr-[30px]">
                    <TextField className="flex-1 bg-bgcolor" multiline rows={2}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        value={searchCategory}
                        id="outlined-basic"
                        label="商品カテゴリー"
                        variant="outlined" />
                    <SizeBox h={15} />
                </div>
                {/* footer */}
                <div className="flex flex-row pt-7 pb-7 ml-[30px] mr-[30px]">
                    <Button onClick={searchProductCategory} className="flex-1" variant="contained">検索</Button>
                </div>
            </DialogBox>

            {/* Delete Category Dialog Box */}
            <CategoryDeleteConfirm
                open={confirmDelete}
                setOpen={setConfirmDelete}
                confirmAction={deleteCategoryAction}
                productCategoryId={productCategoryId}
            />

            {/* Update Dialog Box */}
            <CategoryUpdate
                open={openUpdateCategoryDialog}
                setOpen={setOpenUpdateCategoryDialog}
                closeAction={closeAction}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryCreateErr={categoryCreateErr}
                updateCatAction={updateCategoryAction}
            />

            {/* Add Sub Category Dialog */}
            <SubCategoryCreate
                open={openSubCategoryDialog}
                setOpen={setOpenSubCategoryDialog}
                closeAction={closeAction}
                subCategoryName={subCategoryName}
                setSubCategoryName={setSubCategoryName}
                subCategoryNameErr={subCategoryNameErr}
                createSubCatAction={createSubCatAction}
            />

            {/* Update Sub Category Dialog Box */}
            <SubCategoryUpdate
                open={openUpdateSubCategoryDialog}
                setOpen={setOpenUpdateSubCategoryDialog}
                closeAction={closeAction}
                subCategoryName={subCategoryName}
                setSubCategoryName={setSubCategoryName}
                subCategoryNameErr={subCategoryNameErr}
                updateSubCategoryAction={updateSubCategoryAction}
            />


            {/* Delete Sub Category Dialog Box */}
            <SubCategoryDeleteConfirm
                open={openDeleteSubCategoryDialog}
                setOpen={setOpenDeleteSubCategoryDialog}
                confirmAction={deleteSubCategoryAction}
                productSubCategoryId={productSubCategoryId}
            />
        </div>
    );
}

export default ProductCategoryScreen;