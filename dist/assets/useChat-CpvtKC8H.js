import{r as s,a1 as p,a2 as m,a3 as g,a4 as E,a5 as y,a6 as S}from"./index-D5c5oP_Y.js";const C=({id:a})=>{const[o,c]=s.useState([]),[n,h]=s.useState(!0),[u,i]=s.useState(null);return s.useEffect(()=>{const d=p(m,"chats"),f=g(d,y("company_id","==",a),E("last_message_timestamp","desc")),l=S(f,t=>{const e=[];t.forEach(r=>{e.push({id:r.id,...r.data()})}),c(e),h(!1)},t=>{console.error("Error fetching chats:",t),i("Failed to fetch chats. Please try again.")});return()=>l()},[a]),{chats:o,isLoading:n,error:u}};export{C as u};
