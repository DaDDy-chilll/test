import { colors } from "@/constants/color";
import React from "react";

const Manager: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m8,12c3.309,0,6-2.691,6-6S11.309,0,8,0,2,2.691,2,6s2.691,6,6,6Zm0-11c2.757,0,5,2.243,5,5s-2.243,5-5,5-5-2.243-5-5S5.243,1,8,1Zm1,13.5c0,.276-.224.5-.5.5-4.136,0-7.5,3.364-7.5,7.5v1c0,.276-.224.5-.5.5s-.5-.224-.5-.5v-1c0-4.687,3.813-8.5,8.5-8.5.276,0,.5.224.5.5Zm8,.5c-1.103,0-2,.897-2,2s.897,2,2,2,2-.897,2-2-.897-2-2-2Zm0,3c-.551,0-1-.449-1-1s.449-1,1-1,1,.449,1,1-.449,1-1,1Zm5.506.478l-.646-.377c.094-.385.14-.747.14-1.1s-.046-.715-.14-1.101l.646-.377c.346-.202.593-.527.695-.915s.046-.792-.156-1.137c-.202-.346-.526-.593-.914-.695-.389-.102-.792-.047-1.138.155l-.641.374c-.537-.488-1.167-.852-1.853-1.068v-.738c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5,1.5v.738c-.687.216-1.316.58-1.853,1.068l-.641-.374c-.346-.202-.75-.257-1.138-.155-.387.102-.712.349-.914.694-.202.346-.257.75-.156,1.137s.349.713.695.915l.646.377c-.094.385-.14.748-.14,1.101s.046.715.14,1.1l-.646.377c-.346.202-.593.527-.695.915s-.046.792.156,1.137c.202.346.526.593.914.695.388.102.792.047,1.137-.156l.641-.374c.537.489,1.167.852,1.853,1.068v.738c0,.827.673,1.5,1.5,1.5s1.5-.673,1.5-1.5v-.738c.687-.217,1.316-.58,1.853-1.068l.64.374c.346.203.75.257,1.138.156.388-.102.712-.349.914-.694.202-.346.257-.75.156-1.137s-.349-.713-.695-.915Zm-.324,1.547c-.067.115-.176.198-.305.231-.129.034-.264.015-.379-.052l-.971-.567c-.201-.118-.457-.081-.617.09-.549.586-1.249.989-2.021,1.165-.228.052-.389.254-.389.487v1.12c0,.276-.224.5-.5.5s-.5-.224-.5-.5v-1.12c0-.233-.161-.436-.389-.487-.773-.176-1.472-.579-2.021-1.165-.097-.104-.23-.158-.365-.158-.086,0-.173.022-.252.068l-.971.567c-.115.067-.25.086-.379.052-.129-.034-.237-.116-.305-.232-.067-.115-.086-.25-.052-.378.034-.129.116-.238.231-.305l.979-.572c.202-.118.295-.359.225-.582-.138-.439-.202-.817-.202-1.188s.064-.748.202-1.188c.07-.223-.023-.464-.225-.581l-.979-.571c-.115-.067-.198-.176-.231-.305-.034-.129-.016-.263.052-.379.067-.115.176-.198.305-.231.128-.035.263-.017.379.051l.971.567c.201.117.458.081.617-.089.549-.586,1.249-.989,2.021-1.165.228-.052.389-.254.389-.487v-1.12c0-.276.224-.5.5-.5s.5.224.5.5v1.12c0,.233.161.436.389.487.773.176,1.472.579,2.021,1.165.16.17.416.207.617.089l.971-.567c.115-.068.25-.086.379-.051.129.034.237.116.305.232.067.115.086.25.052.378-.034.129-.116.238-.231.305l-.979.571c-.202.117-.295.358-.225.581.138.44.202.818.202,1.188s-.064.748-.202,1.188c-.07.223.023.464.225.582l.979.572c.115.067.198.176.231.305.034.129.016.263-.052.379Z" />
    </svg>
  );
};

const JobType: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M19.5,4h-1.528c-.25-2.247-2.16-4-4.472-4h-3c-2.312,0-4.223,1.753-4.472,4h-1.528C2.019,4,0,6.019,0,8.5v11c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V8.5c0-2.481-2.019-4.5-4.5-4.5ZM10.5,1h3c1.76,0,3.221,1.306,3.464,3H7.036c.243-1.694,1.704-3,3.464-3ZM4.5,5h15c1.93,0,3.5,1.57,3.5,3.5v1.5h-4v-1.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5H6v-1.5c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v1.5H1v-1.5c0-1.93,1.57-3.5,3.5-3.5Zm15,18H4.5c-1.93,0-3.5-1.57-3.5-3.5V11H5v1.5c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-1.5h12v1.5c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-1.5h4v8.5c0,1.93-1.57,3.5-3.5,3.5Z" />
    </svg>
  );
};

const Staff: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m8,13c0,2.206,1.794,4,4,4s4-1.794,4-4-1.794-4-4-4-4,1.794-4,4Zm4-3c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm6-2c2.206,0,4-1.794,4-4s-1.794-4-4-4-4,1.794-4,4,1.794,4,4,4Zm0-7c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm6,11.5v2.5h-1v-2.5c0-.827-.673-1.5-1.5-1.5h-3.849c-.124-.349-.277-.684-.461-1h4.309c1.379,0,2.5,1.121,2.5,2.5Zm-6,9v2.5h-1v-2.5c0-.827-.673-1.5-1.5-1.5h-7c-.827,0-1.5.673-1.5,1.5v2.5h-1v-2.5c0-1.379,1.121-2.5,2.5-2.5h7c1.379,0,2.5,1.121,2.5,2.5ZM6,8c2.206,0,4-1.794,4-4S8.206,0,6,0,2,1.794,2,4s1.794,4,4,4Zm0-7c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm-3.5,10c-.827,0-1.5.673-1.5,1.5v2.5H0v-2.5c0-1.379,1.121-2.5,2.5-2.5h4.309c-.183.316-.337.651-.461,1h-3.849Z" />
    </svg>
  );
};

const Location: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m21.841,10h-1.351c-.12.342-.262.675-.423,1h.924l.812,5h-6.133l-.541.529.805,6.471h-7.867l.805-6.471-.541-.529H2.185l.822-5h.935c-.161-.326-.302-.66-.421-1h-1.362L0,23.124v.876h24v-.705l-2.159-13.295Zm-14.782,13H1.034l.987-6h5.79l-.752,6Zm9.882,0l-.752-6h5.776l.974,6h-5.998Zm-4.941-6.209l4.949-4.841c1.322-1.322,2.051-3.08,2.051-4.95s-.729-3.627-2.051-4.95c-1.321-1.322-3.079-2.05-4.949-2.05s-3.627.728-4.95,2.05c-2.729,2.729-2.729,7.17.004,9.903l4.946,4.837ZM7.757,2.757c1.133-1.133,2.64-1.757,4.243-1.757s3.109.624,4.242,1.757c1.134,1.133,1.758,2.64,1.758,4.243s-.624,3.109-1.754,4.239l-4.246,4.154-4.243-4.15c-1.133-1.133-1.757-2.64-1.757-4.243s.624-3.109,1.757-4.243Zm4.243,7.223c1.648,0,2.99-1.341,2.99-2.99s-1.342-2.99-2.99-2.99-2.99,1.341-2.99,2.99,1.341,2.99,2.99,2.99Zm0-4.98c1.098,0,1.99.893,1.99,1.99s-.893,1.99-1.99,1.99-1.99-.893-1.99-1.99.893-1.99,1.99-1.99Z" />
    </svg>
  );
};

const Money: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm4-13.5v.5h-1v-.5c0-.827-.673-1.5-1.5-1.5h-3c-.827,0-1.5,.673-1.5,1.5,0,.876,.628,1.612,1.492,1.751l3.174,.51c1.353,.217,2.334,1.37,2.334,2.739,0,1.379-1.121,2.5-2.5,2.5h-1v2h-1v-2h-1c-1.379,0-2.5-1.121-2.5-2.5v-.5h1v.5c0,.827,.673,1.5,1.5,1.5h3c.827,0,1.5-.673,1.5-1.5,0-.876-.628-1.612-1.492-1.751l-3.174-.51c-1.353-.217-2.334-1.369-2.334-2.739,0-1.378,1.121-2.5,2.5-2.5h1v-2h1v2h1c1.379,0,2.5,1.122,2.5,2.5Z" />
    </svg>
  );
};

const Facebook: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M22 12C22 6.47714 17.5229 1.99999 12 1.99999C6.47715 1.99999 2 6.47714 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79687C10.4375 7.29062 11.9304 5.90624 14.2146 5.90624C15.3087 5.90624 16.4531 6.10155 16.4531 6.10155V8.56249H15.1921C13.9499 8.56249 13.5625 9.33333 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z"
          stroke="currentColor"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

const Youtube: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.168 19.0028C20.4724 19.0867 22.41 17.29 22.5 14.9858V9.01982C22.41 6.71569 20.4724 4.91893 18.168 5.00282H6.832C4.52763 4.91893 2.58998 6.71569 2.5 9.01982V14.9858C2.58998 17.29 4.52763 19.0867 6.832 19.0028H18.168Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.008 9.17784L15.169 11.3258C15.3738 11.4454 15.4997 11.6647 15.4997 11.9018C15.4997 12.139 15.3738 12.3583 15.169 12.4778L12.008 14.8278C11.408 15.2348 10.5 14.8878 10.5 14.2518V9.75184C10.5 9.11884 11.409 8.77084 12.008 9.17784Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

const Instagram: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          fill="currentColor"
        ></path>{" "}
        <path
          d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
          fill="currentColor"
        ></path>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
};

const Website: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={colors.icon}
      strokeWidth="0"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeWidth="0"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.83824 18.4467C10.0103 18.7692 10.1826 19.0598 10.3473 19.3173C8.59745 18.9238 7.07906 17.9187 6.02838 16.5383C6.72181 16.1478 7.60995 15.743 8.67766 15.4468C8.98112 16.637 9.40924 17.6423 9.83824 18.4467ZM11.1618 17.7408C10.7891 17.0421 10.4156 16.1695 10.1465 15.1356C10.7258 15.0496 11.3442 15 12.0001 15C12.6559 15 13.2743 15.0496 13.8535 15.1355C13.5844 16.1695 13.2109 17.0421 12.8382 17.7408C12.5394 18.3011 12.2417 18.7484 12 19.0757C11.7583 18.7484 11.4606 18.3011 11.1618 17.7408ZM9.75 12C9.75 12.5841 9.7893 13.1385 9.8586 13.6619C10.5269 13.5594 11.2414 13.5 12.0001 13.5C12.7587 13.5 13.4732 13.5593 14.1414 13.6619C14.2107 13.1384 14.25 12.5841 14.25 12C14.25 11.4159 14.2107 10.8616 14.1414 10.3381C13.4732 10.4406 12.7587 10.5 12.0001 10.5C11.2414 10.5 10.5269 10.4406 9.8586 10.3381C9.7893 10.8615 9.75 11.4159 9.75 12ZM8.38688 10.0288C8.29977 10.6478 8.25 11.3054 8.25 12C8.25 12.6946 8.29977 13.3522 8.38688 13.9712C7.11338 14.3131 6.05882 14.7952 5.24324 15.2591C4.76698 14.2736 4.5 13.168 4.5 12C4.5 10.832 4.76698 9.72644 5.24323 8.74088C6.05872 9.20472 7.1133 9.68686 8.38688 10.0288ZM10.1465 8.86445C10.7258 8.95042 11.3442 9 12.0001 9C12.6559 9 13.2743 8.95043 13.8535 8.86447C13.5844 7.83055 13.2109 6.95793 12.8382 6.2592C12.5394 5.69894 12.2417 5.25156 12 4.92432C11.7583 5.25156 11.4606 5.69894 11.1618 6.25918C10.7891 6.95791 10.4156 7.83053 10.1465 8.86445ZM15.6131 10.0289C15.7002 10.6479 15.75 11.3055 15.75 12C15.75 12.6946 15.7002 13.3521 15.6131 13.9711C16.8866 14.3131 17.9412 14.7952 18.7568 15.2591C19.233 14.2735 19.5 13.1679 19.5 12C19.5 10.8321 19.233 9.72647 18.7568 8.74093C17.9413 9.20477 16.8867 9.6869 15.6131 10.0289ZM17.9716 7.46178C17.2781 7.85231 16.39 8.25705 15.3224 8.55328C15.0189 7.36304 14.5908 6.35769 14.1618 5.55332C13.9897 5.23077 13.8174 4.94025 13.6527 4.6827C15.4026 5.07623 16.921 6.08136 17.9716 7.46178ZM8.67765 8.55325C7.61001 8.25701 6.7219 7.85227 6.02839 7.46173C7.07906 6.08134 8.59745 5.07623 10.3472 4.6827C10.1826 4.94025 10.0103 5.23076 9.83823 5.5533C9.40924 6.35767 8.98112 7.36301 8.67765 8.55325ZM15.3224 15.4467C15.0189 16.637 14.5908 17.6423 14.1618 18.4467C13.9897 18.7692 13.8174 19.0598 13.6527 19.3173C15.4026 18.9238 16.921 17.9186 17.9717 16.5382C17.2782 16.1477 16.3901 15.743 15.3224 15.4467ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
};

const Phone: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M22.35,3.05L19.39,.09l-5.84,5.84,3.48,3.48c-1.54,3.64-4.1,6.2-7.62,7.63l-3.48-3.48L.09,19.39l2.96,2.96c1.06,1.06,2.5,1.65,4.05,1.65,7.42,0,16.89-9.47,16.89-16.89,0-1.55-.59-2.99-1.65-4.06ZM7.11,23c-1.29,0-2.47-.48-3.35-1.36l-2.25-2.25,4.42-4.42,3.23,3.23,.3-.12c4.04-1.54,6.94-4.44,8.61-8.61l.12-.31-3.24-3.24L19.39,1.51l2.25,2.25c.88,.87,1.36,2.06,1.36,3.35,0,6.83-9.06,15.89-15.89,15.89Z" />
    </svg>
  );
};

const CompanyAddress: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      strokeWidth="2"
      {...props}
    >
      <path d="m19,15c-1.103,0-2,.897-2,2s.897,2,2,2,2-.897,2-2-.897-2-2-2Zm0,3c-.551,0-1-.449-1-1s.449-1,1-1,1,.449,1,1-.449,1-1,1Zm3.535-4.542c-.944-.944-2.2-1.464-3.535-1.464s-2.591.52-3.535,1.464c-.945.944-1.465,2.2-1.465,3.536s.524,2.596,1.489,3.559l3.511,3.258,3.535-3.281c.945-.944,1.465-2.2,1.465-3.536s-.52-2.592-1.465-3.536Zm-.694,6.351l-2.841,2.637-2.818-2.614c-.762-.761-1.182-1.769-1.182-2.838s.416-2.073,1.172-2.829c.755-.755,1.76-1.171,2.828-1.171s2.073.416,2.828,1.171c.756.755,1.172,1.76,1.172,2.829s-.416,2.073-1.159,2.815Zm-14.841-5.81h-3v-1h3v1Zm5,0h-3v-1h3v1Zm-8,3h3v1h-3v-1Zm5,0h3v1h-3v-1Zm-2-11h-3v-1h3v1Zm5,0h-3v-1h3v1Zm-5,4h-3v-1h3v1Zm5,0h-3v-1h3v1Zm3.186,13l1.078,1H0V2.5C0,1.122,1.122,0,2.5,0h11c1.378,0,2.5,1.122,2.5,2.5v8.175c-.347.165-.682.357-1,.579V2.5c0-.827-.673-1.5-1.5-1.5H2.5c-.827,0-1.5.673-1.5,1.5v20.5h14.186Z" />
    </svg>
  );
};

const CompanyDescription: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m19.5,5h-3.5v-.5c0-2.481-2.019-4.5-4.5-4.5h-7C2.019,0,0,2.019,0,4.5v15c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5v-10c0-2.481-2.019-4.5-4.5-4.5ZM1,19.5V4.5c0-1.93,1.57-3.5,3.5-3.5h7c1.93,0,3.5,1.57,3.5,3.5v18.5H4.5c-1.93,0-3.5-1.57-3.5-3.5Zm22,0c0,1.93-1.57,3.5-3.5,3.5h-3.5V6h3.5c1.93,0,3.5,1.57,3.5,3.5v10ZM7,13.5c0,.276-.224.5-.5.5h-2c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h2c.276,0,.5.224.5.5Zm0,4c0,.276-.224.5-.5.5h-2c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h2c.276,0,.5.224.5.5Zm5,0c0,.276-.224.5-.5.5h-2c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h2c.276,0,.5.224.5.5ZM7,5.5c0,.276-.224.5-.5.5h-2c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h2c.276,0,.5.224.5.5Zm0,4c0,.276-.224.5-.5.5h-2c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h2c.276,0,.5.224.5.5Zm5,4c0,.276-.224.5-.5.5h-2c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h2c.276,0,.5.224.5.5Zm0-8c0,.276-.224.5-.5.5h-2c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h2c.276,0,.5.224.5.5Zm0,4c0,.276-.224.5-.5.5h-2c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h2c.276,0,.5.224.5.5Zm8,8c0,.276-.224.5-.5.5h-1c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h1c.276,0,.5.224.5.5Zm0-8c0,.276-.224.5-.5.5h-1c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h1c.276,0,.5.224.5.5Zm0,4c0,.276-.224.5-.5.5h-1c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h1c.276,0,.5.224.5.5Z" />
    </svg>
  );
};

export {
  Manager,
  JobType,
  Staff,
  Location,
  Money,
  Youtube,
  Facebook,
  Instagram,
  Website,
  Phone,
  CompanyAddress,
  CompanyDescription,
};
