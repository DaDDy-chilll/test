import SizeBox from "@/components/SizeBox"

import qualification_img01 from "@/assets/user/product_detail/qualification_img01.png";
import qualification_img02 from "@/assets/user/product_detail/qualification_img02.png";
import qualification_img03 from "@/assets/user/product_detail/qualification_img03.png";
import qualification_img04 from "@/assets/user/product_detail/qualification_img04.png";
import qualification_img05 from "@/assets/user/product_detail/qualification_img05.png";
import qualification_img06 from "@/assets/user/product_detail/qualification_img06.png";

const DetailSpecificationComponent = ()=>{
    return <div className="p-[10px]">
        <div className="text-[#285DBD] text-[20px] font-bold">商品詳細</div>
        <SizeBox h={20}/>
        <div className="text-[20px] font-bold mb-[10px]">72年伝統、米国 IFT Food Expo 技術革新大賞受賞</div>
        <div className="text-[13px]">アメリカの世界最大の食品科学博覧会 IFT Food Expo で100以上の国 1,000 以上の世界的な企業が参観した中、エイペクセルカルシウムが 72年の伝統、韓国唯一技術革新大賞を受賞した。</div>
        <SizeBox h={40}/>
        <div className="text-[20px] font-bold mb-[10px]">栄養機能情報 (Apexel Calcium)</div>
        <div className="text-[13px] mb-[10px]">カルシウム　：骨や歯の形成に必要、神経や筋肉推持に必要、正常な血液凝固発生リスクの低減に役立つ</div>
        <div className="text-[13px] mb-[10px]">ビタミンD　 ：カルシウムとリンが吸収され利用されるために必要、骨の形成と推持に必要、骨粗鬆症のリスクを軽減するのに役立ちます</div>
        <div className="text-[13px] mb-[10px]">マグネシウム：エネルギー利用に必要、神経や筋肉機能推持に必要</div>
        <SizeBox h={40}/>
        <div className="text-[20px] font-bold mb-[10px]">注意事項</div>
        <div className="text-[13px] mb-[10px]">1 ) 製品の開封または摂取時に包装材により傷つくことがありますのでご注意ください。</div>
        <div className="text-[13px] mb-[10px]">2 ) 過剰摂取時に下痢を引き起こす可能性があります。</div>
        <div className="text-[13px] mb-[10px]">3 ) 摂取量及び摂取方法を確認し、摂取してください。</div>
        <div className="text-[13px] mb-[10px]">4 ) 特異体質またはアレルギー体質の場合は、原料の成分を確認して摂取してください。</div>
        <div className="text-[13px] mb-[10px]">5 ) 幼児、幼児の授取時に溶かして授取できるように注意してください。</div>
        <div className="text-[13px] mb-[10px]">6 ) 製品の変質や変色になった場合は、摂取しないで消費者相談室にお問い合わせください。</div>
        <div className="text-[13px] mb-[10px]">7 ) 容器に防湿剤を摂取しないでください。</div>
        <SizeBox h={40}/>
        <div className="text-[20px] font-bold mb-[10px]">資格</div>
        <div className="flex flex-row mt-[15px]">
            <div className="flex-[1] px-[5px]">
                <img src={qualification_img01} alt="画像" />
            </div>
            <div className="flex-[3] px-[5px]">
                <img src={qualification_img02} alt="画像" />
            </div>
            <div className="flex-[3] px-[5px]">
                <img src={qualification_img03} alt="画像" />
            </div>
            <div className="flex-[1] px-[5px]"></div>
        </div>
        <div className="flex flex-row mt-[15px]">
            <div className="flex-[3] px-[5px]">
                <img src={qualification_img04} alt="画像" />
            </div>
            <div className="flex-[3] px-[5px]">
                <img src={qualification_img05} alt="画像" />
            </div>
            <div className="flex-[2] px-[5px]"></div>
        </div>
        <div className="flex flex-row mt-[15px]">
            <div className="flex-[3] px-[5px]">
                <img src={qualification_img06} alt="画像" />
            </div>
            <div className="flex-[3] px-[5px]"></div>
            <div className="flex-[2] px-[5px]"></div>
        </div>
    </div>
}

export default DetailSpecificationComponent;