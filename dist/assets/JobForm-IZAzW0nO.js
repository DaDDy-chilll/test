import{E as e,H as b,M as p,N as h,O as j,P as t,I as a,ad as v,Q as y}from"./index-D5c5oP_Y.js";import{S as s}from"./Select-CdAIF3pG.js";import{d as f}from"./default-D2m8IVtt.js";const w=({onBack:o,onFinish:r,formVariant:n})=>{const i=[{value:"IT",label:"IT"},{value:"Sales",label:"Sales"},{value:"Marketing",label:"Marketing"},{value:"Finance",label:"Finance"}],c=[{value:"Tokyo",label:"Tokyo"},{value:"Osaka",label:"Osaka"},{value:"Kyoto",label:"Kyoto"},{value:"Fukuoka",label:"Fukuoka"}],u=[{value:"0-100",label:"0-100"},{value:"100-200",label:"100-200"},{value:"200-300",label:"200-300"},{value:"300-400",label:"300-400"}],m=[{value:"1-2",label:"1-2"},{value:"2-3",label:"2-3"},{value:"3-4",label:"3-4"},{value:"4-5",label:"4-5"}],d=[{value:"health",label:"Health Insurance"},{value:"life",label:"Life Insurance"},{value:"retirement",label:"Retirement Pension"},{value:"transportation",label:"Transportation Allowance"}];return e.jsxs(b.div,{className:"w-full h-full shadow-md bg-gray-100 px-8 pt-3 flex flex-col justify-center items-center relative",variants:n,initial:"hidden",animate:"visible",exit:"exit",children:[e.jsx("div",{className:"text-start w-full  border-b-2 border-gray-400 pb-4",children:e.jsx("p",{children:"Post your job position to recruit workers"})}),e.jsxs("div",{className:"flex justify-between w-5/6 p-5 pl-10",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("h1",{className:"font-medium text-black",children:"Profile Photo"}),e.jsx("p",{className:"text-sm text-gray-500",children:"This will be your public photo for your company"})]}),e.jsxs(p,{className:"w-14 h-14 rounded-md",children:[e.jsx(h,{src:f}),e.jsx(j,{children:"CN"})]})]}),e.jsxs("form",{className:"w-full",onSubmit:l=>l.preventDefault(),children:[e.jsxs("div",{className:"grid grid-cols-2 gap-y-2 gap-x-20 px-10",children:[e.jsx(t,{name:"name",type:"text",placeholder:"Type Name",label:a.jobName,className:"mt-1 block w-full bg-gray-100"}),e.jsx(s,{label:a.jobType,id:a.jobType,options:i,className:"",defaultOption:"Choose your job type",value:""}),e.jsx(s,{label:a.jobLocation,id:a.jobLocation,options:c,className:"",defaultOption:"Choose your job location"}),e.jsx(s,{label:a.annualSalary,id:a.annualSalary,options:u,className:"",defaultOption:"Choose your annual salary"}),e.jsx(s,{label:a.annualHoliday,id:a.annualHoliday,options:m,className:"",defaultOption:"Days"}),e.jsxs("div",{className:"flex flex-row gap-x-10 relative",children:[e.jsx("p",{className:"text-xs text-gray-500 absolute -top-5 left-0",children:a.workHour}),e.jsx(t,{name:"workHourStart",type:"time",label:"",className:"mt-1 block w-auto bg-gray-200",placeholder:"100000 $"}),e.jsx("p",{children:" ~ "}),e.jsx(t,{name:"workHourEnd",type:"time",label:"",className:"mt-1 block w-auto bg-gray-200",placeholder:"100000 $"})]}),e.jsxs("div",{className:"col-span-2 w-full ",children:[e.jsx("p",{className:"text-xs text-gray-500 mb-3",children:a.benefits}),e.jsx("div",{className:"flex flex-row gap-x-10",children:d.map((l,x)=>e.jsxs("div",{className:"flex gap-x-3 items-center",children:[e.jsx("input",{type:"checkbox",id:l.value,name:l.value,className:"accent-primaryColor"}),e.jsx("label",{htmlFor:l.value,className:"text-sm",children:l.label})]},x))})]}),e.jsxs("div",{className:"flex flex-row items-center col-span-2 gap-x-2",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Other"}),e.jsx("input",{type:"text",name:"other",className:"bg-gray-200"})]}),e.jsx("span",{className:"col-span-2 mt-3",children:e.jsx(v,{theme:"snow",className:"h-36 mb-16",placeholder:a.companyDescription,modules:{toolbar:[[{header:[1,2,!1]}],["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{color:[]},{background:[]}],[{align:[]}],["clean"]]}})})]}),e.jsxs("div",{className:"flex justify-between w-full pb-3 px-10 mr-10",children:[e.jsx("button",{className:"underline font-medium",onClick:o,children:"Back"}),e.jsx(y,{variant:"destructive",className:"font-medium w-44",onClick:r,children:"Finish"})]})]})]},"form")};export{w as J};
