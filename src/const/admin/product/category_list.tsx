
 type Category = {
    product_category_id: number;
    product_category_name: string;
    product_sub_category: Array<SubCategory>;
    created_at: string;
    updated_at: string;
}

type SubCategory = {
    product_sub_category_id: number;
    product_category_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export const categories: Array<Category> = [
    {
        product_category_id: 1,
        product_category_name: "化粧品",
        product_sub_category: [
            {
                product_sub_category_id: 1,
                product_category_id: 1,
                name: "サプリメント1",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 2,
                product_category_id: 1,
                name: "シャンプ",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 3,
                product_category_id: 1,
                name: "香水",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 4,
                product_category_id: 1,
                name: "マーク",
                created_at: "",
                updated_at: ""
            },
        ],
        created_at: "",
        updated_at: "",
    },
    {
        product_category_id: 2,
        product_category_name: "化粧品",
        product_sub_category: [
            {
                product_sub_category_id: 1,
                product_category_id: 2,
                name: "サプリメント2",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 2,
                product_category_id: 2,
                name: "シャンプ",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 3,
                product_category_id: 2,
                name: "香水",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 4,
                product_category_id: 2,
                name: "マーク",
                created_at: "",
                updated_at: ""
            },
        ],
        created_at: "",
        updated_at: "",
    },
    {
        product_category_id: 3,
        product_category_name: "化粧品",
        product_sub_category: [
            {
                product_sub_category_id: 1,
                product_category_id: 2,
                name: "サプリメント3",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 2,
                product_category_id: 2,
                name: "シャンプ",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 3,
                product_category_id: 2,
                name: "香水",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 4,
                product_category_id: 2,
                name: "マーク",
                created_at: "",
                updated_at: ""
            },
        ],
        created_at: "",
        updated_at: "",
    },
    {
        product_category_id: 4,
        product_category_name: "化粧品",
        product_sub_category: [
            {
                product_sub_category_id: 1,
                product_category_id: 2,
                name: "サプリメント4",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 2,
                product_category_id: 2,
                name: "シャンプ",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 3,
                product_category_id: 2,
                name: "香水",
                created_at: "",
                updated_at: ""
            },
            {
                product_sub_category_id: 4,
                product_category_id: 2,
                name: "マーク",
                created_at: "",
                updated_at: ""
            },
        ],
        created_at: "",
        updated_at: "",
    }
]