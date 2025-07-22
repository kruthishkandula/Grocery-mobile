import * as React from "react"
import Svg, { Path, Rect, SvgProps } from "react-native-svg"


const CategoryIcon = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.75}
        className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
        {...props}
    >
        <Rect width={7} height={9} x={3} y={3} rx={1} />
        <Rect width={7} height={5} x={14} y={3} rx={1} />
        <Rect width={7} height={9} x={14} y={12} rx={1} />
        <Rect width={7} height={5} x={3} y={16} rx={1} />
    </Svg>
)

export default CategoryIcon

