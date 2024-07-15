import SizeBox from "@/components/SizeBox";
import nano01 from "@/assets/user/product_detail/specification/product_nano/nano_img01.png";
import nano02 from "@/assets/user/product_detail/specification/product_nano/nano_img02.png";
import nano03 from "@/assets/user/product_detail/specification/product_nano/nano_img03.png";
import plus from "@/assets/user/product_detail/specification/product_nano/nano_plus.png";
import nano04 from "@/assets/user/product_detail/specification/product_nano/nano_img04.png";
import nano05 from "@/assets/user/product_detail/specification/product_nano/nano_img05.png";
import nano06 from "@/assets/user/product_detail/specification/product_nano/nano_img06.png";
import nano07 from "@/assets/user/product_detail/specification/product_nano/nano_img07.png";
import nano08 from "@/assets/user/product_detail/specification/product_nano/nano_img08.png";
import nano09 from "@/assets/user/product_detail/specification/product_nano/nano_img09.png";
import nano10 from "@/assets/user/product_detail/specification/product_nano/nano_img10.png";
import nano11 from "@/assets/user/product_detail/specification/product_nano/nano_img11.png";
import nano12 from "@/assets/user/product_detail/specification/product_nano/nano_img12.png";
import nano13 from "@/assets/user/product_detail/specification/product_nano/nano_img13.jpg";
import Certificate from "./Certificate";

const ProdcutA = ()=>{
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
        }
    ];


    return <div className="mx-auto bg-white p-[20px]">
        <div className="text-[#285DBD] text-[20px] font-bold leading-[30px]">商品詳細（アペクセルの乾式ナノ粉砕技術で製造 )</div>
        <SizeBox h={30} />
        <div className="flex flex-row justify-between">
            <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] p-[30px]">
                <div className="text-[20px] text-[#285DBD] font-bold text-center leading-[26px]">栄養機能情報 </div>
                <SizeBox h={20} />
                <div className="flex flex-row justify-evenly lg:mx-[70px]">
                    <div>
                        <img src={nano01} alt="カルシウム" className="mx-auto" />
                        <div className="text-center text-[13px] font-bold text-[#000000cc]">カルシウム</div>
                    </div>
                    <SizeBox w={65} />
                    <div>
                        <img src={nano02} alt="ビタミンD" className="mx-auto" />
                        <div className="text-center text-[13px] font-bold text-[#000000cc]">ビタミンD</div>
                    </div>
                    <SizeBox w={65} />
                    <div>
                        <img src={nano03} alt="マグネシウム" className="mx-auto" />
                        <div className="text-center text-[13px] font-bold text-[#000000cc]">マグネシウム</div>
                    </div>
                </div>
                <div className="my-[30px]">
                    <img src={plus} alt="plus" className="mx-auto" />
                </div>
                <div className="flex flex-row justify-evenly lg:mx-[50px]">
                    <div>
                        <img src={nano04} alt="ヒアルロン酸" className="mx-auto" />
                        <div className="text-center font-medium text-[13px] text-[#000000cc]">ヒアルロン酸</div>
                    </div>
                    <SizeBox w={20} />
                    <div>
                        <img src={nano05} alt="乾燥酵母（セレン含有）" className="mx-auto" />
                        <div className="text-center font-medium text-[13px] text-[#000000cc]">乾燥酵母（セレン含有）</div>
                    </div>
                    <SizeBox w={20} />
                    <div>
                        <img src={nano06} alt="酸化亜鉛" className="mx-auto" />
                        <div className="text-center font-medium text-[13px] text-[#000000cc]">酸化亜鉛</div>
                    </div>
                    <SizeBox w={20} />
                    <div>
                        <img src={nano07} alt="硫酸マンガン" className="mx-auto" />
                        <div className="text-center font-medium text-[13px] text-[#000000cc]">硫酸マンガン</div>
                    </div>
                </div>
            </div>
            <SizeBox w={25} />
            <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] p-[35px]">
                <div className="text-[20px] font-bold text-[#285DBD] text-center">72年伝統、米国 IFT Food Expo 技術革新大賞受賞</div>
                <SizeBox h={30} />
                <div className="text-center text-[#000000cc] text-[13px] font-medium leading-[26px] w-[50%] mx-auto">韓国食品医薬品安全処 広告審議協会から模倣不可能、世界初エイペクセルの乾式ナノ粉砕技術で製造米国世界最大の食品科学博覧会IFT Food EXPOで100カ国 1,000社ほどの世界的な企業が参観した中で、エイペクセル・カルシウムが72年伝統、<span className="font-bold">韓国唯一技術革新大賞を受賞</span>しました。</div>
                <SizeBox h={35} />
                <div>
                    <img src={nano08} alt="72年伝統、米国 IFT Food Expo 技術革新大賞受賞" className="text-center mx-auto" />
                </div>
            </div>
        </div>
        <SizeBox h={20} />
        <div className="flex flex-row justify-between">
            <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] p-[30px]">
                <div className="text-[20px] text-[#285DBD] text-center font-bold leading-[26px]">製品の特徴</div>
                <SizeBox h={20} />
                <div className="flex flex-row justify-evenly lg:mx-[80px]">
                    <div>
                        <img src={nano09} alt="カルシウム" className="mx-auto" />
                        <div className="text-center text-[13px] font-bold text-[#000000cc] pt-[5px]">カルシウム</div>
                    </div>
                    <SizeBox w={50} />
                    <div>
                        <img src={nano10} alt="マグネシウム" className="mx-auto" />
                        <div className="text-center text-[13px] font-bold text-[#000000cc] pt-[5px]">マグネシウム</div>
                    </div>
                    <SizeBox w={50} />
                    <div>
                        <img src={nano11} alt="ビタミンD" className="mx-auto" />
                        <div className="text-center text-[13px] font-bold text-[#000000cc] pt-[5px]">ビタミンD</div>
                    </div>
                </div>
                <SizeBox h={25} />
                <div className="text-[13px] font-medium leading-[26px] text-[#000000cc] text-center lg:mx-[80px]">世界有名製薬会社が完成品として使用する原料を購入し、ナノ粉砕過程とエボナイトリングを用いて粉砕して最終エボナイト電荷偏差で乾燥酵母（セレン含有）成分を活性化させて乾式ナノ粉砕製造されたセレン健康補助食品です。</div>
            </div>
            <SizeBox w={25} />
            <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] px-[30px] pt-[40px] pb-[70px]">
                <div className="text-[#285DBD] text-[20px] text-center font-bold leading-[26px]">こんな方におすすめ</div>
                <SizeBox h={35} />
                <div className="flex">
                    <div>
                        <img src={nano12} alt="こんな方におすすめ" />
                    </div>
                    <SizeBox w={10} />
                    <div className="flex-[1.5] lg:mr-[100px]">
                        <div className="flex flex-row justify-evenly items-start">
                            <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                            <SizeBox w={10} />
                            <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">骨を丈夫にしたい方</div>
                        </div>
                        <SizeBox h={20} />
                        <div className="flex flex-row justify-evenly">
                            <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                            <SizeBox w={10} />
                            <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">不規則な食事によって栄養不足が気になる現代人</div>
                        </div>
                        <SizeBox h={20} />
                        <div className="flex flex-row justify-evenly">
                            <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                            <SizeBox w={10} />
                            <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">高齢者や子供（子供、青少年）のバランスのとれた栄養摂取と骨の形成に役立てたい人</div>
                        </div>
                        <SizeBox h={20} />
                        <div className="flex flex-row justify-evenly">
                            <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                            <SizeBox w={10} />
                            <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">日常の食事でカルシウム摂取が難しいか少ない方</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SizeBox h={20} />
        <div className="flex flex-row justify-between">
            <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] p-[30px]">
                <div className="text-[20px] text-[#285DBD] font-bold leading-[26px] text-center">栄養機能情報</div>
                <SizeBox h={15} />
                <div className="text-[13px] font-medium text-[#000000cc] text-center leading-[26px]">カルシウム、ビタミンD、マグネシウム補助用製品</div>
                <SizeBox h={40} />
                <div className="flex flex-row justify-between">
                    <div className="flex">
                        <img src={nano13} alt="栄養機能情報" className="mx-auto" />
                    </div>
                    <SizeBox w={10} />
                    <div className="flex-[1.5]">
                        <div className="lg:mr-[50px]">
                            <div className="text-[13px] text-[#000000cc] font-bold">カルシウム</div>
                            <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">骨や歯の形成に必要、神経や筋肉の維持に必要、正常な血液凝固に必要、骨粗鬆症の発生リスクの低減に役立つ</div>
                        </div>
                        <SizeBox h={25} />
                        <div className="lg:mr-[50px]">
                            <div className="text-[13px] text-[#000000cc] font-bold">ビタミンD</div>
                            <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">カルシウムとリンの吸収や利用に必要、骨の形成と維持に必要、骨粗鬆症の発生リスクの低減に役立つ</div>
                        </div>
                        <SizeBox h={25} />
                        <div className="lg:mr-[50px]">
                            <div className="text-[13px] text-[#000000cc] font-bold">マグネシウム</div>
                            <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">エネルギー利用に必要、神経や筋肉機能維持に必要</div>
                        </div>
                    </div>
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
        <SizeBox h={15} />
        <div className="rounded-[10px] bg-[#F2F5FB] p-[30px]">
            <div className="text-[#285DBD] text-[20px] font-bold text-center">製品の詳細</div>
            <SizeBox h={20} />
            <div className="flex flex-row lg:mx-[70px]">
                <div className="flex-1">
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">製品名</div>
                        <div className="font-medium">8030カルシウムプラス</div>
                    </div>
                    <SizeBox h={15} />
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">名　称</div>
                        <div className="font-medium">健康補助食品</div>
                    </div>
                    <SizeBox h={15} />
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">原材料名</div>
                        <div className="font-medium">亜鉛酵母、マンガン酵母／貝殻焼成カルシウム、HPMC、酸化Mg、コレカルシフェロール、ヒアルロン酸、ゲル化剤（増粘多糖類）、乳化剤、塩化Mg</div>
                    </div>
                    <SizeBox h={15} />
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">保管時の注意事項</div>
                        <div className="font-medium">子供の手の届かないところに保管してください。</div>
                    </div>
                    <SizeBox h={15} />
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">輸入者</div>
                        <div className="font-medium">株式会社ユーフォリアプラス東京都中央区日本橋横山町 3-1 横山町ダイカンプラザ 501室</div>
                    </div>
                </div>
                <SizeBox w={35} />
                <div className="flex-1">
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">お召し上がり方</div>
                        <div className="font-medium">1日2回、1回2カプセル (540mg) を目安に十分な水などと一緒にお召し上がりください。</div>
                    </div>
                    <SizeBox h={15} />
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">賞味期限</div>
                        <div className="font-medium">2025.6.8</div>
                    </div>
                    <SizeBox h={15} />
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">保存方法</div>
                        <div className="font-medium">高温多湿を避けて、直射日光の当たらない涼しい場所に保管してください。</div>
                    </div>
                    <SizeBox h={15} />
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">原産国名</div>
                        <div className="font-medium">韓国</div>
                    </div>
                    <SizeBox h={15} />
                    <div className="text-[13px] text-[#000000cc] leading-[26px]">
                        <div className="font-bold">お問い合わせ</div>
                        <div className="font-medium">03-6661-9531</div>
                    </div>
                </div>
            </div>
        </div>
        <SizeBox h={20} />
        <Certificate />
    </div>
}

export default ProdcutA;