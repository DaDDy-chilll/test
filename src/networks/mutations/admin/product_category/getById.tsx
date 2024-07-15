import ApiService from "@/networks/services";
import { ProductCategory } from "@/types/productcategory/product_category"

type GetProductCategoryByIdRes ={ 
    status: string;
    message: string;
    code: number;
    data: Array<ProductCategory>;
}

const getProdcutCategoryById = (id : number) : Promise<GetProductCategoryByIdRes> => { 
    return new Promise((resolve,reject) => {
        ApiService.admin.get("/category/"+id)
        .then(ans => {
            resolve(ans.data);
        })
        .catch(err=>{
            reject(err.response.data);
        })
    })
}

export default getProdcutCategoryById;