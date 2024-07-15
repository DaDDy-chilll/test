import SizeBox from "@/components/SizeBox";
import chitosan01 from "@/assets/user/product_detail/specification/product_chitosan/chitosan_img01.png";
import chitosan02 from "@/assets/user/product_detail/specification/product_chitosan/chitosan_img02.png";
import chitosan03 from "@/assets/user/product_detail/specification/product_chitosan/chitosan_img03.png";
import Certificate from "./Certificate";

const ProdcutB = ()=>{
    const takingProducts = [
        {
            number: "1）",
            title: "高カルシウム血症がある場合、または医薬品服用の際は専門家にご相談ください。"
        },
        {
            number: "2）",
            title: "異常事例が発生した場合は、摂取を中止して専門家に相談してください。"
        },
        {
            number: "3）",
            title: "付属の防湿剤を摂取しないでください。"
        },
        {
            number: "4）",
            title: "特異体質またはアレルギー体質の場合は、原料の成分を確認してから摂取してください。"
        },
        {
            number: "5）",
            title: "乳児、幼児、妊婦、授乳婦や病気保有者または薬物を服用中の方は、摂取前に医師、薬剤師など専門家と相談してください。"
        },
        {
            number: "6）",
            title: "摂取量及び摂取方法を遵守しその他の事項は消費者相談室にお問い合わせください。"
        },
        {
            number: "7）",
            title: "製品の開封または摂取時に包装材により傷つくことがありますのでご注意ください。"
        }, 
        {
            number: "8）",
            title: "子供の手の届かないところに保管してください。"
        }
    ];

    return <div>
        <div className="mx-auto bg-white p-[20px]">
            <div className="text-[#285DBD] text-[20px] font-bold leading-[30px]">商品詳細</div>
            <SizeBox h={30} />
            <div className="flex flex-row justify-between">
                <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] p-[30px]">
                    <div className="text-[20px] text-[#285DBD] font-bold text-center leading-[26px]">キトサン</div>
                    <SizeBox h={20} />
                    <div className="text-center">
                        <img src={chitosan01} alt="商品詳細" className="text-center mx-auto" />
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">血中コレステロール改善に役立つ</div>
                        <div className="lg:mx-[85px] text-[#000000cc] leading-[26px]">
                            <div className="text-[20px] font-bold">キトサンとは？</div>
                            <div className="text-[13px] font-medium">カニやロブスター、エビの皮に含まれるキチンを脱アセチル化して得た物質をいい、
                            1811年にフランスの科学者ブロカーノがキノコに含まれている未知の成分、
                            つまりキチンを発見したのが始まりです。</div>
                            <SizeBox h={10} />
                            <div className="text-[13px] font-medium">その後、1859年に化学者ルゲがキチンを脱アセチル化して新しい物質を得て、
                            1894年に科学者フペザイラがキトサンと名付けました。</div>
                        </div>
                    </div>
                </div>
                <SizeBox w={25} />
                <div className="flex-[1] text-center leading-[26px] rounded-[10px] bg-[#F2F5FB] p-[35px]">
                    <div className="text-[20px] font-bold text-[#285DBD]">エイペクセルキトサン15回分</div>
                    <div className="text-[13px] font-medium text-[#000000cc]">277.5mg×30カプセル (8.325g)×2Box (16.65g)</div>
                    <SizeBox h={25} />
                    <div className="text-[#000000cc] text-[13px] font-medium mx-[180px]">米国世界最大の食品科学博覧会IFT Food EXPOで100カ国 1,000社ほどの世界的な企業が参観した中で、エイペクセル・カルシウムが72年伝統、<span className="font-bold">韓国唯一技術革新大賞</span>を受賞しました。</div>
                    <SizeBox h={35} />
                    <div>
                        <img src={chitosan02} alt="72年伝統、米国 IFT Food Expo 技術革新大賞受賞" className="text-center mx-auto" />
                    </div>
                </div>
            </div>
            <SizeBox h={20} />
            <div className="rounded-[10px] bg-[#F2F5FB] px-[120px] py-[40px]">
                <div className="text-[20px] font-bold text-[#285DBD] text-center leading-[26px]">こんな方におすすめ</div>
                <SizeBox h={15} />
                <div className="flex flex-row">
                    <div className="flex-[1]">
                        <img src={chitosan03} alt="こんな方におすすめ" className="ml-auto" />
                    </div>
                    <SizeBox w={25} />
                    <div className="flex-[2]">
                        <div className="text-[13px] text-[#000000cc] font-bold leading-[26px]">①コレステロールの改善</div>
                        <div className="text-[13px] text-[#000000cc] font-light leading-[26px] lg:pr-[200px]">摂取した脂肪が吸収されるには胆汁酸が必要であり、胆汁酸は肝臓で
                        コレステロールを原料として生成されます。
                        胆汁酸は脂肪を柔和し吸収させる役割を果たして、再利用されます。
                        腸にキトサン食物繊維がある場合、キトサンが胆汁酸を吸着して排泄します。
                        その結果肝臓では消耗した胆汁酸を再生成するために
                        胆汁酸原料であるコレステロールを抜いて使用するので
                        血中コレステロール値が減少することになります。</div>
                        <SizeBox h={20} />
                        <div className="text-[13px] text-[#000000cc] font-bold leading-[26px]">②コレステロール改善によるダイエット</div>
                        <div className="text-[13px] text-[#000000cc] font-light leading-[26px]">体内のコレステロールが減ると新陳代謝が活発になり、ダイエット効果も繋がります。</div>
                    </div>
                </div>
            </div>
            <SizeBox h={20} />
            <div className="flex flex-row justify-between">
                <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] p-[30px]">
                    <div className="text-[20px] text-[#285DBD] font-bold leading-[26px] text-center">製品の詳細</div>
                    <SizeBox h={15} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">製品名</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">エイペクセル キトサン</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">名　称</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">健康補助食品</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">原材料名</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">亜鉛酵母、マンガン酵母／貝殻焼成カルシウム、HPMC、酸化Mg、コレカルシフェロール、ヒアルロン酸、ゲル化剤（増粘多糖類）、乳化剤、塩化Mg</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">お召し上がり方</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">1日2回、1回4カプセル (1,110mg) を目安に十分な水などと一緒にお召し上がりください。</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">賞味期限</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">2025.6.8</div>
                    </div>
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">保存方法</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">高温多湿を避けて、直射日光の当たらない涼しい場所に保管してください。</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">保管時の注意事項</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">子供の手の届かないところに保管してください。</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">原産国名</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">韓国</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">輸入者</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">株式会社ユーフォリアプラス
                        東京都中央区日本橋横山町 3-1 横山町ダイカンプラザ 501室</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">お問い合わせ</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">03-6661-9531</div>
                    </div>
                </div>
                <SizeBox w={25} />
                <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] p-[30px]">
                    <div className="text-[20px] text-[#285DBD] text-center font-bold">摂取時の注意事項</div>
                    <SizeBox h={25} />                
                    {
                        takingProducts.map(({number, title}, index) => {
                            return <div key={index} className="flex flex-row mb-[20px] lg:mr-[50px]">
                            <div className="flex text-[#000000cc] text-[13px] font-medium leading-[21px] tracking-[1.3px]">{number}</div>
                            <div className="flex-[2] text-[#000000cc] text-[13px] font-medium leading-[21px] tracking-[1.3px]">{title}</div>
                        </div>
                        })
                    }
                </div>
            </div>
            <SizeBox h={20} />
            <Certificate />
        </div>
    </div>
}

export default ProdcutB;