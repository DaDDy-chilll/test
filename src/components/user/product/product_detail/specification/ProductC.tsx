import SizeBox from "@/components/SizeBox";
import seren01 from "@/assets/user/product_detail/specification/product_seren/seren_img01.png";
import seren02 from "@/assets/user/product_detail/specification/product_seren/seren_img02.png";
import seren03 from "@/assets/user/product_detail/specification/product_seren/seren_img03.png";
import seren04 from "@/assets/user/product_detail/specification/product_seren/seren_img04.png";
import Certificate from "./Certificate";

const ProdcutC = ()=>{
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
            title: "摂取量及び摂取方法を遵守し、その他の事項は輸入者にお問い合わせください。"
        },
        {
            number: "7）",
            title: "製品の開封または摂取時に包装材により傷つくことがありますのでご注意ください。"
        }
    ];

    return <div>
        <div className="mx-auto bg-white p-[20px]">
            <div className="text-[#285DBD] text-[20px] font-bold leading-[30px]">商品詳細（アペクセルの乾式ナノ粉砕技術で製造)</div>
            <SizeBox h={30} />
            <div className="flex flex-row justify-between">
                <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] p-[30px]">
                    <div className="text-[20px] text-[#285DBD] font-bold text-center leading-[26px]">セレン</div>
                    <SizeBox h={20} />
                    <div className="text-center">
                        <img src={seren01} alt="商品詳細" className="text-center mx-auto" />
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">有害酸素から細胞を保護するために必要</div>
                    </div>
                </div>
                <SizeBox w={25} />
                <div className="flex-[1] text-center leading-[26px] rounded-[10px] bg-[#F2F5FB] p-[35px]">
                    <div className="text-[20px] font-bold text-[#285DBD]">セレン酵母30日分</div>
                    <div className="text-[13px] font-medium text-[#000000cc]">300mg×30カプセル (9g)×2Box (18g)</div>
                    <SizeBox h={25} />
                    <div className="text-[#000000cc] text-[13px] font-medium mx-[180px]">韓国食品医薬品安全処 広告審議協会から
                    模倣不可能、世界初
                    エイペクセルの乾式ナノ粉砕技術で製造</div>
                    <SizeBox h={35} />
                    <div>
                        <img src={seren02} alt="72年伝統、米国 IFT Food Expo 技術革新大賞受賞" className="text-center mx-auto" />
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
                            <img src={seren03} alt="セレン" className="mx-auto" />
                            <div className="text-center text-[13px] font-bold text-[#000000cc] pt-[5px]">セレン</div>
                        </div>
                    </div>
                    <SizeBox h={25} />
                    <div className="text-[13px] font-medium leading-[26px] text-[#000000cc] text-center lg:mx-[80px]">世界有名製薬会社が完成品として使用する原料を購入し、ナノ粉砕過程と
                    エボナイトリングを用いて粉砕して最終エボナイト電荷偏差で乾燥酵母（セレン含有）
                    成分を活性化させて乾式ナノ粉砕製造されたセレン健康補助食品です。</div>
                </div>
                <SizeBox w={25} />
                <div className="flex-[1] rounded-[10px] bg-[#F2F5FB] px-[30px] pt-[40px] pb-[70px]">
                    <div className="text-[#285DBD] text-[20px] text-center font-bold leading-[26px]">こんな方におすすめ</div>
                    <SizeBox h={35} />
                    <div className="flex">
                        <div>
                            <img src={seren04} alt="こんな方におすすめ" />
                        </div>
                        <SizeBox w={10} />
                        <div className="flex-[1.5] lg:mr-[100px]">
                            <div className="flex flex-row justify-evenly items-start">
                                <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                                <SizeBox w={10} />
                                <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">健康的な生活をご希望の方</div>
                            </div>
                            <SizeBox h={20} />
                            <div className="flex flex-row justify-evenly">
                                <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                                <SizeBox w={10} />
                                <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">過度の仕事で大変な方</div>
                            </div>
                            <SizeBox h={20} />
                            <div className="flex flex-row justify-evenly">
                                <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                                <SizeBox w={10} />
                                <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">抗酸化作用により栄養素が必要な方</div>
                            </div>
                            <SizeBox h={20} />
                            <div className="flex flex-row justify-evenly">
                                <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                                <SizeBox w={10} />
                                <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">多い外部活動量により活性酸素から人体を保護したい方</div>
                            </div>
                            <SizeBox h={20} />
                            <div className="flex flex-row justify-evenly">
                                <div className="border-[1px] border-[#00000080] border-solid bg-white w-[15px] h-[15px]"></div>
                                <SizeBox w={10} />
                                <div className="flex-1 text-[13px] font-light leading-[26px] text-[#000000cc] -mt-[5px]">過激な運動をよくする方</div>
                            </div>
                        </div>
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
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">セレン酵母</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">名　称</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">健康補助食品</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">原材料名</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">セレン酵母、シイタケパウダー、ブロッコリー濃縮パウダー、ウコンエキスパウダー、ニンジンエキスパウダー／HPMC、ゲル化剤（増粘多糖類）、乳化剤、塩化Mg</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">お召し上がり方</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">1日2回、1回2カプセル (540mg) を目安に十分な水などと一緒にお召し上がりください。</div>
                    </div>
                    <SizeBox h={25} />
                    <div className="lg:pl-[50px]">
                        <div className="text-[13px] text-[#000000cc] font-bold">賞味期限</div>
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">2025.5.31</div>
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
                        <div className="text-[13px] text-[#000000cc] font-medium leading-[26px]">株式会社ユーフォリアプラス東京都中央区日本橋横山町 3-1 横山町ダイカンプラザ 501室</div>
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

export default ProdcutC;