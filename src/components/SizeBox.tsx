
type SizeBoxProps = {
    h?: number;
    w?: number;
}
const SizeBox = ({h,w}:SizeBoxProps)=>{
    return <div style={{height: h,width: w}}></div>
}

export default SizeBox;