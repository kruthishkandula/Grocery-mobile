import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const CartIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={0.35}
      d="M26.5 14.825c2.09 0 3.792 1.7 3.792 3.791v.465h2.63a.76.76 0 0 1 .756.68l1.493 14.216a.76.76 0 0 1-.756.84h-15.83a.76.76 0 0 1-.508-.195l-.057-.057a.762.762 0 0 1-.19-.587l1.492-14.216a.76.76 0 0 1 .755-.68h2.631v-.466a3.796 3.796 0 0 1 3.792-3.79Zm-7.071 18.473H33.57L32.238 20.6h-1.946v1.113a.76.76 0 0 1-1.52 0V20.6h-4.544v1.113a.76.76 0 0 1-1.52 0V20.6h-1.946l-1.333 12.697ZM26.5 16.344a2.276 2.276 0 0 0-2.273 2.272v.465h4.546v-.465a2.276 2.276 0 0 0-2.273-2.272Z"
    />
  </Svg>
)
export default CartIcon
