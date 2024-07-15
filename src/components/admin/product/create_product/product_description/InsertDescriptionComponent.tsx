import InputBoxComponent from "@/components/InputBoxComponent";
import SizeBox from "@/components/SizeBox";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Content, ProductDescription } from "@/types/product/product_explain";

export type ContentData = {
    subTitle: string;
    onEditSubTitle: boolean; 
    sentences: Array<SentencesData>;
}

type SentencesData = {
    sentence: string;
    onEditsentence: boolean;
}

interface InsertDescriptionComponentProps {
    description: Array<ProductDescription>;
    setDescription: Dispatch<SetStateAction<Array<ProductDescription>>>;
    sector: number;
    setSector: Dispatch<SetStateAction<number>>;
    onSaveDescription?: ()=>void;
}

const InsertDescriptionComponent = ({description,setDescription,sector,setSector,onSaveDescription}:InsertDescriptionComponentProps)=>{

    /* div position */
    const divRef = useRef<HTMLDivElement>(null);


    /* Main Title */
    const [mainTitle, setMainTitle] = useState<string>("");
    const [onMainTitleEdit,setOnMainTitleEdit] = useState<boolean>(false);

    /* Contents */
    const initialContents: Array<ContentData> = [
        {
            subTitle: "",
            onEditSubTitle: false,
            sentences: [
                {
                    sentence: "",
                    onEditsentence: false
                }
            ]
        }
    ];
    const [contents,setContents] = useState<Array<ContentData>>(initialContents);

    /* Add Explain Main Object */
    const addDescription = ()=>{
        if(sector===-1){ /* Add New Description */
            let newDescription: ProductDescription = {
                mainTitle: mainTitle,
                contents: contentDataToContent()
            }
             /* Add Data to Parent */
            setDescription([...description,newDescription]);
        }else{ /* Edit Mode */
            /* Update Data to Parent */
            const updated = description.map((desc,i)=>{
                if(i===sector){
                    return {
                        mainTitle: mainTitle,
                        contents: contentDataToContent()
                    }
                }else{
                    return desc;
                }
            })
            setDescription(updated);
            // TODO setSector(-1)
        }

        /* Reset Clear */
        onSaveDescription && onSaveDescription();
        setMainTitle("");
        setSector(-1);
        setOnMainTitleEdit(false);
        setContents(initialContents);
    }

    /* ContentData to Content Converter */
    const contentDataToContent = ()=>{
        const converted: Array<Content> = contents.map((content)=>{
            return {
                subTitle: content.subTitle,
                sentences: content.sentences.map(({sentence})=>sentence)
            }
        });
        return converted;
    }

    /* Content to ContentData Converter */
    const contentToContentData = ()=>{
        const converted: Array<ContentData> = description[sector].contents.map(({subTitle,sentences})=>{
            return {
                subTitle: subTitle || "",
                onEditSubTitle: false,
                sentences: sentences.map((sentence)=>{
                    return {
                        sentence: sentence,
                        onEditsentence: false
                    }
                })
            }
        })
        setMainTitle(description[sector].mainTitle|| "");
        setContents(converted);
    }

    /* SubTitle OnChange */
    const onChangeSubTitle = (title: string,index: number)=>{
        const updated = contents.map((content,i)=>{
            if(i===index){
                content.subTitle = title;
            }
            return content;
        });
        setContents(updated);
    }

    /* SubTitle OnEdit */
    const setOnEditSubTitle = (edit: boolean,index: number)=>{
        const updated = contents.map((content,i)=>{
            if(i===index){
                content.onEditSubTitle = edit;
            }
            return content;
        });
        setContents(updated);
    }

    /* add New Content */
    const addNewContent = ()=>{
        const updated = [...contents,{
            subTitle: "",
            onEditSubTitle: false,
            sentences: [
                {
                    sentence: "",
                    onEditsentence: false
                }
            ]
        }];
        setContents(updated);
    }

    /* delete Content */
    const deleteContent = (index: number)=>{
        const updated = contents.filter(({},x)=>x!=index);
        setContents(updated);
    }

    /* Sentence */
    const onChangeSentence = (changeSentence: string,index: number,sId: number)=>{
        const updated = contents.map((content,x)=>{
            if(x===index){
                const updatedSentence = content.sentences.map((sentence,y)=>{
                    if(y===sId){
                        sentence.sentence = changeSentence;
                    }
                    return sentence;
                });
                content.sentences = updatedSentence;
            }
            return content;
        });
        setContents(updated);
    }

    const removeSentence = (index: number,sId: number)=>{
        const updated = contents.map((content,x)=>{
            if(x===index){
                const updatedSentence = content.sentences.filter(({},y)=>y!=sId);
                content.sentences = updatedSentence;
            }
            return content;
        });
        setContents(updated);
    }

    const setOnEditSentence = (editSentence: boolean,index: number,sId: number)=>{
        const updated = contents.map((content,x)=>{
            if(x===index){
                const updatedSentence = content.sentences.map((sentence,y)=>{
                    if(y===sId){
                        sentence.onEditsentence = editSentence;
                    }
                    return sentence;
                });
                content.sentences = updatedSentence;
            }
            return content;
        });
        setContents(updated);
    }

    const addNewSentence = (index: number)=>{
        const add = contents.map((content,id)=>{
           if(id == index){
            content.sentences = [...content.sentences, {
                sentence: "",
                onEditsentence: false
                }]
           }
           return content;
        });
        setContents(add);

    }

    useEffect(()=>{
        if(sector>-1){
            contentToContentData();
            if (divRef.current) {
                divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // ref={divRef} divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    },[sector]);

    return (<div ref={divRef} className="pt-[80px]">
    <div className="flex flex-row p-[20px] bg-blue-100 rounded-[20px]  ">
        <div className="flex-[5]">
            {/* Main Title */}
            <div className="">
                {
                    onMainTitleEdit?
                    /* on Edit */
                    <div className="flex flex-row items-center">
                        <InputBoxComponent
                            className="flex-[3]"
                            value={mainTitle}
                            onChange={(event)=>{setMainTitle(event.currentTarget.value)}}
                            label="Main Title"
                            multiline={1}
                        />
                        <div className="flex-1 flex flex-row justify-start ml-[20px]">
                            <div onClick={()=>setOnMainTitleEdit(false)} className="p-2">
                                <DoneIcon fontSize="large" color="success" className="nav"/>
                            </div>
                        </div>
                    </div>
                    :<div className="flex flex-row items-center">
                        {
                            mainTitle?
                            <div className="flex flex-row items-center">
                                <div className="text-[30px] font-bold ">{mainTitle}</div>
                                <SizeBox w={20}/>
                                <div onClick={()=>setOnMainTitleEdit(true)}><EditIcon color="success" className="nav "/></div>
                                <SizeBox w={10}/>
                                <div onClick={()=>setMainTitle("")}><DeleteIcon color="error" className="nav "/></div>
                            </div>
                            :
                            <div className="flex flex-row items-center">
                                <div onClick={()=>setOnMainTitleEdit(true)} className=" text-[30px] text-gray-500">Add Main Title</div>
                                <SizeBox w={20}/>
                                <div onClick={()=>setOnMainTitleEdit(true)}><EditIcon color="success" className=" nav"/></div>
                            </div>
                        }
                    </div>
                }
            </div>
            <SizeBox h={30}/>
            {/* Content */}
            <div className="">
                {
                    contents.map(({subTitle,onEditSubTitle,sentences},index)=>{
                        return (
                            <div key={index} className="flex flex-row p-[20px] bg-gray-100 rounded-[20px] mt-[20px]">
                                <div className="flex-[5]">
                                    {/* Sub Title */}
                                    {
                                    onEditSubTitle?
                                        <div className="flex flex-row items-center">
                                            <InputBoxComponent
                                                className="flex-[1]"
                                                value={subTitle}
                                                onChange={(event)=>{onChangeSubTitle(event.currentTarget.value,index)}}
                                                label="Sub Title"
                                                multiline={1}
                                            />
                                            <div className="flex-1 flex flex-row justify-start ml-[20px]">
                                                <div onClick={()=>setOnEditSubTitle(false,index)} className="p-2">
                                                    <DoneIcon fontSize="large" color="success" className="nav"/>
                                                </div>
                                            </div>
                                        </div>
                                        :<div className="flex flex-row items-center">
                                            {
                                                subTitle?
                                                <div className="flex flex-row items-center">
                                                    <div className="text-[20px] font-bold">{subTitle}</div>
                                                    <SizeBox w={20}/>
                                                    <div onClick={()=>setOnEditSubTitle(true,index)}><EditIcon color="success" className="nav"/></div>
                                                    <SizeBox w={10}/>
                                                    <div onClick={()=>onChangeSubTitle("",index)}><DeleteIcon color="error" className="nav"/></div>
                                                </div>
                                                :
                                                <div className="flex flex-row items-center">
                                                    <div onClick={()=>setOnEditSubTitle(true,index)} className="text-[20px] text-gray-500">Add Sub Title</div>
                                                    <SizeBox w={20}/>
                                                    <div onClick={()=>setOnEditSubTitle(true,index)}><EditIcon color="success" className="nav"/></div>
                                                </div>
                                            }
                                        </div>
                                    }

                                    {/* Sentence */}
                                    {
                                        sentences.map(({sentence,onEditsentence},sId)=>{
                                            return (
                                                <div key={sId} className="ml-[20px] my-[10px]">
                                                    {/* Sentence */}
                                                    {
                                                    onEditsentence?
                                                        <div className="flex flex-row items-center">
                                                            <InputBoxComponent
                                                                className="flex-[4]"
                                                                value={sentence}
                                                                onChange={(event)=>{onChangeSentence(event.currentTarget.value,index,sId)}}
                                                                label="Sentence"
                                                                multiline={1}
                                                            />
                                                            <div className="flex flex-row justify-start ml-[20px]">
                                                                <div onClick={()=>setOnEditSentence(false,index,sId)} className="p-2">
                                                                    <DoneIcon fontSize="large" color="success" className="nav"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :<div className="flex flex-row items-center">
                                                            {
                                                                sentence?
                                                                <div className="flex flex-row items-center">
                                                                    <div className="text-[16px]">{sentence}</div>
                                                                    <SizeBox w={20}/>
                                                                    <div onClick={()=>setOnEditSentence(true,index,sId)}><EditIcon color="success" className="nav"/></div>
                                                                    <SizeBox w={10}/>
                                                                    <div onClick={()=>sentences.length-1 === sId? onChangeSentence("",index,sId) : removeSentence(index,sId)}>
                                                                        <DeleteIcon color="error" className="nav"/>
                                                                    </div>
                                                                    <SizeBox w={10}/>
                                                                    {sentences.length-1 === sId && <div onClick={()=>addNewSentence(index)}><AddIcon color="info" className="nav"/></div>}
                                                                </div>
                                                                :
                                                                <div className="flex flex-row items-center">
                                                                    <div onClick={()=>setOnEditSentence(true,index,sId)} className="text-[16px] text-gray-500">Add Sentence</div>
                                                                    <SizeBox w={20}/>
                                                                    <div onClick={()=>setOnEditSentence(true,index,sId)}><EditIcon color="success" className="nav"/></div>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <div className="flex-[1] flex flex-col justify-start items-end">
                                    <div onClick={()=>deleteContent(index)} className="flex flex-col items-center rounded-[10px] nav">
                                        <DeleteIcon color="error" className="nav"/>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <div className="flex flex-row justify-center">
                    <div onClick={addNewContent} className="flex flex-col items-center bg-gray-100 w-fit p-[20px] rounded-[10px] nav mt-[20px]">
                        <ControlPointIcon/>
                        <SizeBox h={10}/>
                        <div>Add Content</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-[1] flex flex-col justify-center items-center">
            <div onClick={addDescription} className="flex flex-col items-center bg-blue-300 w-fit p-[20px] rounded-[10px] nav">
                <ControlPointIcon/>
                <SizeBox h={10}/>
                <div>Save Description</div>
            </div>
        </div>
    </div>
    
    </div>
       
    )
}

export default InsertDescriptionComponent;

/*
export type ProductExplain = {
    mainTitle?: string;
    contents: Array<Content>; 
}

type Content = {
    subTitle?: string;
    sentences: Array<string>;
}
*/